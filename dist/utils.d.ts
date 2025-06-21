/**
 * 工具方法集合
 */
/**
 * 严格四舍五入到指定精度
 * @param num 数字
 * @param precision 精度
 * @returns 格式化后的字符串
 */
export declare function toFixed(num: number, precision: number): string;
/**
 * 检查选择器是否在黑名单中
 * @param selector 选择器
 * @param blackList 黑名单列表
 * @returns 是否在黑名单中
 */
export declare function isSelectorBlacklisted(selector: string, blackList: (string | RegExp)[]): boolean;
/**
 * 检查属性是否在包含列表中
 * @param prop 属性名
 * @param propList 属性列表
 * @returns 是否包含
 */
export declare function isPropIncluded(prop: string, propList: string[]): boolean;
/**
 * 检查文件是否在包含/排除列表中
 * @param filepath 文件路径
 * @param include 包含列表
 * @param exclude 排除列表
 * @returns 是否包含
 */
export declare function isFileIncluded(filepath: string, include: (string | RegExp)[], exclude: (string | RegExp)[]): boolean;
/**
 * 创建 px 替换函数
 * @param options 配置选项
 * @param isLandscape 是否横屏
 * @returns 替换函数
 */
export declare function createPxReplace(options: any, isLandscape?: boolean): (m: string, $1: string) => any;
//# sourceMappingURL=utils.d.ts.map