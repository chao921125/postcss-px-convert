/**
 * Vite 插件：自动注入 flexible.js
 */
import { ViteFlexibleInjectOptions } from '../types';
/**
 * Vite 插件工厂函数
 * @param options 插件配置
 * @returns Vite 插件
 */
export declare function viteFlexibleInject(options?: ViteFlexibleInjectOptions): {
    name: string;
    transformIndexHtml(html: string): string;
};
//# sourceMappingURL=viteFlexibleInject.d.ts.map