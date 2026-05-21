/**
 * 工具方法集合
 */

/**
 * 严格四舍五入到指定精度
 * @param num 数字
 * @param precision 精度
 * @returns 格式化后的字符串
 */
export function toFixed(num: number, precision: number): string {
  return (Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision);
}

/**
 * 检查选择器是否在黑名单中
 * @param selector 选择器
 * @param blackList 黑名单列表
 * @returns 是否在黑名单中
 */
export function isSelectorBlacklisted(selector: string, blackList: (string | RegExp)[]): boolean {
  return blackList.some((item) => {
    if (typeof item === 'string') {
      return selector.includes(item);
    } else {
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
export function isPropIncluded(prop: string, propList: string[]): boolean {
  if (propList.includes('*')) return true;
  return propList.some((item) => {
    if (item.endsWith('*')) {
      return prop.startsWith(item.slice(0, -1));
    } else if (item.startsWith('*')) {
      return prop.endsWith(item.slice(1));
    } else {
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
export function isFileIncluded(filepath: string, include: (string|RegExp)[], exclude: (string|RegExp)[]): boolean {
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
export function createPxReplace(options: any, isLandscape = false) {
  return function (m: string, $1: string) {
    if (!$1) return m;
    const px = parseFloat($1);
    if (px <= options.minPixelValue) return m;
    let unit = isLandscape ? options.landscapeUnit : options.unitToConvert;
    let converted: number;
    if (unit === 'rem') {
      converted = px / options.rootValue;
    } else if (unit === 'vw') {
      const width = isLandscape ? options.landscapeWidth : options.viewportWidth;
      converted = px / width * 100;
    } else {
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

/**
 * 根据属性名获取应该使用的转换单位
 * @param prop CSS 属性名
 * @param unitMap 单位映射配置
 * @param defaultUnit 默认单位
 * @returns 转换单位
 */
export function getUnitForProperty(prop: string, unitMap: any, defaultUnit: string): string {
  if (!unitMap || Object.keys(unitMap).length === 0) {
    return defaultUnit;
  }

  // 精确匹配
  if (unitMap[prop]) {
    return unitMap[prop];
  }

  // 通配符匹配
  for (const pattern in unitMap) {
    if (pattern.endsWith('*') && !pattern.startsWith('*')) {
      // font-* 匹配 font-size, font-weight 等
      const prefix = pattern.slice(0, -1);
      if (prop.startsWith(prefix)) {
        return unitMap[pattern];
      }
    } else if (pattern.startsWith('*') && !pattern.endsWith('*')) {
      // *size 匹配 font-size, icon-size 等
      const suffix = pattern.slice(1);
      if (prop.endsWith(suffix)) {
        return unitMap[pattern];
      }
    } else if (pattern.includes('*')) {
      // margin* 匹配 margin, margin-top, margin-bottom 等
      const prefix = pattern.slice(0, -1);
      if (prop === prefix || prop.startsWith(prefix + '-')) {
        return unitMap[pattern];
      }
    }
  }

  return defaultUnit;
}

/**
 * 解析 CSS 值中的内联单位注释
 * 例如: /* px-convert:vw * / width: 375px;
 * @param line CSS 行内容
 * @returns 指定的单位或 null
 */
export function parseInlineUnitComment(line: string): string | null {
  const match = line.match(/\/\*\s*px-convert\s*:\s*(rem|vw)\s*\*\//i);
  return match ? match[1] : null;
} 