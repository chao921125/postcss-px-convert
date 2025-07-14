# API 文档

## 核心函数

### px2any(css, options)

将 CSS 字符串中的 px 单位转换为 rem 或 vw。

**参数：**
- `css` (string): 要转换的 CSS 字符串
- `options` (Px2AnyOptions): 转换配置选项

**返回值：**
- `string`: 转换后的 CSS 字符串

**示例：**
```javascript
import { px2any } from 'postcss-px-convert';

const css = 'body { font-size: 32px; }';
const result = px2any(css, {
  unitToConvert: 'rem',
  rootValue: 16
});
// 结果: 'body { font-size: 2.00000rem; }'
```

### px2anyValue(value, options)

将单个 px 值转换为 rem 或 vw。

**参数：**
- `value` (string): 要转换的单个值（如 "32px"）
- `options` (Px2AnyOptions): 转换配置选项

**返回值：**
- `string`: 转换后的值

**示例：**
```javascript
import { px2anyValue } from 'postcss-px-convert';

const result = px2anyValue('32px', {
  unitToConvert: 'rem',
  rootValue: 16
});
// 结果: '2.00000rem'
```

## PostCSS 插件

### postcssPxConvert(options)

PostCSS 插件工厂函数。

**参数：**
- `options` (Px2AnyOptions): 插件配置选项

**返回值：**
- `PostCSS Plugin`: PostCSS 插件实例

**支持格式：**

1. **对象格式**（传统配置）：
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

2. **数组格式**（现代配置）：
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

3. **与其他插件一起使用**：
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

## Vite 插件

### viteFlexibleInject(options)

Vite 插件，用于自动注入 flexible.js 脚本。

**参数：**
- `options` (ViteFlexibleInjectOptions): 插件配置选项

**示例：**
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

## 工具函数

### generateFlexibleScript(path?)

生成 flexible.js 脚本文件。

**参数：**
- `path` (string, 可选): 脚本文件路径，默认为 './flexible.js'

**示例：**
```javascript
import { generateFlexibleScript } from 'postcss-px-convert';

generateFlexibleScript('./public/flexible.js');
```

### isFileIncluded(filepath, include, exclude)

检查文件是否在包含/排除列表中。

**参数：**
- `filepath` (string): 文件路径
- `include` ((string|RegExp)[]): 包含列表
- `exclude` ((string|RegExp)[]): 排除列表

**返回值：**
- `boolean`: 是否包含

**示例：**
```javascript
import { isFileIncluded } from 'postcss-px-convert';

const included = isFileIncluded(
  'src/styles/main.css',
  ['src/**/*.css'],
  ['src/vendor/**']
);
```

## 类型定义

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
  minFontSize?: number;  // 最小字体大小（px）
  maxFontSize?: number;  // 最大字体大小（px）
  baseWidth?: number;    // 基准宽度，默认 375
}
```

**参数说明：**

- `flexibleScriptPath` (string, 可选): flexible.js 脚本路径，默认为 '/flexible.js'
- `minFontSize` (number, 可选): 最小字体大小，防止在极小屏幕下字体过小
- `maxFontSize` (number, 可选): 最大字体大小，防止在极大屏幕下字体过大
- `baseWidth` (number, 可选): 基准宽度，用于计算 rem 单位，默认为 375

**使用示例：**

```javascript
import { defineConfig } from 'vite';
import { viteFlexibleInject } from 'postcss-px-convert';

export default defineConfig({
  plugins: [
    // 基础用法
    viteFlexibleInject(),
    
    // 带边界限制
    viteFlexibleInject({
      minFontSize: 12,  // 最小 12px
      maxFontSize: 24,  // 最大 24px
      baseWidth: 375    // 基准宽度 375px
    }),
    
    // 只有最小值限制
    viteFlexibleInject({
      minFontSize: 14,
      baseWidth: 750
    })
  ]
});
``` 
