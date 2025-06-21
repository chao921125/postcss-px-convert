/**
 * Vite 插件：自动注入 flexible.js
 */

import { ViteFlexibleInjectOptions } from '../types';

/**
 * Vite 插件工厂函数
 * @param options 插件配置
 * @returns Vite 插件
 */
export function viteFlexibleInject(options: ViteFlexibleInjectOptions = {}) {
  const scriptPath = options.flexibleScriptPath || '/flexible.js';
  
  return {
    name: 'vite-flexible-inject',
    transformIndexHtml(html: string) {
      // 插入到 <head> 末尾
      return html.replace(
        /(<head[^>]*>)/i,
        `$1\n<script src="${scriptPath}"></script>`
      );
    }
  };
} 