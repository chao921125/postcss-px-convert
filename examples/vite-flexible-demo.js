// vite.config.js - 演示新的边界限制功能
import { defineConfig } from 'vite';
import { viteFlexibleInject } from 'postcss-px-convert';

export default defineConfig({
  plugins: [
    // 基础用法 - 无边界限制
    viteFlexibleInject(),
    
    // 带边界限制的用法
    viteFlexibleInject({
      minFontSize: 12,  // 最小字体大小 12px
      maxFontSize: 24,  // 最大字体大小 24px
      baseWidth: 375    // 基准宽度 375px
    }),
    
    // 只有最小值限制
    viteFlexibleInject({
      minFontSize: 14,
      baseWidth: 750
    }),
    
    // 只有最大值限制
    viteFlexibleInject({
      maxFontSize: 20,
      baseWidth: 375
    }),
    
    // 自定义路径 + 边界限制
    viteFlexibleInject({
      flexibleScriptPath: '/custom/flexible.js',
      minFontSize: 16,
      maxFontSize: 28,
      baseWidth: 750
    })
  ]
});

// 生成的脚本示例：
/*
(function flexible() {
  var docEl = document.documentElement;
  var minFontSize = 12;
  var maxFontSize = 24;
  var baseWidth = 375;
  
  function setRemUnit() {
    var rem = docEl.clientWidth / (baseWidth / 10);
    // 添加边界限制
    if (minFontSize !== null && rem < minFontSize) {
      rem = minFontSize;
    }
    if (maxFontSize !== null && rem > maxFontSize) {
      rem = maxFontSize;
    }
    docEl.style.fontSize = rem + 'px';
  }
  setRemUnit();
  window.addEventListener('resize', setRemUnit);
})();
*/ 