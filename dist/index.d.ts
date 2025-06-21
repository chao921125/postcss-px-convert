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
declare function postcssPxConvert(options?: Px2AnyOptions): {
    postcssPlugin: string;
    Once(root: any, { opts }: any): void;
};
export { px2any, px2anyPostcss, viteFlexibleInject, generateFlexibleScript };
export type { Px2AnyOptions };
export default postcssPxConvert;
//# sourceMappingURL=index.d.ts.map