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

## Mixed Unit Configuration

### unitMap
- **Type**: `UnitMap`
- **Default**: `{}`
- **Description**: Property-level unit mapping configuration, allows different CSS properties to use different conversion units

**Supported wildcard patterns:**
- `font-*` - Matches all properties starting with `font-` (e.g., `font-size`, `font-weight`)
- `*size` - Matches all properties ending with `size` (e.g., `font-size`, `icon-size`)
- `margin*` - Matches `margin` and its sub-properties (e.g., `margin`, `margin-top`, `margin-bottom`)

**Priority (from high to low):**
1. Inline comment `/* px-convert:vw */` or `/* px-convert:rem */` - Highest priority
2. `unitMap` configuration - Medium priority
3. `unitToConvert` default configuration - Lowest priority

**Example:**
```js
unitMap: {
  'font-size': 'rem',      // Font uses rem
  'width': 'vw',           // Width uses vw
  'height': 'vw',          // Height uses vw
  'margin*': 'rem',        // Margin uses rem
  'padding*': 'rem'        // Padding uses rem
}
```

### Inline Comment Control
Use special comments in CSS to force specify conversion unit:

```css
.container {
  /* px-convert:vw */
  width: 375px;    /* Force convert to vw */
  height: 100px;   /* Force convert to vw */
}

.text {
  /* px-convert:rem */
  font-size: 32px; /* Force convert to rem */
}
```

**Note:** Inline comment scope is the current CSS rule block (from `{` to `}`), automatically resets when entering a new rule block.

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

### vw + rem Mixed Conversion

Using `unitMap` configuration, different CSS properties can use different conversion units:

```js
{
  unitToConvert: 'rem',      // Default unit (for properties not in unitMap)
  rootValue: 37.5,
  viewportWidth: 375,
  unitMap: {
    'width': 'vw',           // Layout uses vw
    'height': 'vw',
    'font-*': 'rem',         // Font uses rem
    'margin*': 'rem',        // Spacing uses rem
    'padding*': 'rem',
  }
}
```

**Conversion result:**
```css
.container {
  width: 375px;        /* → 100vw (specified by unitMap) */
  height: 200px;       /* → 53.33vw (specified by unitMap) */
  font-size: 32px;     /* → 0.85rem (specified by unitMap) */
  margin: 20px;        /* → 0.53rem (specified by unitMap) */
  border-radius: 8px;  /* → 0.21rem (uses default unitToConvert: 'rem') */
}
```

**Recommendations:**
- **rem** is suitable for fonts and spacing, maintaining relative proportions
- **vw** is suitable for layouts and positioning, better adapting to screen width
- Properties not configured in `unitMap` will use the default unit specified by `unitToConvert` 