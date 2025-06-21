export type UnitToConvert = 'rem' | 'vw';

export interface Px2AnyOptions {
  unitToConvert: UnitToConvert; // 转换目标单位 rem 或 vw
  rootValue?: number;           // rem 基准值，默认 16
  viewportWidth?: number;       // vw 基准宽度，默认 375
  unitPrecision?: number;       // 单位精度，默认 5
  minPixelValue?: number;       // 最小转换数值，默认 1
  selectorBlackList?: (string | RegExp)[]; // 选择器黑名单
  propList?: string[];          // 只转换指定属性，默认 ['*']
  mediaQuery?: boolean;         // 是否转换媒体查询中的 px，默认 false
  include?: (string | RegExp)[];// 只转换指定文件/文件夹
  exclude?: (string | RegExp)[];// 排除指定文件/文件夹
  landscape?: boolean;          // 是否横屏适配，默认 false
  landscapeUnit?: UnitToConvert;// 横屏时转换单位
  landscapeWidth?: number;      // 横屏基准宽度
  ignoreComment?: string;       // 忽略注释，默认 'no'
  customPxReplace?: (px: number, converted: string, unit: UnitToConvert) => string; // 自定义转换函数
  injectFlexibleScript?: boolean; // 是否自动生成 flexible.js
  flexibleScriptPath?: string;  // flexible.js 输出路径
}

export interface ViteFlexibleInjectOptions {
  flexibleScriptPath?: string;
}
