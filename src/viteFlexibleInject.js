"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viteFlexibleInject = viteFlexibleInject;
function viteFlexibleInject(options = {}) {
    const scriptPath = options.flexibleScriptPath || '/flexible.js';
    return {
        name: 'vite-flexible-inject',
        transformIndexHtml(html) {
            // 插入到 <head> 末尾
            return html.replace(/(<head[^>]*>)/i, `$1\n<script src=\"${scriptPath}\"></script>`);
        }
    };
}
