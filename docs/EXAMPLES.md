# 使用示例

## PostCSS 插件使用

### 基础用法

#### 对象写法
```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-convert': {
      unitToConvert: 'rem',
      rootValue: 37.5,
      unitPrecision: 5,
      minPixelValue: 1
    }
  }
}
```

#### 函数写法
```js
// postcss.config.js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  plugins: [
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 37.5,
      unitPrecision: 5,
      minPixelValue: 1
    })
  ]
}
```

### Vite 项目配置

```js
// vite.config.js
import { defineConfig } from 'vite';
import postcssPxConvert from 'postcss-px-convert';
import { viteFlexibleInject } from 'postcss-px-convert';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
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
```

### Webpack 项目配置

```js
// webpack.config.js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssPxConvert({
                    unitToConvert: 'rem',
                    rootValue: 37.5
                  })
                ]
              }
            }
          }
        ]
      }
    ]
  }
};
```

### Vue CLI 项目配置

```js
// vue.config.js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcssPxConvert({
            unitToConvert: 'rem',
            rootValue: 37.5
          })
        ]
      }
    }
  }
};
```

## Node.js API 使用

### 直接转换 CSS 字符串

```js
const { px2any } = require('postcss-px-convert');

const css = `
  body {
    font-size: 32px;
    margin: 8px 16px;
    padding: 4px;
  }
  
  .container {
    width: 375px;
    height: 667px;
  }
`;

const result = px2any(css, {
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5
});

console.log(result);
// 输出:
// body {
//   font-size: 0.85333rem;
//   margin: 0.21333rem 0.42667rem;
//   padding: 0.10667rem;
// }
// 
// .container {
//   width: 10.00000rem;
//   height: 17.78667rem;
// }
```

### 批量处理文件

```js
const fs = require('fs');
const path = require('path');
const { px2any } = require('postcss-px-convert');

function processCssFiles(dir, options) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processCssFiles(filePath, options);
    } else if (file.endsWith('.css')) {
      const css = fs.readFileSync(filePath, 'utf-8');
      const result = px2any(css, options);
      fs.writeFileSync(filePath, result);
      console.log(`处理完成: ${filePath}`);
    }
  });
}

processCssFiles('./src/styles', {
  unitToConvert: 'rem',
  rootValue: 37.5
});
```

## 高级用法

### 自定义转换函数

```js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  plugins: [
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 37.5,
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
};
```

### 选择器过滤

```js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  plugins: [
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 37.5,
      selectorBlackList: [
        '.ignore',           // 忽略 .ignore 类
        /^\.no-rem/,         // 忽略以 .no-rem 开头的类
        /^\.ant-/            // 忽略 Ant Design 组件
      ]
    })
  ]
};
```

### 属性过滤

```js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  plugins: [
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 37.5,
      propList: [
        'font-size',         // 只转换 font-size
        'margin*',           // 转换所有 margin 相关属性
        '*padding',          // 转换所有 padding 相关属性
        'width',             // 转换 width
        'height'             // 转换 height
      ]
    })
  ]
};
```

### 横屏适配

```js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  plugins: [
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 37.5,
      landscape: true,           // 启用横屏适配
      landscapeUnit: 'vw',       // 横屏时使用 vw
      landscapeWidth: 568        // 横屏基准宽度
    })
  ]
};
```

### 忽略注释

```css
/* 在 CSS 中使用注释忽略转换 */
body {
  font-size: 32px; /* 会被转换 */
}

/* px-convert-ignore */
.ignore-section {
  font-size: 32px; /* 不会被转换 */
}
```

## 完整项目示例

### React + Vite 项目

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssPxConvert from 'postcss-px-convert';
import { viteFlexibleInject } from 'postcss-px-convert';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
          selectorBlackList: [/^\.ant-/],
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
```

```jsx
// App.jsx
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Hello World</h1>
      <p>这是一个响应式应用</p>
    </div>
  );
}

export default App;
```

```css
/* App.css */
.app {
  padding: 16px;
  max-width: 375px;
  margin: 0 auto;
}

.app h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

.app p {
  font-size: 16px;
  line-height: 1.5;
}
```

### Vue 3 + Vite 项目

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postcssPxConvert from 'postcss-px-convert';
import { viteFlexibleInject } from 'postcss-px-convert';

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
          selectorBlackList: [/^\.el-/],
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
```

```vue
<!-- App.vue -->
<template>
  <div class="app">
    <h1>Hello Vue</h1>
    <p>这是一个响应式应用</p>
  </div>
</template>

<style scoped>
.app {
  padding: 16px;
  max-width: 375px;
  margin: 0 auto;
}

.app h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

.app p {
  font-size: 16px;
  line-height: 1.5;
}
</style>
``` 
