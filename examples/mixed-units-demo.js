/**
 * vw + rem 混合转换示例
 * 展示如何在实际项目中使用混合单位转换
 */

const { px2any } = require('../dist/index');

// ==========================================
// 示例 1: 基础混合转换 - 使用 unitMap
// ==========================================
console.log('=== 示例 1: 基础混合转换 ===');

const css1 = `
  .container {
    font-size: 32px;
    width: 375px;
    height: 100px;
    margin: 16px;
    padding: 20px;
  }
`;

const result1 = px2any(css1, {
  unitToConvert: 'rem',
  rootValue: 37.5,
  viewportWidth: 375,
  unitMap: {
    'font-size': 'rem',
    'width': 'vw',
    'height': 'vw',
    'margin*': 'rem',
    'padding*': 'rem'
  }
});

console.log('输入 CSS:');
console.log(css1);
console.log('\n输出 CSS:');
console.log(result1);

// ==========================================
// 示例 2: 使用内联注释控制单位
// ==========================================
console.log('\n=== 示例 2: 内联注释控制 ===');

const css2 = `
  .header {
    font-size: 32px;
    margin: 16px;
    
    /* px-convert:vw */
    width: 375px;
    height: 88px;
  }
  
  .content {
    /* px-convert:rem */
    font-size: 28px;
    padding: 20px;
  }
`;

const result2 = px2any(css2, {
  unitToConvert: 'rem',
  rootValue: 37.5,
  viewportWidth: 375
});

console.log('输入 CSS:');
console.log(css2);
console.log('\n输出 CSS:');
console.log(result2);

// ==========================================
// 示例 3: 移动端 H5 完整配置
// ==========================================
console.log('\n=== 示例 3: 移动端 H5 完整配置 ===');

const css3 = `
  .page {
    width: 375px;
    min-height: 667px;
  }
  
  .header {
    font-size: 32px;
    line-height: 44px;
    width: 375px;
    height: 88px;
    padding: 22px 30px;
    margin-bottom: 20px;
  }
  
  .content {
    font-size: 28px;
    width: 335px;
    padding: 20px;
    margin: 0 20px;
  }
  
  .button {
    width: 335px;
    height: 80px;
    font-size: 32px;
    margin-top: 40px;
    border: 1px solid #ccc;
  }
`;

const result3 = px2any(css3, {
  unitToConvert: 'rem',
  rootValue: 37.5,
  viewportWidth: 375,
  minPixelValue: 1,  // 1px 不转换
  unitMap: {
    // 字体用 rem
    'font-size': 'rem',
    'line-height': 'rem',
    
    // 布局用 vw
    'width': 'vw',
    'height': 'vw',
    'min-height': 'vw',
    
    // 间距用 rem
    'margin*': 'rem',
    'padding*': 'rem'
  }
});

console.log('输入 CSS:');
console.log(css3);
console.log('\n输出 CSS:');
console.log(result3);

// ==========================================
// 示例 4: 通配符模式
// ==========================================
console.log('\n=== 示例 4: 通配符模式 ===');

const css4 = `
  .box {
    font-size: 32px;
    font-weight: 400px;
    margin-top: 20px;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const result4 = px2any(css4, {
  unitToConvert: 'vw',
  viewportWidth: 375,
  rootValue: 16,
  unitMap: {
    'font-*': 'rem',      // 所有 font- 开头的属性用 rem
    'margin*': 'rem',     // 所有 margin 相关用 rem
    'padding*': 'rem'     // 所有 padding 相关用 rem
  }
});

console.log('输入 CSS:');
console.log(css4);
console.log('\n输出 CSS:');
console.log(result4);

// ==========================================
// 示例 5: 优先级演示
// ==========================================
console.log('\n=== 示例 5: 优先级演示 ===');

const css5 = `
  .container {
    /* px-convert:vw */
    font-size: 32px;    /* 内联注释优先级最高 → vw */
    width: 375px;       /* 内联注释优先级最高 → vw */
  }
  
  .box {
    font-size: 32px;    /* unitMap 配置 → rem */
    width: 375px;       /* unitMap 配置 → vw */
  }
`;

const result5 = px2any(css5, {
  unitToConvert: 'rem',
  rootValue: 37.5,
  viewportWidth: 375,
  unitMap: {
    'font-size': 'rem',
    'width': 'vw'
  }
});

console.log('输入 CSS:');
console.log(css5);
console.log('\n输出 CSS:');
console.log(result5);

// ==========================================
// 示例 6: 实际业务场景 - 电商商品卡片
// ==========================================
console.log('\n=== 示例 6: 电商商品卡片 ===');

const css6 = `
  .product-card {
    width: 345px;
    margin: 15px;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
  }
  
  .product-image {
    width: 345px;
    height: 345px;
  }
  
  .product-info {
    padding: 16px;
  }
  
  .product-title {
    font-size: 28px;
    line-height: 40px;
    height: 80px;
    margin-bottom: 12px;
  }
  
  .product-price {
    font-size: 36px;
    color: #ff4444;
  }
  
  .product-original-price {
    font-size: 24px;
    text-decoration: line-through;
    color: #999;
  }
`;

const result6 = px2any(css6, {
  unitToConvert: 'rem',
  rootValue: 37.5,
  viewportWidth: 375,
  minPixelValue: 1,
  selectorBlackList: [/^\.van-/],  // 排除 vant 组件
  unitMap: {
    // 字体用 rem
    'font-size': 'rem',
    'line-height': 'rem',
    
    // 布局用 vw
    'width': 'vw',
    'height': 'vw',
    'max-height': 'vw',
    
    // 间距用 rem
    'margin*': 'rem',
    'padding*': 'rem'
  }
});

console.log('输入 CSS:');
console.log(css6);
console.log('\n输出 CSS:');
console.log(result6);

console.log('\n=== 更多示例请查看文档 ===');
console.log('docs/MIXED_UNITS.md - vw + rem 混合转换使用指南');
