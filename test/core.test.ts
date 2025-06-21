/**
 * 核心功能测试
 */

import { px2any, px2anyPostcss } from '../core';
import { Px2AnyOptions } from '../types';

describe('px2any', () => {
  const defaultOptions: Px2AnyOptions = {
    unitToConvert: 'rem',
    rootValue: 16
  };

  test('基础 px 转 rem', () => {
    const css = 'body { font-size: 32px; margin: 16px; }';
    const result = px2any(css, defaultOptions);
    expect(result).toBe('body { font-size: 2.00000rem; margin: 1.00000rem; }');
  });

  test('基础 px 转 vw', () => {
    const css = 'body { font-size: 32px; margin: 16px; }';
    const result = px2any(css, { unitToConvert: 'vw', viewportWidth: 375 });
    expect(result).toBe('body { font-size: 8.53333vw; margin: 4.26667vw; }');
  });

  test('小数 px 转换', () => {
    const css = 'body { font-size: 12.5px; }';
    const result = px2any(css, defaultOptions);
    expect(result).toBe('body { font-size: 0.78125rem; }');
  });

  test('最小转换值过滤', () => {
    const css = 'body { font-size: 1px; margin: 0.5px; }';
    const result = px2any(css, { ...defaultOptions, minPixelValue: 1 });
    expect(result).toBe('body { font-size: 1px; margin: 0.5px; }');
  });

  test('忽略注释', () => {
    const css = `
      body { font-size: 32px; }
      /* px-convert-ignore */
      .ignore { font-size: 32px; }
    `;
    const result = px2any(css, defaultOptions);
    expect(result).toContain('font-size: 2.00000rem');
    expect(result).toContain('font-size: 32px');
  });

  test('属性过滤', () => {
    const css = 'body { font-size: 32px; margin: 16px; padding: 8px; }';
    const result = px2any(css, { ...defaultOptions, propList: ['font-size'] });
    expect(result).toBe('body { font-size: 2.00000rem; margin: 16px; padding: 8px; }');
  });

  test('横屏适配', () => {
    const css = `
      body { font-size: 32px; }
      @media (orientation: landscape) {
        body { font-size: 32px; }
      }
    `;
    const result = px2any(css, {
      unitToConvert: 'rem',
      rootValue: 16,
      landscape: true,
      landscapeUnit: 'vw',
      landscapeWidth: 568
    });
    // 兼容多行和空格
    expect(result.replace(/\s+/g, ' ')).toContain('body { font-size: 2.00000rem; }');
    expect(result).toContain('font-size: 5.63380vw');
  });

  test('自定义转换函数', () => {
    const css = 'body { font-size: 32px; }';
    const result = px2any(css, {
      ...defaultOptions,
      customPxReplace: (px, converted, unit) => {
        if (px === 32) return '2rem';
        return converted;
      }
    });
    expect(result).toBe('body { font-size: 2rem; }');
  });
});

describe('px2anyPostcss', () => {
  test('PostCSS 插件处理', () => {
    const mockRoot = {
      walkRules: jest.fn((callback) => {
        const mockRule = {
          selector: 'body',
          walkDecls: jest.fn((callback) => {
            const mockDecl = {
              prop: 'font-size',
              value: '32px'
            };
            callback(mockDecl);
          })
        };
        callback(mockRule);
      })
    };

    px2anyPostcss(mockRoot, { unitToConvert: 'rem', rootValue: 16 });
    
    expect(mockRoot.walkRules).toHaveBeenCalled();
  });
}); 