"use strict";
/**
 * 插件集合
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFlexibleScript = generateFlexibleScript;
exports.viteFlexibleInject = viteFlexibleInject;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
/**
 * 生成 flexible.js 文件
 * @param outPath 输出路径
 * @returns 是否生成成功
 */
function generateFlexibleScript(outPath) {
    try {
        const targetPath = outPath || path_1.default.resolve(process.cwd(), 'flexible.js');
        if (!fs_1.default.existsSync(targetPath)) {
            fs_1.default.writeFileSync(targetPath, FLEXIBLE_SCRIPT, 'utf-8');
            console.log(`[postcss-px-convert] 已生成 flexible.js 到: ${targetPath}`);
            return true;
        }
        return false;
    }
    catch (error) {
        console.error('[postcss-px-convert] 生成 flexible.js 失败:', error);
        return false;
    }
}
/**
 * Vite 插件：自动注入 flexible.js
 * @param options 插件配置
 * @returns Vite 插件
 */
function viteFlexibleInject(options = {}) {
    const scriptPath = options.flexibleScriptPath || '/flexible.js';
    return {
        name: 'vite-flexible-inject',
        transformIndexHtml(html) {
            // 插入到 <head> 末尾
            return html.replace(/(<head[^>]*>)/i, `$1\n<script src="${scriptPath}"></script>`);
        }
    };
}
//# sourceMappingURL=plugins.js.map