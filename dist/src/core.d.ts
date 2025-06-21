/**
 * 核心转换逻辑
 */
import { Px2AnyOptions } from './types';
/**
 * 将 CSS 中的 px 转换为 rem 或 vw
 * @param css CSS 字符串
 * @param userOptions 用户配置
 * @returns 转换后的 CSS 字符串
 */
export declare function px2any(css: string, userOptions: Px2AnyOptions): string;
/**
 * PostCSS 插件处理函数
 * @param root PostCSS 根节点
 * @param options 配置选项
 */
export declare function px2anyPostcss(root: any, options: Px2AnyOptions): void;
export declare function isFileIncluded(filepath: string, include: (string | RegExp)[], exclude: (string | RegExp)[]): boolean;
//# sourceMappingURL=core.d.ts.map