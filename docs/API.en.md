# API Documentation

## Core Functions

### px2any(css, options)

Convert px units in CSS string to rem or vw.

**Parameters:**
- `css` (string): CSS string to convert
- `options` (Px2AnyOptions): Conversion configuration options

**Returns:**
- `string`: Converted CSS string

**Example:**
```javascript
import { px2any } from 'postcss-px-convert';

const css = 'body { font-size: 32px; }';
const result = px2any(css, {
  unitToConvert: 'rem',
  rootValue: 16
});
// Result: 'body { font-size: 2.00000rem; }'
```

### px2anyValue(value, options)

Convert a single px value to rem or vw.

**Parameters:**
- `value` (string): Single value to convert (e.g., "32px")
- `options` (Px2AnyOptions): Conversion configuration options

**Returns:**
- `string`: Converted value

**Example:**
```javascript
import { px2anyValue } from 'postcss-px-convert';

const result = px2anyValue('32px', {
  unitToConvert: 'rem',
  rootValue: 16
});
// Result: '2.00000rem'
```

## PostCSS Plugin

### postcssPxConvert(options)

PostCSS plugin factory function.

**Parameters:**
- `options` (Px2AnyOptions): Plugin configuration options

**Returns:**
- `PostCSS Plugin`: PostCSS plugin instance

**Supported Formats:**

1. **Object Format** (Traditional configuration):
```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-convert': {
      unitToConvert: 'rem',
      rootValue: 37.5,
      injectFlexibleScript: true
    }
  }
}
```

2. **Array Format** (Modern configuration):
```js
// postcss.config.js
export default {
  plugins: [
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 37.5,
      injectFlexibleScript: true
    })
  ]
}
```

3. **With Other Plugins**:
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
}
```

## Vite Plugin

### viteFlexibleInject(options)

Vite plugin for automatically injecting flexible.js script.

**Parameters:**
- `options` (ViteFlexibleInjectOptions): Plugin configuration options

**Example:**
```javascript
import { defineConfig } from 'vite';
import { viteFlexibleInject } from 'postcss-px-convert';

export default defineConfig({
  plugins: [
    viteFlexibleInject({
      flexibleScriptPath: './flexible.js'
    })
  ]
});
```

## Utility Functions

### generateFlexibleScript(path?)

Generate flexible.js script file.

**Parameters:**
- `path` (string, optional): Script file path, defaults to './flexible.js'

**Example:**
```javascript
import { generateFlexibleScript } from 'postcss-px-convert';

generateFlexibleScript('./public/flexible.js');
```

### isFileIncluded(filepath, include, exclude)

Check if file is in include/exclude lists.

**Parameters:**
- `filepath` (string): File path
- `include` ((string|RegExp)[]): Include list
- `exclude` ((string|RegExp)[]): Exclude list

**Returns:**
- `boolean`: Whether included

**Example:**
```javascript
import { isFileIncluded } from 'postcss-px-convert';

const included = isFileIncluded(
  'src/styles/main.css',
  ['src/**/*.css'],
  ['src/vendor/**']
);
```

## Type Definitions

### Px2AnyOptions

```typescript
interface Px2AnyOptions {
  unitToConvert?: 'rem' | 'vw';
  rootValue?: number;
  viewportWidth?: number;
  unitPrecision?: number;
  minPixelValue?: number;
  selectorBlackList?: (string | RegExp)[];
  propList?: string[];
  mediaQuery?: boolean;
  include?: (string | RegExp)[];
  exclude?: (string | RegExp)[];
  landscape?: boolean;
  landscapeUnit?: string;
  landscapeWidth?: number;
  ignoreComment?: string;
  customPxReplace?: (px: number, converted: string, unit: string) => string;
  injectFlexibleScript?: boolean;
  flexibleScriptPath?: string;
}
```

### PostcssPxConvertOptions

```typescript
type PostcssPxConvertOptions = Px2AnyOptions | Px2AnyOptions[];
```

### ViteFlexibleInjectOptions

```typescript
interface ViteFlexibleInjectOptions {
  flexibleScriptPath?: string;
}
``` 