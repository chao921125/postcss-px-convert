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
