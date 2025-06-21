/**
 * 工具方法测试
 */

import { toFixed, isSelectorBlacklisted, isPropIncluded, isFileIncluded, createPxReplace } from '../utils';

describe('toFixed', () => {
  test('基础四舍五入', () => {
    expect(toFixed(3.14159, 2)).toBe('3.14');
    expect(toFixed(3.14559, 2)).toBe('3.15');
  });

  test('精度为 0', () => {
    expect(toFixed(3.6, 0)).toBe('4');
    expect(toFixed(3.4, 0)).toBe('3');
  });

  test('负数', () => {
    expect(toFixed(-3.14159, 2)).toBe('-3.14');
  });
});

describe('isSelectorBlacklisted', () => {
  test('字符串匹配', () => {
    const blackList = ['.ignore', '.no-convert'];
    expect(isSelectorBlacklisted('.ignore', blackList)).toBe(true);
    expect(isSelectorBlacklisted('.no-convert', blackList)).toBe(true);
    expect(isSelectorBlacklisted('.normal', blackList)).toBe(false);
  });

  test('正则匹配', () => {
    const blackList = [/^\.ant-/, /^\.el-/];
    expect(isSelectorBlacklisted('.ant-button', blackList)).toBe(true);
    expect(isSelectorBlacklisted('.el-input', blackList)).toBe(true);
    expect(isSelectorBlacklisted('.normal', blackList)).toBe(false);
  });

  test('混合匹配', () => {
    const blackList = ['.ignore', /^\.ant-/];
    expect(isSelectorBlacklisted('.ignore', blackList)).toBe(true);
    expect(isSelectorBlacklisted('.ant-button', blackList)).toBe(true);
    expect(isSelectorBlacklisted('.normal', blackList)).toBe(false);
  });
});

describe('isPropIncluded', () => {
  test('通配符 *', () => {
    const propList = ['*'];
    expect(isPropIncluded('font-size', propList)).toBe(true);
    expect(isPropIncluded('margin', propList)).toBe(true);
  });

  test('精确匹配', () => {
    const propList = ['font-size', 'margin'];
    expect(isPropIncluded('font-size', propList)).toBe(true);
    expect(isPropIncluded('margin', propList)).toBe(true);
    expect(isPropIncluded('padding', propList)).toBe(false);
  });

  test('前缀通配符', () => {
    const propList = ['margin*'];
    expect(isPropIncluded('margin', propList)).toBe(true);
    expect(isPropIncluded('margin-top', propList)).toBe(true);
    expect(isPropIncluded('padding', propList)).toBe(false);
  });

  test('后缀通配符', () => {
    const propList = ['*size'];
    expect(isPropIncluded('font-size', propList)).toBe(true);
    expect(isPropIncluded('width', propList)).toBe(false);
  });
});

describe('isFileIncluded', () => {
  test('排除文件', () => {
    const include: (string | RegExp)[] = [];
    const exclude: (string | RegExp)[] = [/node_modules/];
    expect(isFileIncluded('./src/style.css', include, exclude)).toBe(true);
    expect(isFileIncluded('./node_modules/antd/style.css', include, exclude)).toBe(false);
  });

  test('包含文件', () => {
    const include: (string | RegExp)[] = [/\.css$/];
    const exclude: (string | RegExp)[] = [];
    expect(isFileIncluded('./src/style.css', include, exclude)).toBe(true);
    expect(isFileIncluded('./src/style.scss', include, exclude)).toBe(false);
  });

  test('包含和排除同时存在', () => {
    const include: (string | RegExp)[] = [/\.css$/];
    const exclude: (string | RegExp)[] = [/node_modules/];
    expect(isFileIncluded('./src/style.css', include, exclude)).toBe(true);
    expect(isFileIncluded('./node_modules/antd/style.css', include, exclude)).toBe(false);
  });
});

describe('createPxReplace', () => {
  test('rem 转换', () => {
    const options = {
      unitToConvert: 'rem' as const,
      rootValue: 16,
      unitPrecision: 5,
      minPixelValue: 1
    };
    const pxReplace = createPxReplace(options);
    
    expect(pxReplace('32px', '32')).toBe('2.00000rem');
    expect(pxReplace('16px', '16')).toBe('1.00000rem');
  });

  test('vw 转换', () => {
    const options = {
      unitToConvert: 'vw' as const,
      viewportWidth: 375,
      unitPrecision: 5,
      minPixelValue: 1
    };
    const pxReplace = createPxReplace(options);
    
    expect(pxReplace('32px', '32')).toBe('8.53333vw');
    expect(pxReplace('375px', '375')).toBe('100.00000vw');
  });

  test('最小转换值过滤', () => {
    const options = {
      unitToConvert: 'rem' as const,
      rootValue: 16,
      unitPrecision: 5,
      minPixelValue: 2
    };
    const pxReplace = createPxReplace(options);
    
    expect(pxReplace('1px', '1')).toBe('1px');
    expect(pxReplace('2px', '2')).toBe('2px');
  });

  test('自定义转换函数', () => {
    const options = {
      unitToConvert: 'rem' as const,
      rootValue: 16,
      unitPrecision: 5,
      minPixelValue: 1,
      customPxReplace: (px: number, converted: string, unit: string) => {
        if (px === 32) return '2rem';
        return converted;
      }
    };
    const pxReplace = createPxReplace(options);
    
    expect(pxReplace('32px', '32')).toBe('2rem');
    expect(pxReplace('16px', '16')).toBe('1.00000rem');
  });
}); 