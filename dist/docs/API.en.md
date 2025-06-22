# API Documentation

## Core API

### px2any(css, options)

Converts px units to rem or vw in CSS string.

**Parameters:**
- `css` (string): CSS string to convert
- `options` (Px2AnyOptions): Conversion configuration options

**Returns:**
- `string`: Converted CSS string

**Example:**
```ts
import { px2any } from 'postcss-px-convert';

const css = 'body { font-size: 32px; margin: 8px 16px; }';
const result = px2any(css, { 
  unitToConvert: 'rem', 
  rootValue: 16 
});
// Output: body { font-size: 2.00000rem; margin: 0.50000rem 1.00000rem; }
```

### px2anyPostcss(root, options)

PostCSS plugin processing function.

**Parameters:**
- `root` (PostCSS Root): PostCSS root node
- `options` (Px2AnyOptions): Conversion configuration options

## Plugin API

### postcssPxConvert(options)

PostCSS plugin factory function.

**Parameters:**
- `options` (Px2AnyOptions): Plugin configuration options

**Returns:**
- `PostCSS Plugin`: PostCSS plugin instance

**Example:**
```js
import postcssPxConvert from 'postcss-px-convert';

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

### viteFlexibleInject(options)

Vite plugin that automatically injects flexible.js into HTML.

**Parameters:**
- `options` (ViteFlexibleInjectOptions): Plugin configuration
  - `flexibleScriptPath` (string, optional): flexible.js path, default '/flexible.js'

**Returns:**
- `Vite Plugin`: Vite plugin instance

**Example:**
```js
import { viteFlexibleInject } from 'postcss-px-convert';

export default {
  plugins: [
    viteFlexibleInject({ flexibleScriptPath: '/flexible.js' })
  ]
}
```

### generateFlexibleScript(outPath?)

Generates flexible.js file.

**Parameters:**
- `outPath` (string, optional): Output path, default 'flexible.js' in project root

**Returns:**
- `boolean`: Whether generation was successful

**Example:**
```ts
import { generateFlexibleScript } from 'postcss-px-convert';

generateFlexibleScript('./public/flexible.js');
```

## Type Definitions

### Px2AnyOptions

```ts
interface Px2AnyOptions {
  unitToConvert: 'rem' | 'vw';           // Target unit for conversion
  rootValue?: number;                    // rem base value, default 16
  viewportWidth?: number;                // vw base width, default 375
  unitPrecision?: number;                // Unit precision, default 5
  minPixelValue?: number;                // Minimum pixel value to convert, default 1
  selectorBlackList?: (string | RegExp)[]; // Selector blacklist
  propList?: string[];                   // Only convert specific properties, default ['*']
  mediaQuery?: boolean;                  // Whether to convert media queries, default false
  include?: (string | RegExp)[];         // Only convert specified files/folders
  exclude?: (string | RegExp)[];         // Exclude specified files/folders
  landscape?: boolean;                   // Enable landscape adaptation, default false
  landscapeUnit?: 'rem' | 'vw';          // Landscape conversion unit
  landscapeWidth?: number;               // Landscape base width
  ignoreComment?: string;                // Ignore comment, default 'no'
  customPxReplace?: (px: number, converted: string, unit: 'rem' | 'vw') => string; // Custom conversion function
  injectFlexibleScript?: boolean;        // Auto-generate flexible.js
  flexibleScriptPath?: string;           // flexible.js output path
}
```

### ViteFlexibleInjectOptions

```ts
interface ViteFlexibleInjectOptions {
  flexibleScriptPath?: string;           // flexible.js path
}
``` 