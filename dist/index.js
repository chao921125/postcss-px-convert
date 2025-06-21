"use strict";
/**
 * postcss-px-convert
 * 一个支持 px 转 rem 或 vw 的 PostCSS 插件和 Node 工具
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFlexibleScript = exports.viteFlexibleInject = exports.px2anyPostcss = exports.px2any = void 0;
const core_1 = require("./src/core");
Object.defineProperty(exports, "px2any", { enumerable: true, get: function () { return core_1.px2any; } });
Object.defineProperty(exports, "px2anyPostcss", { enumerable: true, get: function () { return core_1.px2anyPostcss; } });
const plugins_1 = require("./src/plugins");
Object.defineProperty(exports, "viteFlexibleInject", { enumerable: true, get: function () { return plugins_1.viteFlexibleInject; } });
Object.defineProperty(exports, "generateFlexibleScript", { enumerable: true, get: function () { return plugins_1.generateFlexibleScript; } });
/**
 * PostCSS 插件工厂函数
 * @param options 插件配置
 * @returns PostCSS 插件
 */
function postcssPxConvert(options = { unitToConvert: 'rem' }) {
    // 检查是否需要生成 flexible.js
    if (options.injectFlexibleScript) {
        (0, plugins_1.generateFlexibleScript)(options.flexibleScriptPath);
    }
    return {
        postcssPlugin: 'postcss-px-convert',
        Once(root, { opts }) {
            // 优先用 options，其次 opts
            (0, core_1.px2anyPostcss)(root, options && Object.keys(options).length ? options : (opts || {}));
        }
    };
}
// 标记为 PostCSS 插件
postcssPxConvert.postcss = true;
exports.default = postcssPxConvert;
// CommonJS 兼容导出
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = postcssPxConvert;
    module.exports.default = postcssPxConvert;
    module.exports.viteFlexibleInject = plugins_1.viteFlexibleInject;
    module.exports.px2any = core_1.px2any;
    module.exports.px2anyPostcss = core_1.px2anyPostcss;
    module.exports.generateFlexibleScript = plugins_1.generateFlexibleScript;
}
//# sourceMappingURL=index.js.map