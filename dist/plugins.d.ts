/**
 * 插件集合
 */
import { ViteFlexibleInjectOptions } from './types';
/**
 * 生成 flexible.js 文件
 * @param outPath 输出路径
 * @returns 是否生成成功
 */
export declare function generateFlexibleScript(outPath?: string): boolean;
/**
 * Vite 插件：自动注入 flexible.js
 * @param options 插件配置
 * @returns Vite 插件
 */
export declare function viteFlexibleInject(options?: ViteFlexibleInjectOptions): {
    name: string;
    transformIndexHtml(html: string): string;
};
//# sourceMappingURL=plugins.d.ts.map