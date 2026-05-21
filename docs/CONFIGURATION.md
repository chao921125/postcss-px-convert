# 配置说明

## 基础配置

### unitToConvert
- **类型**: `'rem' | 'vw'`
- **必填**: 是
- **默认值**: `'rem'`
- **说明**: 转换目标单位

### rootValue
- **类型**: `number`
- **默认值**: `16`
- **说明**: rem 基准值，当 unitToConvert 为 'rem' 时使用

### viewportWidth
- **类型**: `number`
- **默认值**: `375`
- **说明**: vw 基准宽度，当 unitToConvert 为 'vw' 时使用

### unitPrecision
- **类型**: `number`
- **默认值**: `5`
- **说明**: 单位精度，小数点后保留的位数

### minPixelValue
- **类型**: `number`
- **默认值**: `1`
- **说明**: 最小转换数值，小于等于此值的 px 不会被转换

## 过滤配置

### selectorBlackList
- **类型**: `(string | RegExp)[]`
- **默认值**: `[]`
- **说明**: 选择器黑名单，匹配的选择器内的 px 不会被转换

**示例：**
```js
selectorBlackList: ['.ignore', /^\.no-vw/]
```

### propList
- **类型**: `string[]`
- **默认值**: `['*']`
- **说明**: 只转换指定属性，支持通配符

**示例：**
```js
propList: ['font-size', 'margin*', '*padding']
```

### include
- **类型**: `(string | RegExp)[]`
- **默认值**: `[]`
- **说明**: 只转换指定文件/文件夹

### exclude
- **类型**: `(string | RegExp)[]`
- **默认值**: `[]`
- **说明**: 排除指定文件/文件夹

## 媒体查询配置

### mediaQuery
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否转换媒体查询中的 px

### landscape
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否启用横屏适配

### landscapeUnit
- **类型**: `'rem' | 'vw'`
- **默认值**: `'vw'`
- **说明**: 横屏时转换单位

### landscapeWidth
- **类型**: `number`
- **默认值**: `568`
- **说明**: 横屏基准宽度

## 高级配置

### ignoreComment
- **类型**: `string`
- **默认值**: `'no'`
- **说明**: 忽略注释标识，支持 `/* px-convert-ignore */`

### customPxReplace
- **类型**: `(px: number, converted: string, unit: 'rem' | 'vw') => string`
- **默认值**: `(px, converted, unit) => converted`
- **说明**: 自定义 px 替换函数

### injectFlexibleScript
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否自动生成 flexible.js 文件

### flexibleScriptPath
- **类型**: `string`
- **默认值**: `''`
- **说明**: flexible.js 输出路径，默认项目根目录

## 混合单位配置

### unitMap
- **类型**: `UnitMap`
- **默认值**: `{}`
- **说明**: 属性级别单位映射配置，允许不同 CSS 属性使用不同的转换单位

**支持的通配符模式：**
- `font-*` - 匹配所有 `font-` 开头的属性（如 `font-size`, `font-weight`）
- `*size` - 匹配所有以 `size` 结尾的属性（如 `font-size`, `icon-size`）
- `margin*` - 匹配 `margin` 及其子属性（如 `margin`, `margin-top`, `margin-bottom`）

**优先级：**
1. 内联注释 `/* px-convert:vw */` 或 `/* px-convert:rem */` - 最高优先级
2. `unitMap` 配置 - 中等优先级
3. `unitToConvert` 默认配置 - 最低优先级

**示例：**
```js
unitMap: {
  'font-size': 'rem',      // 字体用 rem
  'width': 'vw',           // 宽度用 vw
  'height': 'vw',          // 高度用 vw
  'margin*': 'rem',        // margin 相关用 rem
  'padding*': 'rem'        // padding 相关用 rem
}
```

### 内联注释控制
在 CSS 中使用特殊注释可以强制指定转换单位：

```css
.container {
  /* px-convert:vw */
  width: 375px;    /* 强制转为 vw */
  height: 100px;   /* 强制转为 vw */
}

.text {
  /* px-convert:rem */
  font-size: 32px; /* 强制转为 rem */
}
```

**注意：** 内联注释的作用范围是当前的 CSS 规则块（从 `{` 到 `}`），进入新的规则块时会自动重置。

## 配置示例

### 基础 rem 转换
```js
{
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5,
  minPixelValue: 1
}
```

### 基础 vw 转换
```js
{
  unitToConvert: 'vw',
  viewportWidth: 375,
  unitPrecision: 5,
  minPixelValue: 1
}
```

### 带过滤的转换
```js
{
  unitToConvert: 'rem',
  rootValue: 37.5,
  selectorBlackList: ['.ignore', /^\.no-rem/],
  propList: ['font-size', 'margin*', '*padding'],
  exclude: [/node_modules/]
}
```

### 横屏适配
```js
{
  unitToConvert: 'rem',
  rootValue: 37.5,
  landscape: true,
  landscapeUnit: 'vw',
  landscapeWidth: 568
}
```

### 自动生成 flexible.js
```js
{
  unitToConvert: 'rem',
  rootValue: 37.5,
  injectFlexibleScript: true,
  flexibleScriptPath: './public/flexible.js'
}
```

### vw + rem 混合转换

通过 `unitMap` 配置，不同属性可使用不同的转换单位：

```js
{
  unitToConvert: 'rem',      // 默认单位（未在 unitMap 中配置的属性使用此单位）
  rootValue: 37.5,
  viewportWidth: 375,
  unitMap: {
    'width': 'vw',           // 布局使用 vw
    'height': 'vw',
    'font-*': 'rem',         // 字体使用 rem
    'margin*': 'rem',        // 间距使用 rem
    'padding*': 'rem',
  }
}
```

**转换效果：**
```css
.container {
  width: 375px;        /* → 100vw (unitMap 指定) */
  height: 200px;       /* → 53.33vw (unitMap 指定) */
  font-size: 32px;     /* → 0.85rem (unitMap 指定) */
  margin: 20px;        /* → 0.53rem (unitMap 指定) */
  border-radius: 8px;  /* → 0.21rem (使用默认 unitToConvert: 'rem') */
}
```

**使用建议：**
- **rem** 适合字体和间距，保持相对比例
- **vw** 适合布局和定位，更好地适应屏幕宽度
- 未在 `unitMap` 中配置的属性，使用 `unitToConvert` 指定的默认单位

### 使用内联注释的混合转换
```css
/* 默认使用 rem 转换 */
.header {
  font-size: 32px;    /* 转为 rem */
  margin: 16px;       /* 转为 rem */
  
  /* px-convert:vw */
  width: 375px;       /* 强制转为 vw */
  height: 88px;       /* 强制转为 vw */
}

.content {
  /* px-convert:rem */
  font-size: 28px;    /* 强制转为 rem */
  
  width: 100%;        /* 不转换 */
  padding: 20px;      /* 转为 rem（默认） */
}
``` 
