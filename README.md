# postcss-px-convert

[![npm version](https://img.shields.io/npm/v/postcss-px-convert.svg)](https://www.npmjs.com/package/postcss-px-convert)
[![npm downloads](https://img.shields.io/npm/dm/postcss-px-convert.svg)](https://www.npmjs.com/package/postcss-px-convert)
[![License](https://img.shields.io/npm/l/postcss-px-convert.svg)](https://github.com/chao921125/postcss-px-convert/blob/main/LICENSE)

一个功能强大的 PostCSS 插件和 Node.js 工具，支持将 CSS 中的 px 单位转换为 rem 或 vw，适用于移动端响应式开发。

## ✨ 特性

- 🚀 **高性能**: 基于 PostCSS 生态，转换速度快
- 🎯 **精确转换**: 支持精确的数值计算和单位转换
- 🔧 **灵活配置**: 丰富的配置选项，满足各种需求
- 📱 **移动端优化**: 专为移动端响应式设计优化
- 🛠️ **多场景支持**: 支持 CSS、JS、Vue、React 等多种项目
- 🔌 **插件生态**: 提供 PostCSS 插件和 Vite 插件
- 📦 **自动生成**: 支持自动生成和注入 flexible.js
- 🎨 **过滤功能**: 支持选择器、属性、文件等多种过滤方式

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

// https://postcss.org/
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

### Vite 项目

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

## 📖 文档

- [API 文档](./docs/api.md) - 详细的 API 参考
- [配置说明](./docs/configuration.md) - 完整的配置选项说明
- [使用示例](./docs/examples.md) - 丰富的使用示例

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

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `unitToConvert` | `'rem' \| 'vw'` | `'rem'` | 转换目标单位 |
| `rootValue` | `number` | `16` | rem 基准值 |
| `viewportWidth` | `number` | `375` | vw 基准宽度 |
| `unitPrecision` | `number` | `5` | 单位精度 |
| `minPixelValue` | `number` | `1` | 最小转换数值 |
| `selectorBlackList` | `(string \| RegExp)[]` | `[]` | 选择器黑名单 |
| `propList` | `string[]` | `['*']` | 属性过滤列表 |
| `mediaQuery` | `boolean` | `false` | 是否转换媒体查询 |
| `landscape` | `boolean` | `false` | 是否启用横屏适配 |
| `injectFlexibleScript` | `boolean` | `false` | 是否生成 flexible.js |

更多配置选项请查看 [配置说明](./docs/configuration.md)。

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

### vw 方案

直接使用设计稿宽度：

```js
// 设计稿宽度 375px
{
  unitToConvert: 'vw',
  viewportWidth: 375
}
```

## 🔌 插件支持

### PostCSS 插件

```js
// 对象写法
{
  plugins: {
    'postcss-px-convert': options
  }
}

// 函数写法
{
  plugins: [
    postcssPxConvert(options)
  ]
}
```

### Vite 插件

```js
import { viteFlexibleInject } from 'postcss-px-convert';

export default {
  plugins: [
    viteFlexibleInject({ flexibleScriptPath: '/flexible.js' })
  ]
}
```

## 🛠️ Node.js API

```js
const { px2any } = require('postcss-px-convert');

const css = 'body { font-size: 32px; }';
const result = px2any(css, {
  unitToConvert: 'rem',
  rootValue: 37.5
});
```

## 🧪 测试

```bash
npm test
```

运行测试用例：

```bash
npm run test:watch
```

## 📝 更新日志

### v1.0.9
- ✨ 新增项目重构，提升代码可维护性
- 📦 支持 dist 目录打包
- 📚 完善文档结构
- 🔧 优化工具方法抽取
- 🎯 增强可扩展性

### v1.0.8
- ✨ 新增 Vite 插件支持
- 🔧 优化 flexible.js 生成逻辑
- 📚 完善使用文档

### v1.0.7
- ✨ 新增自动生成 flexible.js 功能
- 🔧 修复正则表达式问题
- 📚 更新 README 文档

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- [PostCSS](https://postcss.org/)
- [Vite](https://vitejs.dev/)
- [amfe-flexible](https://github.com/amfe/lib-flexible)

---

如果这个项目对你有帮助，请给个 ⭐️ 支持一下！ 