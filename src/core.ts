/**
 * 核心转换逻辑
 */

import { Px2AnyOptions, UnitToConvert } from './types';
import { createPxReplace, isSelectorBlacklisted, isPropIncluded, getUnitForProperty, parseInlineUnitComment } from './utils';

const defaultOptions: Required<Px2AnyOptions> = {
  unitToConvert: 'rem',
  rootValue: 16,
  viewportWidth: 375,
  unitPrecision: 5,
  minPixelValue: 1,
  selectorBlackList: [],
  propList: ['*'],
  mediaQuery: false,
  include: [],
  exclude: [],
  landscape: false,
  landscapeUnit: 'vw',
  landscapeWidth: 568,
  ignoreComment: 'no',
  customPxReplace: (px, converted, unit) => converted,
  injectFlexibleScript: false,
  flexibleScriptPath: '',
  unitMap: {},
};

/**
 * 将 CSS 中的 px 转换为 rem 或 vw
 * @param css CSS 字符串
 * @param userOptions 用户配置
 * @returns 转换后的 CSS 字符串
 */
export function px2any(css: string, userOptions: Px2AnyOptions): string {
  const options = { ...defaultOptions, ...userOptions } as Required<Px2AnyOptions>;
  const pxReplace = createPxReplace(options, false); // 主样式始终用 unitToConvert
  const pxReplaceLandscape = options.landscape ? createPxReplace(options, true) : null;
  
  // 注释忽略实现
  const ignoreComment = options.ignoreComment || 'no';
  const ignoreReg = /\/\*\s*px-convert-ignore\s*\*\//;
  
  // 横屏适配：先处理 @media (orientation: landscape) 块
  if (pxReplaceLandscape && options.landscape) {
    css = css.replace(/@media\s*\([^)]*orientation:\s*landscape[^)]*\)\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, (match, content) => {
      return match.replace(content, px2any(content, {
        ...defaultOptions,
        unitToConvert: options.landscapeUnit,
        viewportWidth: options.landscapeWidth,
        landscape: false, // 递归时强制关闭横屏标志
      }));
    });
  }
  
  let lines = css.split(/(?<=;|\{|\})/);
  let skip = false;
  let currentInlineUnit: string | null = null; // 内联注释指定的单位
  let inRuleBlock = false; // 是否在规则块内
  
  lines = lines.map(line => {
    // 检查是否是选择器开始（进入新规则块）
    if (line.trim().endsWith('{')) {
      inRuleBlock = true;
      currentInlineUnit = null; // 进入新规则块时重置内联单位
    }
    
    // 检查是否是块结束
    if (line.trim() === '}' || line.trim().endsWith('}')) {
      inRuleBlock = false;
      currentInlineUnit = null; // 离开规则块时重置内联单位
    }
    
    // 检查忽略注释
    if (ignoreReg.test(line)) {
      skip = true;
      return line;
    }
    if (skip) {
      skip = false;
      return line;
    }
    
    // 检查内联单位注释 /* px-convert:vw */ 或 /* px-convert:rem */
    const inlineUnit = parseInlineUnitComment(line);
    if (inlineUnit) {
      currentInlineUnit = inlineUnit;
    }
    
    // propList 只转换指定属性
    if (options.propList && options.propList.length && !options.propList.includes('*')) {
      // 只处理 propList 中的属性
      return line.replace(/([\w-]+)\s*:\s*((?:\d*\.?\d+)px)/g, (m, prop, px) => {
        if (isPropIncluded(prop, options.propList!)) {
          // 根据优先级确定单位：内联注释 > unitMap > 默认单位
          const unit = (currentInlineUnit || getUnitForProperty(prop, options.unitMap, options.unitToConvert)) as UnitToConvert;
          
          // 如果单位与默认不同，需要创建临时的替换函数
          if (unit !== options.unitToConvert) {
            const tempOptions: Px2AnyOptions = { ...options, unitToConvert: unit };
            const tempPxReplace = createPxReplace(tempOptions, false);
            return `${prop}: ${px.replace(/(\d*\.?\d+)px/g, tempPxReplace)}`;
          }
          
          return `${prop}: ${px.replace(/(\d*\.?\d+)px/g, pxReplace)}`;
        }
        return m;
      });
    }
    
    // 处理所有 px 值（当 propList 为 ['*'] 时）
    if (options.unitMap && Object.keys(options.unitMap).length > 0 || currentInlineUnit) {
      // 需要逐行解析属性来确定单位
      return line.replace(/([\w-]+)\s*:\s*((?:\d*\.?\d+)px)/g, (m, prop, px) => {
        // 根据优先级确定单位：内联注释 > unitMap > 默认单位
        const unit = (currentInlineUnit || getUnitForProperty(prop, options.unitMap, options.unitToConvert)) as UnitToConvert;
        
        // 如果单位与默认不同，需要创建临时的替换函数
        if (unit !== options.unitToConvert) {
          const tempOptions: Px2AnyOptions = { ...options, unitToConvert: unit };
          const tempPxReplace = createPxReplace(tempOptions, false);
          return `${prop}: ${px.replace(/(\d*\.?\d+)px/g, tempPxReplace)}`;
        }
        
        return `${prop}: ${px.replace(/(\d*\.?\d+)px/g, pxReplace)}`;
      });
    }
    
    return line.replace(/(\d*\.?\d+)px/g, pxReplace);
  });
  
  return lines.join('');
}

/**
 * PostCSS 插件处理函数
 * @param root PostCSS 根节点
 * @param options 配置选项
 */
export function px2anyPostcss(root: any, options: Px2AnyOptions) {
  root.walkRules((rule: any) => {
    if (isSelectorBlacklisted(rule.selector, options.selectorBlackList || [])) return;
    rule.walkDecls((decl: any) => {
      if (!isPropIncluded(decl.prop, options.propList || ['*'])) return;
      
      // 根据 unitMap 确定该属性的转换单位
      const unit = getUnitForProperty(decl.prop, options.unitMap, options.unitToConvert || 'rem') as UnitToConvert;
      
      // 如果单位与默认不同，创建临时配置
      if (unit !== options.unitToConvert) {
        // 关键修复：不使用 unitMap，直接指定 unitToConvert
        const tempOptions: Px2AnyOptions = { 
          ...options, 
          unitToConvert: unit,
          unitMap: {}  // 清空 unitMap，避免 px2any 尝试解析属性名
        };
        decl.value = px2any(decl.value, tempOptions);
      } else {
        // 也清空 unitMap，提高性能
        const defaultOptions: Px2AnyOptions = {
          ...options,
          unitMap: {}
        };
        decl.value = px2any(decl.value, defaultOptions);
      }
    });
  });
  
  if (options.mediaQuery) {
    root.walkAtRules('media', (rule: any) => {
      rule.params = px2any(rule.params, options);
    });
  }
}

export function isFileIncluded(filepath: string, include: (string|RegExp)[], exclude: (string|RegExp)[]): boolean {
  if (exclude && exclude.some((item) => (typeof item === 'string' ? filepath.includes(item) : item.test(filepath)))) {
    return false;
  }
  if (include && include.length > 0) {
    return include.some((item) => (typeof item === 'string' ? filepath.includes(item) : item.test(filepath)));
  }
  return true;
}
