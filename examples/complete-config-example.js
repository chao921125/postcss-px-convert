/**
 * postcss-px-convert 完整配置示例
 * 
 * 特点：
 * 1. 使用通配符批量配置
 * 2. 只有 unitMap 中的属性才会转换
 * 3. 未配置的属性保持原始 px 单位
 */

import postcssPxConvert from 'postcss-px-convert';

export default {
  plugins: [
    postcssPxConvert({
      // ========== 基础配置 ==========
      unitToConvert: 'rem',      // 默认转换单位
      rootValue: 37.5,           // rem 基准值：37.5px = 1rem
      viewportWidth: 375,        // vw 基准宽度：375px = 100vw
      unitPrecision: 5,          // 转换精度（小数位数）
      minPixelValue: 1,          // 小于此值的 px 不转换
      propList: ['*'],           // 处理所有 CSS 属性
      
      // ========== 混合单位配置（核心）==========
      // 只有在此配置的属性才会转换，未配置的保持 px 不变
      unitMap: {
        // ===== 字体相关（使用 rem）=====
        // 便于用户调整系统字体大小时自动适配
        'font-*': 'rem',         // 匹配: font-size, font-weight, font-style, font-family 等
        'line-height': 'rem',    // 行高
        'letter-spacing': 'rem', // 字间距
        'word-spacing': 'rem',   // 词间距
        
        // ===== 布局尺寸（使用 vw）=====
        // 精确响应屏幕宽度变化
        'width': 'vw',           // 宽度
        'height': 'vw',          // 高度
        'min-width': 'vw',       // 最小宽度
        'max-width': 'vw',       // 最大宽度
        'min-height': 'vw',      // 最小高度
        'max-height': 'vw',      // 最大高度
        
        // ===== 定位（使用 vw）=====
        // 随屏幕宽度响应
        'top': 'vw',             // 上定位
        'left': 'vw',            // 左定位
        'right': 'vw',           // 右定位
        'bottom': 'vw',          // 下定位
        
        // ===== 间距（使用 rem）=====
        // 保持视觉比例一致性
        'margin*': 'rem',        // 匹配: margin, margin-top, margin-bottom, margin-left, margin-right
        'padding*': 'rem',       // 匹配: padding, padding-top, padding-bottom, padding-left, padding-right
        'gap': 'rem',            // Flex/Grid 间距
        'row-gap': 'rem',        // 行间距
        'column-gap': 'rem',     // 列间距
        
        // ===== 边框（使用 rem）=====
        // 保持边框比例
        'border-radius': 'rem',  // 圆角
        'border-width': 'rem',   // 边框宽度
        'outline-width': 'rem',  // 轮廓宽度
        
        // ===== 特殊尺寸（使用 vw）=====
        // 自定义属性
        '*size': 'vw',           // 匹配所有以 size 结尾的属性（如 icon-size, box-size, card-size）
      },
      
      // ========== 过滤配置 ==========
      selectorBlackList: [],     // 选择器黑名单（不转换的选择器）
      exclude: [/node_modules/], // 排除的文件/目录
      
      // ========== 其他配置 ==========
      mediaQuery: false,         // 是否转换媒体查询中的 px
      replace: true,             // 是否替换原值（false 会添加备用值）
      landscape: false,          // 是否启用横屏适配
      
      // ========== flexible.js 配置 ==========
      injectFlexibleScript: true,           // 自动生成 flexible.js
      flexibleScriptPath: '',               // 输出路径（默认项目根目录）
    })
  ]
};

/**
 * 使用示例：
 * 
 * 1. 在 .postcssrc.js 中使用：
 *    export default {
 *      plugins: [
 *        // ... 上述配置
 *      ]
 *    }
 * 
 * 2. 在 vite.config.js 中使用：
 *    export default defineConfig({
 *      css: {
 *        postcss: {
 *          plugins: [postcssPxConvert({ ... })]
 *        }
 *      }
 *    })
 * 
 * 3. 转换效果：
 *    
 *    原始 CSS:
 *    .container {
 *      width: 375px;              // → 100.00000vw (在 unitMap 中)
 *      font-size: 32px;           // → 0.85333rem (在 unitMap 中)
 *      margin: 20px;              // → 0.53333rem (在 unitMap 中)
 *      background: #fff;          // 保持 #fff (不在 unitMap 中)
 *      display: flex;             // 保持 flex (不在 unitMap 中)
 *      opacity: 0.8;              // 保持 0.8 (不在 unitMap 中)
 *      z-index: 100;              // 保持 100 (不在 unitMap 中)
 *    }
 * 
 * 4. 通配符说明：
 *    - 'font-*'    → 匹配 font-size, font-weight, font-style 等
 *    - '*size'     → 匹配 icon-size, box-size, card-size 等
 *    - 'margin*'   → 匹配 margin, margin-top, margin-bottom 等
 *    - 'padding*'  → 匹配 padding, padding-top, padding-bottom 等
 */
