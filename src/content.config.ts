import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. 电池产品集合 (修改：采用 schema 函数，启用 image() 图片优化助手)
const productsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/products' }), 
  schema: ({ image }) => z.object({ // 👈 核心修改：接收 { image } 上下文
    lang: z.enum(['zh', 'en']).optional(), 
    title: z.string(),
    category: z.string(),
    chemistry: z.string(),
    image: image(), // 👈 核心修改：从 z.string() 变更为 image() 助手
    images: z.array(image()).optional(), 
    datasheet: z.string(),
    specs: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
  }),
});

// 2. 新闻资讯集合 (修改：采用 schema 函数，启用 image() 图片优化助手)
const newsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/news' }), 
  schema: ({ image }) => z.object({ // 👈 核心修改：接收 { image } 上下文
    lang: z.enum(['zh', 'en']).optional(), 
    title: z.string(),
    category: z.enum(['corporate', 'industry']), 
    categoryName: z.string(),                   
    date: z.string(),                           
    views: z.string(),                          
    image: image(), // 👈 核心修改：从 z.string() 变更为 image() 助手
    excerpt: z.string().optional(), // 👈 顺便加上这行，确保摘要字段被安全识别
  }),
});

// 3. 招聘岗位集合 (没有涉及图片前言，保持原样即可)
const careersCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/careers' }), 
  schema: z.object({
    title: z.string(),
    department: z.string(),
    location: z.string(),
    type: z.string(),
    experience: z.string(),
    responsibilities: z.array(z.string()), 
    requirements: z.array(z.string()),     
    sortOrder: z.number().optional(),      
  }),
});

export const collections = {
  'products': productsCollection,
  'news': newsCollection, 
  'careers': careersCollection,
};