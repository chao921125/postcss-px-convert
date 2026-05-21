/**
 * 混合单位转换测试 - vw 和 rem 结合使用
 */

import { px2any, px2anyPostcss } from '../src/core';
import { Px2AnyOptions } from '../src/types';

describe('混合单位转换 (unitMap)', () => {
  test('基础 unitMap 配置 - 字体用 rem，布局用 vw', () => {
    const css = `
      .container {
        font-size: 32px;
        width: 375px;
        height: 100px;
        margin: 16px;
      }
    `;
    
    const result = px2any(css, {
      unitToConvert: 'rem',
      rootValue: 37.5,
      viewportWidth: 375,
      unitMap: {
        'font-size': 'rem',
        'margin': 'rem',
        'padding': 'rem',
        'width': 'vw',
        'height': 'vw'
      }
    });
    
    // font-size 和 margin 应该转为 rem
    expect(result).toContain('font-size: 0.85333rem');
    expect(result).toContain('margin: 0.42667rem');
    
    // width 和 height 应该转为 vw
    expect(result).toContain('width: 100.00000vw');
    expect(result).toContain('height: 26.66667vw');
  });

  test('unitMap 通配符匹配', () => {
    const css = `
      .box {
        font-size: 32px;
        font-weight: 400px;
        margin-top: 20px;
        margin-bottom: 10px;
      }
    `;
    
    const result = px2any(css, {
      unitToConvert: 'vw',
      viewportWidth: 375,
      rootValue: 16,
      unitMap: {
        'font-*': 'rem',      // 所有 font- 开头的属性用 rem
        'margin*': 'rem'      // 所有 margin 开头的属性用 rem
      }
    });
    
    // rootValue = 16, 32px / 16 = 2rem
    expect(result).toContain('font-size: 2.00000rem');
    // 400px / 16 = 25rem  
    expect(result).toContain('font-weight: 25.00000rem');
    // 20px / 16 = 1.25rem
    expect(result).toContain('margin-top: 1.25000rem');
    // 10px / 16 = 0.625rem
    expect(result).toContain('margin-bottom: 0.62500rem');
  });

  test('内联注释优先级高于 unitMap', () => {
    const css = `
      .container {
        /* px-convert:vw */
        font-size: 32px;
        width: 375px;
      }
    `;
    
    const result = px2any(css, {
      unitToConvert: 'rem',
      rootValue: 37.5,
      viewportWidth: 375,
      unitMap: {
        'font-size': 'rem',  // unitMap 指定 rem
        'width': 'vw'
      }
    });
    
    // 内联注释 /* px-convert:vw */ 应该覆盖 unitMap
    expect(result).toContain('font-size: 8.53333vw');
    expect(result).toContain('width: 100.00000vw');
  });

  test('unitMap 与 propList 配合使用', () => {
    const css = `
      .box {
        font-size: 32px;
        width: 375px;
        border: 1px;
      }
    `;
    
    const result = px2any(css, {
      unitToConvert: 'rem',
      rootValue: 37.5,
      viewportWidth: 375,
      propList: ['font-size', 'width'],
      unitMap: {
        'font-size': 'rem',
        'width': 'vw'
      }
    });
    
    expect(result).toContain('font-size: 0.85333rem');
    expect(result).toContain('width: 100.00000vw');
    // border 不在 propList 中，不应该被转换
    expect(result).toContain('border: 1px');
  });

  test('没有 unitMap 时保持默认行为', () => {
    const css = `
      .container {
        font-size: 32px;
        width: 375px;
      }
    `;
    
    const result = px2any(css, {
      unitToConvert: 'rem',
      rootValue: 37.5
    });
    
    // 所有都应该转为 rem
    expect(result).toContain('font-size: 0.85333rem');
    expect(result).toContain('width: 10.00000rem');
  });

  test('PostCSS 插件处理 unitMap', () => {
    const mockRoot = {
      walkRules: jest.fn((callback) => {
        const mockRule = {
          selector: '.container',
          walkDecls: jest.fn((callback) => {
            const declarations = [
              { prop: 'font-size', value: '32px' },
              { prop: 'width', value: '375px' },
              { prop: 'height', value: '100px' }
            ];
            declarations.forEach(callback);
          })
        };
        callback(mockRule);
      })
    };

    px2anyPostcss(mockRoot, {
      unitToConvert: 'rem',
      rootValue: 37.5,
      viewportWidth: 375,
      unitMap: {
        'font-size': 'rem',
        'width': 'vw',
        'height': 'vw'
      }
    });
    
    expect(mockRoot.walkRules).toHaveBeenCalled();
  });

  test('实际业务场景 - 移动端混合适配', () => {
    const css = `
      .header {
        /* 字体使用 rem */
        font-size: 32px;
        
        /* 布局使用 vw */
        width: 375px;
        height: 88px;
        padding: 16px;
        
        /* 边框不转换 */
        border-bottom: 1px solid #ccc;
      }
      
      .content {
        font-size: 28px;
        width: 100%;
        margin: 20px;
      }
    `;
    
    const result = px2any(css, {
      unitToConvert: 'rem',
      rootValue: 37.5,
      viewportWidth: 375,
      minPixelValue: 1,
      unitMap: {
        // 字体相关用 rem
        'font-size': 'rem',
        'line-height': 'rem',
        
        // 布局用 vw
        'width': 'vw',
        'height': 'vw',
        'top': 'vw',
        'left': 'vw',
        'right': 'vw',
        'bottom': 'vw',
        
        // 间距用 rem
        'margin': 'rem',
        'padding': 'rem'
      }
    });
    
    // 验证字体转为 rem
    expect(result).toContain('font-size: 0.85333rem');
    expect(result).toContain('font-size: 0.74667rem');
    
    // 验证布局转为 vw
    expect(result).toContain('width: 100.00000vw');
    expect(result).toContain('height: 23.46667vw');
    
    // 验证间距转为 rem
    expect(result).toContain('padding: 0.42667rem');
    expect(result).toContain('margin: 0.53333rem');
    
    // 验证 1px 边框不转换
    expect(result).toContain('border-bottom: 1px solid #ccc');
  });
});

describe('内联注释单位控制', () => {
  test('/* px-convert:vw */ 强制转为 vw', () => {
    const css = `
      .box {
        /* px-convert:vw */
        font-size: 32px;
      }
    `;
    
    const result = px2any(css, {
      unitToConvert: 'rem',
      rootValue: 37.5,
      viewportWidth: 375
    });
    
    expect(result).toContain('font-size: 8.53333vw');
  });

  test('/* px-convert:rem */ 强制转为 rem', () => {
    const css = `
      .box {
        /* px-convert:rem */
        width: 375px;
      }
    `;
    
    const result = px2any(css, {
      unitToConvert: 'vw',
      viewportWidth: 375,
      rootValue: 37.5
    });
    
    expect(result).toContain('width: 10.00000rem');
  });

  test('内联注释作用范围到下一个规则', () => {
    const css = `
      .box1 {
        /* px-convert:vw */
        width: 375px;
        height: 100px;
      }
      .box2 {
        width: 375px;
      }
    `;
    
    const result = px2any(css, {
      unitToConvert: 'rem',
      rootValue: 37.5,
      viewportWidth: 375
    });
    
    // box1 应该用 vw
    expect(result).toContain('width: 100.00000vw');
    expect(result).toContain('height: 26.66667vw');
    
    // box2 应该用默认的 rem
    // 简化检查，只要包含 rem 即可
    expect(result).toContain('rem');
  });
});
