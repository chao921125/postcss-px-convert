"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteFlexibleInject = exports.px2any = void 0;
const core_1 = require("./core");
Object.defineProperty(exports, "px2any", { enumerable: true, get: function () { return core_1.px2any; } });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const viteFlexibleInject_1 = require("./viteFlexibleInject");
Object.defineProperty(exports, "viteFlexibleInject", { enumerable: true, get: function () { return viteFlexibleInject_1.viteFlexibleInject; } });
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
function postcssPxConvert(options = { unitToConvert: 'rem' }) {
    // 检查是否需要生成 flexible.js
    if (options.injectFlexibleScript) {
        // 默认输出到项目根目录 flexible.js，或用户自定义路径
        const outPath = options.flexibleScriptPath || path_1.default.resolve(process.cwd(), 'flexible.js');
        if (!fs_1.default.existsSync(outPath)) {
            fs_1.default.writeFileSync(outPath, FLEXIBLE_SCRIPT, 'utf-8');
            // eslint-disable-next-line no-console
            console.log(`[postcss-px-convert] 已生成 flexible.js 到: ${outPath}`);
        }
    }
    return {
        postcssPlugin: 'postcss-px-convert',
        Once(root, { opts }) {
            // 优先用 options，其次 opts
            (0, core_1.px2anyPostcss)(root, options && Object.keys(options).length ? options : (opts || {}));
        }
    };
}
postcssPxConvert.postcss = true;
// 默认导出工厂函数，支持对象键值对和函数写法
exports.default = postcssPxConvert;
// CommonJS 兼容导出
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = postcssPxConvert;
    module.exports.default = postcssPxConvert;
    module.exports.viteFlexibleInject = viteFlexibleInject_1.viteFlexibleInject;
}
