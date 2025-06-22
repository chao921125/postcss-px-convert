# Configuration Guide

## Basic Configuration

### unitToConvert
- **Type**: `'rem' | 'vw'`
- **Required**: Yes
- **Default**: `'rem'`
- **Description**: Target unit for conversion

### rootValue
- **Type**: `number`
- **Default**: `16`
- **Description**: Base value for rem conversion, used when unitToConvert is 'rem'

### viewportWidth
- **Type**: `number`
- **Default**: `375`
- **Description**: Base width for vw conversion, used when unitToConvert is 'vw'

### unitPrecision
- **Type**: `number`
- **Default**: `5`
- **Description**: Unit precision, number of decimal places

### minPixelValue
- **Type**: `number`
- **Default**: `1`
- **Description**: Minimum pixel value to convert, px values less than or equal to this won't be converted

## Filter Configuration

### selectorBlackList
- **Type**: `(string | RegExp)[]`
- **Default**: `[]`
- **Description**: Selector blacklist, px in matching selectors won't be converted

**Example:**
```js
selectorBlackList: ['.ignore', /^\.no-vw/]
```

### propList
- **Type**: `string[]`
- **Default**: `['*']`
- **Description**: Only convert specified properties, supports wildcards

**Example:**
```js
propList: ['font-size', 'margin*', '*padding']
```

### include
- **Type**: `(string | RegExp)[]`
- **Default**: `[]`
- **Description**: Only convert specified files/folders

### exclude
- **Type**: `(string | RegExp)[]`
- **Default**: `[]`
- **Description**: Exclude specified files/folders

## Media Query Configuration

### mediaQuery
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether to convert px in media queries

### landscape
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable landscape adaptation

### landscapeUnit
- **Type**: `'rem' | 'vw'`
- **Default**: `'vw'`
- **Description**: Unit to convert to in landscape mode

### landscapeWidth
- **Type**: `number`
- **Default**: `568`
- **Description**: Base width for landscape mode

## Advanced Configuration

### ignoreComment
- **Type**: `string`
- **Default**: `'no'`
- **Description**: Ignore comment identifier, supports `/* px-convert-ignore */`

### customPxReplace
- **Type**: `(px: number, converted: string, unit: 'rem' | 'vw') => string`
- **Default**: `(px, converted, unit) => converted`
- **Description**: Custom px replacement function

### injectFlexibleScript
- **Type**: `boolean`
- **Default**: `false`
- **Description**: Whether to auto-generate flexible.js file

### flexibleScriptPath
- **Type**: `string`
- **Default**: `''`
- **Description**: flexible.js output path, defaults to project root

## Configuration Examples

### Basic rem Conversion
```js
{
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5,
  minPixelValue: 1
}
```

### Basic vw Conversion
```js
{
  unitToConvert: 'vw',
  viewportWidth: 375,
  unitPrecision: 5,
  minPixelValue: 1
}
```

### Conversion with Filters
```js
{
  unitToConvert: 'rem',
  rootValue: 37.5,
  selectorBlackList: ['.ignore', /^\.no-rem/],
  propList: ['font-size', 'margin*', '*padding'],
  exclude: [/node_modules/]
}
```

### Landscape Adaptation
```js
{
  unitToConvert: 'rem',
  rootValue: 37.5,
  landscape: true,
  landscapeUnit: 'vw',
  landscapeWidth: 568
}
```

### Auto-generate flexible.js
```js
{
  unitToConvert: 'rem',
  rootValue: 37.5,
  injectFlexibleScript: true,
  flexibleScriptPath: './public/flexible.js'
}
``` 