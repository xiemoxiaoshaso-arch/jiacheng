import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. 电池产品集合 (增加可选语言限制)
const productsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/products' }), 
  schema: z.object({
    lang: z.enum(['zh', 'en']).optional(), // 👈 新增：语言分类，不填默认为 zh 中文
    title: z.string(),
    category: z.string(),
    chemistry: z.string(),
    image: z.string(), 
    images: z.array(z.string()).optional(), 
    datasheet: z.string(),
    specs: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
  }),
});

// 2. 新闻资讯集合 (增加可选语言限制)
const newsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/news' }), 
  schema: z.object({
    lang: z.enum(['zh', 'en']).optional(), // 👈 新增：语言分类
    title: z.string(),
    category: z.enum(['corporate', 'industry']), 
    categoryName: z.string(),                   
    date: z.string(),                           
    views: z.string(),                          
    image: z.string(),                          
  }),
});

// 3. 招聘岗位集合
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