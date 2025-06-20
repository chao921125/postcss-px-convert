export function viteFlexibleInject(options: { flexibleScriptPath?: string } = {}) {
  const scriptPath = options.flexibleScriptPath || '/flexible.js';
  return {
    name: 'vite-flexible-inject',
    transformIndexHtml(html: string) {
      // 插入到 <head> 末尾
      return html.replace(
        /(<head[^>]*>)/i,
        `$1\n<script src=\"${scriptPath}\"></script>`
      );
    }
  };
} 