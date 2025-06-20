# postcss-px-convert

[![npm version](https://img.shields.io/npm/v/postcss-px-convert.svg)](https://www.npmjs.com/package/postcss-px-convert)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

一个支持 px 转 rem 或 vw 的 PostCSS 插件和 Node 工具，灵感来源于 [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 和 [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)。支持丰富的自定义配置，适用于 CSS、JS、Vue、React 等多种场景。

---

## 快速开始

```bash
npm install postcss-px-convert --save-dev
```

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-px-convert').plugin({
      unitToConvert: 'vw',
      viewportWidth: 375,
      rootValue: 16,
    })
  ]
}
```

---

## 类型声明

TypeScript 用户可直接获得类型提示：

```ts
import { px2any, Px2AnyOptions } from 'postcss-px-convert';
```

---

## 基本用法

### 1. 作为 PostCSS 插件

在 `postcss.config.js` 中配置：

```js
module.exports = {
  plugins: [
    require('postcss-px-convert').plugin({
      unitToConvert: 'vw', // 或 'rem'
      viewportWidth: 375,  // 设计稿宽度
      rootValue: 16,       // rem 基准值
    })
  ]
}
```

### 2. 作为 Node API

```ts
import { px2any } from 'postcss-px-convert';

const css = 'body { font-size: 32px; margin: 8px 16px; }';
const result = px2any(css, { unitToConvert: 'rem', rootValue: 16, landscapeUnit: 'vw', landscapeWidth: 568 });
console.log(result); // body { font-size: 2.00000rem; margin: 0.50000rem 1.00000rem; }
```

---

## 配置项说明

| 参数名              | 类型                    | 说明 |
|---------------------|-------------------------|------|
| unitToConvert       | 'rem' \| 'vw'           | 必填，目标单位 |
| rootValue           | number                  | rem 基准值，默认 16 |
| viewportWidth       | number                  | vw 基准宽度，默认 375 |
| unitPrecision       | number                  | 单位精度，默认 5 |
| minPixelValue       | number                  | 最小转换数值，默认 1 |
| selectorBlackList   | (string\|RegExp)[]      | 选择器黑名单，不转换 |
| propList            | string[]                | 只转换指定属性，默认 ['*'] |
| mediaQuery          | boolean                 | 是否转换媒体查询 px，默认 false |
| include             | (string\|RegExp)[]      | 只转换指定文件/文件夹 |
| exclude             | (string\|RegExp)[]      | 排除指定文件/文件夹 |
| landscape           | boolean                 | 是否横屏适配，默认 false |
| landscapeUnit       | 'rem' \| 'vw'           | 横屏时转换单位 |
| landscapeWidth      | number                  | 横屏基准宽度 |
| ignoreComment       | string                  | 忽略注释，默认 'no'，支持 /* pxremvw-ignore */ |
| customPxReplace     | Function                | 自定义 px 替换函数 |

---

## 高级用法

### 1. 黑名单选择器
```js
selectorBlackList: ['.ignore', /^\.no-vw/]
```

### 2. 属性过滤
```js
propList: ['font-size', 'margin*', '*padding']
```

### 3. 媒体查询 px 转换
```js
mediaQuery: true
```

### 4. 横屏适配
```js
landscape: true,
landscapeUnit: 'vw',
landscapeWidth: 568
```

### 5. 注释忽略
```css
/* pxremvw-ignore */
p { font-size: 20px; } /* 这一行不会被转换 */
```

### 6. include/exclude 文件过滤
> 需在调用 API 时传入文件路径参数，自行判断是否处理

### 7. 在 JS/Vue/React 中使用
- 可用正则提取样式字符串后用 `px2any` 处理
- 也可结合 babel/vite 插件实现自动化

---

## 测试

```bash
npm test
```

---

## 贡献

欢迎提 issue 或 PR！
如需本地调试：

```bash
npm install
npm test
```

---

## License

MIT 