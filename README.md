# postcss-px-convert

一个功能强大的 PostCSS 插件和 Node.js 工具，支持将 CSS 中的 px 单位转换为 rem 或 vw，适用于移动端响应式开发。

[![npm version](https://img.shields.io/npm/v/postcss-px-convert.svg)](https://www.npmjs.com/package/postcss-px-convert)
[![npm downloads](https://img.shields.io/npm/dm/postcss-px-convert.svg)](https://www.npmjs.com/package/postcss-px-convert)
[![License](https://img.shields.io/npm/l/postcss-px-convert.svg)](https://github.com/chao921125/postcss-px-convert/blob/main/LICENSE)


[English](./README.en.md) | 中文文档

## ✨ 特性

- 🚀 **高性能**: 基于 PostCSS 生态，转换速度快
- 🎯 **精确转换**: 支持精确的数值计算和单位转换
- 🔧 **灵活配置**: 丰富的配置选项，满足各种需求
- 📱 **移动端优化**: 专为移动端响应式设计优化
- 🛠️ **多场景支持**: 支持 CSS、JS、Vue、React 等多种项目
- 🔌 **插件生态**: 提供 PostCSS 插件和 Vite 插件
- 📦 **自动生成**: 支持自动生成和注入 flexible.js
- 🎨 **过滤功能**: 支持选择器、属性、文件等多种过滤方式
- 🔄 **混合单位**: 支持 vw 和 rem 混合使用，不同属性可使用不同单位

## 📦 安装

```bash
npm install postcss-px-convert --save-dev
```

或者使用 pnpm：

```bash
pnpm add postcss-px-convert --save-dev
```

或者使用 yarn：

```bash
yarn add postcss-px-convert --dev
```

## 🚀 快速开始

### 基础用法

#### rem 配置示例

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-convert': {
      unitToConvert: 'rem',
      rootValue: 37.5,      // 设计稿宽度的 1/10，375px 设计稿对应 37.5，750px 设计稿对应 75
      unitPrecision: 5,
      propList: ['*'],      // 所有属性都转换
      selectorBlackList: [], // 不需要转换的选择器
      replace: true,        // 转换后是否移除原来的 px
      mediaQuery: false,    // 媒体查询内的 px 是否转换
      minPixelValue: 1      // 小于等于 1px 的不转换
    }
  }
}
```

#### vw 配置示例

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-convert': {
      unitToConvert: 'vw',
      viewportWidth: 375,  // 设计稿宽度
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1
    }
  }
}
```

### 独立配置文件方式

```js
// .postcssrc.js 或 postcss.config.js
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ["Android >= 4.1", "iOS >= 7.1", "Chrome > 31", "ff > 31", "ie >= 8"]
    },
    'postcss-px-convert': {
      unitToConvert: 'rem',
      rootValue: 37.5,
      unitPrecision: 5,
      propList: ["*"],
      selectorBlackList: ["ignore"],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      exclude: /node_modules/i
    }
  }
}
```

### Vite 项目

```js
// .postcssrc.js
export default {
	plugins: {
		autoprefixer: {
			overrideBrowserslist: ["Android >= 4.1", "iOS >= 7.1", "Chrome > 31", "ff > 31", "ie >= 8"],
			add: true,
			grid: false,
		},
		"postcss-px-convert": {
      unitToConvert: 'rem',
			rootValue: 78,
			unitPrecision: 5,
			propList: ["*"],
			selectorBlackList: ["ignore"],
			replace: true,
			mediaQuery: false,
			minPixelValue: 0,
			exclude: /node_modules/i,
      injectFlexibleScript: true,
		},
	},
};

```

```js
// vite.config.js
import { defineConfig } from 'vite';
import postcssPxConvert from 'postcss-px-convert';
// rem 适配时，自动生成并引入 flexible.js
import { viteFlexibleInject } from 'postcss-px-convert';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
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

### vw + rem 混合配置示例

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-convert': {
      unitToConvert: 'rem',      // 默认单位
      rootValue: 37.5,           // rem 基准值
      viewportWidth: 375,        // vw 基准宽度
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1,
      // 混合单位配置
      unitMap: {
        'font-*': 'rem',         // 字体相关用 rem
        'line-height': 'rem',
        'width': 'vw',           // 布局尺寸用 vw
        'height': 'vw',
        'min-width': 'vw',
        'max-width': 'vw',
        'margin*': 'rem',        // 间距用 rem
        'padding*': 'rem',
        'border-radius': 'rem',  // 边框用 rem
        'top': 'vw',             // 定位用 vw
        'left': 'vw',
        'right': 'vw',
        'bottom': 'vw',
      },
      injectFlexibleScript: true
    }
  }
}
```

**转换效果：**
```css
/* 输入 */
.container {
  width: 375px;              /* → 100.00000vw */
  height: 100px;             /* → 26.66667vw */
  font-size: 32px;           /* → 0.85333rem */
  margin: 20px;              /* → 0.53333rem */
  padding: 16px;             /* → 0.42667rem */
  border-radius: 8px;        /* → 0.21333rem */
  top: 50px;                 /* → 13.33333vw */
}

/* 内联注释控制（更高优先级）*/
.special {
  /* px-convert:vw */
  font-size: 32px;           /* 强制转为 vw */
  
  /* px-convert:rem */
  width: 375px;              /* 强制转为 rem */
}
```

### 现代 PostCSS 配置（数组格式）

```js
// postcss.config.js
import postcssPresetEnv from "postcss-preset-env";
import postcssPxConvert from "postcss-px-convert";

export default {
  plugins: [
    postcssPresetEnv({
      autoprefixer: {
        grid: true,
      },
    }),
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 16
    })
  ]
};
```

这种配置格式与你的示例完全兼容，插件支持标准的 PostCSS 数组格式配置。

## 📖 文档

- [API 文档](./docs/api.md) - 详细的 API 参考 | [English](./docs/api.en.md)
- [配置说明](./docs/configuration.md) - 完整的配置选项说明 | [English](./docs/configuration.en.md)
- [使用示例](./docs/examples.md) - 丰富的使用示例 | [English](./docs/examples.en.md)
- [贡献指南](./docs/CONTRIBUTING.md) - 参与项目贡献 | [English](./docs/CONTRIBUTING.en.md)

## 🎯 主要功能

### 1. 单位转换

支持将 px 转换为 rem 或 vw：

```css
/* 输入 */
body {
  font-size: 32px;
  margin: 16px;
  width: 375px;
}

/* 输出 (rem) */
body {
  font-size: 0.85333rem;
  margin: 0.42667rem;
  width: 10.00000rem;
}

/* 输出 (vw) */
body {
  font-size: 8.53333vw;
  margin: 4.26667vw;
  width: 100.00000vw;
}
```

### 2. 智能过滤

支持多种过滤方式：

```js
{
  selectorBlackList: ['.ignore', /^\.ant-/],  // 选择器过滤
  propList: ['font-size', 'margin*'],         // 属性过滤
  exclude: [/node_modules/]                   // 文件过滤
}
```

### 3. 横屏适配

支持横屏模式下的不同转换规则：

```js
{
  landscape: true,
  landscapeUnit: 'vw',
  landscapeWidth: 568
}
```

### 4. 自动生成 flexible.js

```js
{
  injectFlexibleScript: true,
  flexibleScriptPath: './public/flexible.js'
}
```

## 🔧 配置选项

| 选项                     | 类型                     | 默认值     | 说明               |
|------------------------|------------------------|---------|------------------|
| `unitToConvert`        | `'rem' \| 'vw'`        | `'rem'` | 转换目标单位           |
| `rootValue`            | `number`               | `16`    | rem 基准值          |
| `viewportWidth`        | `number`               | `375`   | vw 基准宽度          |
| `unitPrecision`        | `number`               | `5`     | 单位精度             |
| `minPixelValue`        | `number`               | `1`     | 最小转换数值           |
| `selectorBlackList`    | `(string \| RegExp)[]` | `[]`    | 选择器黑名单           |
| `propList`             | `string[]`             | `['*']` | 属性过滤列表           |
| `mediaQuery`           | `boolean`              | `false` | 是否转换媒体查询         |
| `landscape`            | `boolean`              | `false` | 是否启用横屏适配         |
| `injectFlexibleScript` | `boolean`              | `false` | 是否生成 flexible.js   |
| `unitMap`              | `UnitMap`              | `{}`    | 属性单位映射（支持混合单位） |

更多配置选项请查看 [配置说明](./docs/CONFIGURATION.md)。

## 📱 移动端适配

### rem 方案

推荐设置 `rootValue` 为设计稿宽度的 1/10：

```js
// 设计稿宽度 375px
{
  unitToConvert: 'rem',
  rootValue: 37.5
}

// 设计稿宽度 750px
{
  unitToConvert: 'rem',
  rootValue: 75
}
```

#### 动态设置 rootValue

当项目中有多个设计稿尺寸（如主项目是 750px，而某些第三方组件是基于 375px 设计）时，可以动态设置 rootValue：

```js
{
  unitToConvert: 'rem',
  rootValue: ({ file }) => {
    // 如果是 vant 组件，使用 37.5 作为基准值
    if (file.indexOf('node_modules/vant') !== -1) {
      return 37.5;
    }
    // 其他使用 75 作为基准值
    return 75;
  }
}
```

### vw 方案

直接使用设计稿宽度：

```js
// 设计稿宽度 375px
{
  unitToConvert: 'vw',
  viewportWidth: 375
}
```

### vw + rem 混合方案

通过 `unitMap` 配置，可以让不同 CSS 属性使用不同的转换单位：

```js
{
  unitToConvert: 'rem',      // 默认单位
  rootValue: 37.5,
  viewportWidth: 375,
  unitMap: {
    // 字体相关使用 rem（保持可读性）
    'font-*': 'rem',
    'line-height': 'rem',
    
    // 布局尺寸使用 vw（响应式更好）
    'width': 'vw',
    'height': 'vw',
    'min-width': 'vw',
    'max-width': 'vw',
    
    // 间距使用 rem
    'margin*': 'rem',
    'padding*': 'rem',
    
    // 定位使用 vw
    'top': 'vw',
    'left': 'vw',
    'right': 'vw',
    'bottom': 'vw',
  }
}
```

**为什么需要混合使用？**
- **rem 适合字体和间距**：保持相对比例，用户体验更好
- **vw 适合布局和定位**：更好地适应不同屏幕宽度
- **灵活性**：可以根据属性特点选择最合适的单位

**配置优先级：**
1. 内联注释 `/* px-convert:vw */` - 最高优先级
2. `unitMap` 配置 - 中等优先级  
3. `unitToConvert` 默认配置 - 最低优先级

## 🔌 插件支持

### PostCSS 插件
