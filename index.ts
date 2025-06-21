/**
 * postcss-px-convert
 * 一个支持 px 转 rem 或 vw 的 PostCSS 插件和 Node 工具
 */

import { px2any, px2anyPostcss } from './core';
import { Px2AnyOptions } from './types';
import { viteFlexibleInject } from './plugins/viteFlexibleInject';
import { generateFlexibleScript } from './plugins/flexibleScript';

/**
 * PostCSS 插件工厂函数
 * @param options 插件配置
 * @returns PostCSS 插件
 */
function postcssPxConvert(options: Px2AnyOptions = { unitToConvert: 'rem' }) {
  // 检查是否需要生成 flexible.js
  if (options.injectFlexibleScript) {
    generateFlexibleScript(options.flexibleScriptPath);
  }
  
  return {
    postcssPlugin: 'postcss-px-convert',
    Once(root: any, { opts }: any) {
      // 优先用 options，其次 opts
      px2anyPostcss(root, options && Object.keys(options).length ? options : (opts || {}));
    }
  };
}

// 标记为 PostCSS 插件
(postcssPxConvert as any).postcss = true;

// 导出所有功能
export { px2any, px2anyPostcss, viteFlexibleInject, generateFlexibleScript };
export type { Px2AnyOptions };
export default postcssPxConvert;

// CommonJS 兼容导出
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = postcssPxConvert;
  module.exports.default = postcssPxConvert;
  module.exports.viteFlexibleInject = viteFlexibleInject;
  module.exports.px2any = px2any;
  module.exports.px2anyPostcss = px2anyPostcss;
  module.exports.generateFlexibleScript = generateFlexibleScript;
} 