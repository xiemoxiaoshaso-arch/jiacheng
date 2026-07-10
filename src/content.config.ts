import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. 电池产品集合 (采用 schema 函数，启用 image() 图片优化助手)
const productsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/products' }), 
  schema: ({ image }) => z.object({ 
    lang: z.enum(['zh', 'en']).optional(), 
    title: z.string(),
    category: z.string(),
    chemistry: z.string(),
    image: image(), 
    images: z.array(image()).optional(), 
    datasheet: z.string(),
    specs: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })),
  }),
});

// 2. 新闻资讯集合 (采用 schema 函数，启用 image() 图片优化助手)
const newsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/news' }), 
  schema: ({ image }) => z.object({ 
    lang: z.enum(['zh', 'en']).optional(), 
    title: z.string(),
    category: z.enum(['corporate', 'industry']), 
    categoryName: z.string(),                   
    date: z.string(),                           
    views: z.string(),                          
    image: image(), 
    excerpt: z.string().optional(), 
  }),
});

// 3. 招聘岗位集合 (保持原样)
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
    lang: z.enum(['zh', 'en']).optional(),      
  }),
});

// 4. 【已同步修改】：定义 banners 轮播图集合 (采用 schema 函数，启用 image() 与 3张图集数组)
const bannersCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/banners" }), 
  schema: ({ image }) => z.object({ // 👈 核心修改：接收 { image } 上下文
    order: z.number(),
    lang: z.string(),
    badge: z.string(),
    badgeColor: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    bgImage: image(), // 👈 核心修改：从 z.string() 变更为 image() 助手，校验背景大图
    ctaText1: z.string(),
    ctaLink1: z.string(),
    ctaText2: z.string(),
    ctaLink2: z.string(),
    gallery: z.array(image()), // 👈 核心修改：从 rightImage: z.string() 变更为 gallery: z.array(image()) 缩略图集
  }),
});


export const collections = {
  'products': productsCollection,
  'news': newsCollection, 
  'careers': careersCollection,
  'banners': bannersCollection,
};