/**
 * 基础使用示例
 */

const { px2any } = require('../dist/index');

// 示例 1: 基础 px 转 rem
console.log('=== 示例 1: 基础 px 转 rem ===');
const css1 = `
  body {
    font-size: 32px;
    margin: 16px;
    padding: 8px;
  }
  
  .container {
    width: 375px;
    height: 667px;
  }
`;

const result1 = px2any(css1, {
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5
});

console.log('输入 CSS:');
console.log(css1);
console.log('\n输出 CSS:');
console.log(result1);

// 示例 2: px 转 vw
console.log('\n=== 示例 2: px 转 vw ===');
const css2 = `
  .header {
    height: 44px;
    padding: 0 16px;
  }
  
  .content {
    width: 100%;
    max-width: 750px;
  }
`;

const result2 = px2any(css2, {
  unitToConvert: 'vw',
  viewportWidth: 375,
  unitPrecision: 5
});

console.log('输入 CSS:');
console.log(css2);
console.log('\n输出 CSS:');
console.log(result2);

// 示例 3: 属性过滤
console.log('\n=== 示例 3: 属性过滤 ===');
const css3 = `
  .button {
    font-size: 16px;
    margin: 8px;
    padding: 12px 24px;
    border: 1px solid #ccc;
  }
`;

const result3 = px2any(css3, {
  unitToConvert: 'rem',
  rootValue: 37.5,
  propList: ['font-size', 'margin*'], // 只转换 font-size 和 margin 相关属性
  unitPrecision: 5
});

console.log('输入 CSS:');
console.log(css3);
console.log('\n输出 CSS (只转换 font-size 和 margin):');
console.log(result3);

// 示例 4: 忽略注释
console.log('\n=== 示例 4: 忽略注释 ===');
const css4 = `
  .normal {
    font-size: 16px; /* 会被转换 */
  }
  
  /* px-convert-ignore */
  .ignore {
    font-size: 16px; /* 不会被转换 */
  }
`;

const result4 = px2any(css4, {
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5
});

console.log('输入 CSS:');
console.log(css4);
console.log('\n输出 CSS:');
console.log(result4);

// 示例 5: 自定义转换函数
console.log('\n=== 示例 5: 自定义转换函数 ===');
const css5 = `
  .special {
    font-size: 32px;
    margin: 16px;
  }
`;

const result5 = px2any(css5, {
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5,
  customPxReplace: (px, converted, unit) => {
    // 对特定值进行特殊处理
    if (px === 32) {
      return '2rem'; // 32px 转换为 2rem
    }
    if (px === 16) {
      return '1rem'; // 16px 转换为 1rem
    }
    return converted; // 其他值正常转换
  }
});

console.log('输入 CSS:');
console.log(css5);
console.log('\n输出 CSS (自定义转换):');
console.log(result5); 