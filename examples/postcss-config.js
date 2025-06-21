/**
 * PostCSS 配置示例
 */

// 示例 1: 基础 rem 配置
const basicRemConfig = {
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5,
  minPixelValue: 1,
  selectorBlackList: [],
  propList: ['*'],
  mediaQuery: false,
  landscape: false
};

// 示例 2: 基础 vw 配置
const basicVwConfig = {
  unitToConvert: 'vw',
  viewportWidth: 375,
  unitPrecision: 5,
  minPixelValue: 1,
  selectorBlackList: [],
  propList: ['*'],
  mediaQuery: false,
  landscape: false
};

// 示例 3: 带过滤的配置
const filteredConfig = {
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5,
  minPixelValue: 1,
  selectorBlackList: ['.ignore', /^\.ant-/, /^\.el-/], // 忽略特定选择器
  propList: ['font-size', 'margin*', '*padding', 'width', 'height'], // 只转换指定属性
  mediaQuery: false,
  landscape: false
};

// 示例 4: 横屏适配配置
const landscapeConfig = {
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5,
  minPixelValue: 1,
  selectorBlackList: [],
  propList: ['*'],
  mediaQuery: true, // 转换媒体查询中的 px
  landscape: true, // 启用横屏适配
  landscapeUnit: 'vw', // 横屏时使用 vw
  landscapeWidth: 568 // 横屏基准宽度
};

// 示例 5: 自动生成 flexible.js 配置
const flexibleConfig = {
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5,
  minPixelValue: 1,
  selectorBlackList: [],
  propList: ['*'],
  mediaQuery: false,
  landscape: false,
  injectFlexibleScript: true, // 自动生成 flexible.js
  flexibleScriptPath: './public/flexible.js' // 输出路径
};

// 示例 6: 自定义转换函数配置
const customConfig = {
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5,
  minPixelValue: 1,
  selectorBlackList: [],
  propList: ['*'],
  mediaQuery: false,
  landscape: false,
  customPxReplace: (px, converted, unit) => {
    // 对特定值进行特殊处理
    if (px === 1) {
      return '1px'; // 1px 不转换
    }
    if (px === 2) {
      return '0.5px'; // 2px 转换为 0.5px
    }
    return converted; // 其他值正常转换
  }
};

// 导出配置
module.exports = {
  basicRemConfig,
  basicVwConfig,
  filteredConfig,
  landscapeConfig,
  flexibleConfig,
  customConfig
};

// 使用示例
console.log('=== PostCSS 配置示例 ===');

console.log('\n1. 基础 rem 配置:');
console.log(JSON.stringify(basicRemConfig, null, 2));

console.log('\n2. 基础 vw 配置:');
console.log(JSON.stringify(basicVwConfig, null, 2));

console.log('\n3. 带过滤的配置:');
console.log(JSON.stringify(filteredConfig, null, 2));

console.log('\n4. 横屏适配配置:');
console.log(JSON.stringify(landscapeConfig, null, 2));

console.log('\n5. 自动生成 flexible.js 配置:');
console.log(JSON.stringify(flexibleConfig, null, 2));

console.log('\n6. 自定义转换函数配置:');
console.log(JSON.stringify(customConfig, null, 2)); 