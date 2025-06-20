import postcss from 'postcss';
import { px2any, px2anyPostcss } from './core';
import { Px2AnyOptions } from './types';

// postcss 插件用法
const plugin = (options: Px2AnyOptions = { unitToConvert: 'rem' }) => {
  return {
    postcssPlugin: 'postcss-pxremvw',
    Once (root: any) {
      px2anyPostcss(root, options);
    }
  };
};
plugin.postcss = true;

// node API
export { px2any, plugin };
export type { Px2AnyOptions };
