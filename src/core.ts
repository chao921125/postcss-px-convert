/**
 * 核心转换逻辑
 */

import { Px2AnyOptions } from './types';
import { createPxReplace, isSelectorBlacklisted, isPropIncluded } from './utils';

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
  
  lines = lines.map(line => {
    if (ignoreReg.test(line)) {
      skip = true;
      return line;
    }
    if (skip) {
      skip = false;
      return line;
    }
    
    // propList 只转换指定属性
    if (options.propList && options.propList.length && !options.propList.includes('*')) {
      // 只处理 propList 中的属性
      return line.replace(/([\w-]+)\s*:\s*((?:\d*\.?\d+)px)/g, (m, prop, px) => {
        if (isPropIncluded(prop, options.propList!)) {
          return `${prop}: ${px.replace(/(\d*\.?\d+)px/g, pxReplace)}`;
        }
        return m;
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
      decl.value = px2any(decl.value, options);
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
