"use strict";
/**
 * 工具方法集合
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFixed = toFixed;
exports.isSelectorBlacklisted = isSelectorBlacklisted;
exports.isPropIncluded = isPropIncluded;
exports.isFileIncluded = isFileIncluded;
exports.createPxReplace = createPxReplace;
/**
 * 严格四舍五入到指定精度
 * @param num 数字
 * @param precision 精度
 * @returns 格式化后的字符串
 */
function toFixed(num, precision) {
    return (Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision);
}
/**
 * 检查选择器是否在黑名单中
 * @param selector 选择器
 * @param blackList 黑名单列表
 * @returns 是否在黑名单中
 */
function isSelectorBlacklisted(selector, blackList) {
    return blackList.some((item) => {
        if (typeof item === 'string') {
            return selector.includes(item);
        }
        else {
            return item.test(selector);
        }
    });
}
/**
 * 检查属性是否在包含列表中
 * @param prop 属性名
 * @param propList 属性列表
 * @returns 是否包含
 */
function isPropIncluded(prop, propList) {
    if (propList.includes('*'))
        return true;
    return propList.some((item) => {
        if (item.endsWith('*')) {
            return prop.startsWith(item.slice(0, -1));
        }
        else if (item.startsWith('*')) {
            return prop.endsWith(item.slice(1));
        }
        else {
            return prop === item;
        }
    });
}
/**
 * 检查文件是否在包含/排除列表中
 * @param filepath 文件路径
 * @param include 包含列表
 * @param exclude 排除列表
 * @returns 是否包含
 */
function isFileIncluded(filepath, include, exclude) {
    if (exclude && exclude.some((item) => (typeof item === 'string' ? filepath.includes(item) : item.test(filepath)))) {
        return false;
    }
    if (include && include.length > 0) {
        return include.some((item) => (typeof item === 'string' ? filepath.includes(item) : item.test(filepath)));
    }
    return true;
}
/**
 * 创建 px 替换函数
 * @param options 配置选项
 * @param isLandscape 是否横屏
 * @returns 替换函数
 */
function createPxReplace(options, isLandscape = false) {
    return function (m, $1) {
        if (!$1)
            return m;
        const px = parseFloat($1);
        if (px <= options.minPixelValue)
            return m;
        let unit = isLandscape ? options.landscapeUnit : options.unitToConvert;
        let converted;
        if (unit === 'rem') {
            converted = px / options.rootValue;
        }
        else if (unit === 'vw') {
            const width = isLandscape ? options.landscapeWidth : options.viewportWidth;
            converted = px / width * 100;
        }
        else {
            return m;
        }
        let value = toFixed(converted, options.unitPrecision);
        let result = `${value}${unit}`;
        if (options.customPxReplace) {
            return options.customPxReplace(px, result, unit);
        }
        return result;
    };
}
//# sourceMappingURL=index.js.map