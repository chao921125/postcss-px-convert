"use strict";
/**
 * Vite 插件：自动注入 flexible.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteFlexibleInject = viteFlexibleInject;
/**
 * Vite 插件工厂函数
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
//# sourceMappingURL=viteFlexibleInject.js.map