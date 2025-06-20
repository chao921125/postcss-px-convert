import { px2any, px2anyPostcss } from './core';
import { Px2AnyOptions } from './types';
import fs from 'fs';
import path from 'path';
import { viteFlexibleInject } from './viteFlexibleInject';

// flexible 脚本内容
const FLEXIBLE_SCRIPT = `
(function flexible() {
  var docEl = document.documentElement;
  function setRemUnit() {
    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + 'px';
  }
  setRemUnit();
  window.addEventListener('resize', setRemUnit);
})();
`;

// 工厂函数写法，兼容对象和函数两种调用
function postcssPxConvert(options: Px2AnyOptions & { injectFlexibleScript?: boolean, flexibleScriptPath?: string } = { unitToConvert: 'rem' }) {
  // 检查是否需要生成 flexible.js
  if (options.injectFlexibleScript) {
    // 默认输出到项目根目录 flexible.js，或用户自定义路径
    const outPath = options.flexibleScriptPath || path.resolve(process.cwd(), 'flexible.js');
    if (!fs.existsSync(outPath)) {
      fs.writeFileSync(outPath, FLEXIBLE_SCRIPT, 'utf-8');
      // eslint-disable-next-line no-console
      console.log(`[postcss-px-convert] 已生成 flexible.js 到: ${outPath}`);
    }
  }
  return {
    postcssPlugin: 'postcss-px-convert',
    Once(root: any, { opts }: any) {
      // 优先用 options，其次 opts
      px2anyPostcss(root, options && Object.keys(options).length ? options : (opts || {}));
    }
  };
}
(postcssPxConvert as any).postcss = true;

// node API
export { px2any, viteFlexibleInject };
export type { Px2AnyOptions };
// 默认导出工厂函数，支持对象键值对和函数写法
export default postcssPxConvert;
// CommonJS 兼容导出
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = postcssPxConvert;
  module.exports.default = postcssPxConvert;
  module.exports.viteFlexibleInject = viteFlexibleInject;
}
