/**
 * Vite 配置示例
 */

import { defineConfig } from 'vite';
import postcssPxConvert from '../index';
import { viteFlexibleInject } from '../index';

// 示例 1: 基础 Vite 配置
export const basicViteConfig = defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
          unitPrecision: 5,
          minPixelValue: 1
        })
      ]
    }
  }
});

// 示例 2: 带 flexible.js 的 Vite 配置
export const flexibleViteConfig = defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
          unitPrecision: 5,
          minPixelValue: 1,
          injectFlexibleScript: true,
          flexibleScriptPath: './public/flexible.js'
        })
      ]
    }
  },
  plugins: [
    viteFlexibleInject({ flexibleScriptPath: '/flexible.js' })
  ]
});

// 示例 3: React + Vite 配置
export const reactViteConfig = defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
          selectorBlackList: [/^\.ant-/], // 忽略 Ant Design 组件
          propList: ['*'],
          injectFlexibleScript: true
        })
      ]
    }
  },
  plugins: [
    viteFlexibleInject()
  ]
});

// 示例 4: Vue + Vite 配置
export const vueViteConfig = defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
          selectorBlackList: [/^\.el-/], // 忽略 Element Plus 组件
          propList: ['*'],
          injectFlexibleScript: true
        })
      ]
    }
  },
  plugins: [
    viteFlexibleInject()
  ]
});

// 示例 5: 横屏适配配置
export const landscapeViteConfig = defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
          unitPrecision: 5,
          minPixelValue: 1,
          landscape: true,
          landscapeUnit: 'vw',
          landscapeWidth: 568
        })
      ]
    }
  }
});

// 示例 6: 自定义转换函数配置
export const customViteConfig = defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
          unitPrecision: 5,
          minPixelValue: 1,
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
        })
      ]
    }
  }
});

// 示例 7: 多环境配置
export const multiEnvViteConfig = defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  
  return {
    css: {
      postcss: {
        plugins: [
          postcssPxConvert({
            unitToConvert: 'rem',
            rootValue: 37.5,
            unitPrecision: isDev ? 2 : 5, // 开发环境精度低，生产环境精度高
            minPixelValue: 1,
            selectorBlackList: isDev ? [] : [/^\.ant-/, /^\.el-/], // 生产环境忽略第三方组件
            propList: ['*'],
            injectFlexibleScript: true
          })
        ]
      }
    },
    plugins: [
      viteFlexibleInject()
    ]
  };
});

// 使用示例
console.log('=== Vite 配置示例 ===');

console.log('\n1. 基础 Vite 配置:');
console.log(JSON.stringify(basicViteConfig, null, 2));

console.log('\n2. 带 flexible.js 的 Vite 配置:');
console.log(JSON.stringify(flexibleViteConfig, null, 2));

console.log('\n3. React + Vite 配置:');
console.log(JSON.stringify(reactViteConfig, null, 2));

console.log('\n4. Vue + Vite 配置:');
console.log(JSON.stringify(vueViteConfig, null, 2));

console.log('\n5. 横屏适配配置:');
console.log(JSON.stringify(landscapeViteConfig, null, 2));

console.log('\n6. 自定义转换函数配置:');
console.log(JSON.stringify(customViteConfig, null, 2));

console.log('\n7. 多环境配置:');
console.log(JSON.stringify(multiEnvViteConfig, null, 2)); 