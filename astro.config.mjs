// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import EventEmitter from 'node:events'; // 👈 引入事件发射器

import tailwindcss from '@tailwindcss/vite';

// 👈 调高默认监听限制，彻底消除开发环境下频繁保存代码导致的 MaxListeners 警告
EventEmitter.defaultMaxListeners = 30;

// https://astro.build/config
export default defineConfig({
  site: 'https://xiemoxiaoshaso-arch.github.io', // 👈 已修改：设置为您的 GitHub 域名
  base: '/jiacheng',                             // 👈 已新增：设置为您的仓库子路径

  integrations: [mdx(), sitemap()],

  // 🌟 新增：Astro 官方原生国际化多语言（i18n）系统配置
  i18n: {
    defaultLocale: 'zh',      // 默认语言为中文
    locales: ['zh', 'en'],    // 支持中文 'zh' 和 英文 'en'
    routing: {
      prefixDefaultLocale: false, // 👈 默认中文页面不加 /zh 前缀（保持原样），英文页面自动加上 /en 前缀
    }
  },

  fonts: [
      {
          provider: fontProviders.local(),
          name: 'Atkinson',
          cssVariable: '--font-atkinson',
          fallbacks: ['sans-serif'],
          options: {
              variants: [
                  {
                      src: ['./src/assets/fonts/atkinson-regular.woff'],
                      weight: 400,
                      style: 'normal',
                      display: 'swap',
                  },
                  {
                      src: ['./src/assets/fonts/atkinson-bold.woff'],
                      weight: 700,
                      style: 'normal',
                      display: 'swap',
                  },
              ],
          },
      },
	],

  vite: {
    plugins: [tailwindcss()],
  },
});