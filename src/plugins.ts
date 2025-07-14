/**
 * 插件集合
 */

import fs from 'fs';
import path from 'path';
import { ViteFlexibleInjectOptions } from './types';

/**
 * 生成 flexible 脚本内容
 * @param options 配置选项
 * @returns 脚本内容
 */
function generateFlexibleScriptContent(options: ViteFlexibleInjectOptions = {}): string {
  const hasMin = typeof options.minFontSize === 'number';
  const hasMax = typeof options.maxFontSize === 'number';
  const minFontSize = hasMin ? options.minFontSize : null;
  const maxFontSize = hasMax ? options.maxFontSize : null;
  const baseWidth = options.baseWidth || 375;

  // 只在传参时插入边界判断
  let boundaryLogic = '';
  if (hasMin) {
    boundaryLogic += '\n    if (minFontSize !== null && rem < minFontSize) { rem = minFontSize; }';
  }
  if (hasMax) {
    boundaryLogic += '\n    if (maxFontSize !== null && rem > maxFontSize) { rem = maxFontSize; }';
  }

  return `
(function flexible() {
  var docEl = document.documentElement;
  var minFontSize = ${hasMin ? minFontSize : 'null'};
  var maxFontSize = ${hasMax ? maxFontSize : 'null'};
  var baseWidth = ${baseWidth};

  function setRemUnit() {
    var rem = docEl.clientWidth / (baseWidth / 10);${boundaryLogic}
    docEl.style.fontSize = rem + 'px';
  }
  setRemUnit();
  window.addEventListener('resize', setRemUnit);
})();
`;
}

/**
 * 生成 flexible.js 文件
 * @param outPath 输出路径
 * @param options 配置选项
 * @returns 是否生成成功
 */
export function generateFlexibleScript(outPath?: string, options: ViteFlexibleInjectOptions = {}): boolean {
  try {
    const targetPath = outPath || path.resolve(process.cwd(), 'flexible.js');
    const scriptContent = generateFlexibleScriptContent(options);
    
    if (!fs.existsSync(targetPath)) {
      fs.writeFileSync(targetPath, scriptContent, 'utf-8');
      console.log(`[postcss-px-convert] 已生成 flexible.js 到: ${targetPath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('[postcss-px-convert] 生成 flexible.js 失败:', error);
    return false;
  }
}

/**
 * Vite 插件：自动注入 flexible.js
 * @param options 插件配置
 * @returns Vite 插件
 */
export function viteFlexibleInject(options: ViteFlexibleInjectOptions = {}) {
  const scriptPath = options.flexibleScriptPath || '/flexible.js';
  const scriptContent = generateFlexibleScriptContent(options);
  
  return {
    name: 'vite-flexible-inject',
    transformIndexHtml(html: string) {
      // 插入到 <head> 末尾
      return html.replace(
        /(<head[^>]*>)/i,
        `$1\n<script>${scriptContent}</script>`
      );
    }
  };
} 