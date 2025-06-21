# API 文档

## 核心 API

### px2any(css, options)

将 CSS 字符串中的 px 转换为 rem 或 vw。

**参数：**
- `css` (string): 要转换的 CSS 字符串
- `options` (Px2AnyOptions): 转换配置选项

**返回值：**
- `string`: 转换后的 CSS 字符串

**示例：**
```ts
import { px2any } from 'postcss-px-convert';

const css = 'body { font-size: 32px; margin: 8px 16px; }';
const result = px2any(css, { 
  unitToConvert: 'rem', 
  rootValue: 16 
});
// 输出: body { font-size: 2.00000rem; margin: 0.50000rem 1.00000rem; }
```

### px2anyPostcss(root, options)

PostCSS 插件处理函数。

**参数：**
- `root` (PostCSS Root): PostCSS 根节点
- `options` (Px2AnyOptions): 转换配置选项

## 插件 API

### postcssPxConvert(options)

PostCSS 插件工厂函数。

**参数：**
- `options` (Px2AnyOptions): 插件配置选项

**返回值：**
- `PostCSS Plugin`: PostCSS 插件实例

**示例：**
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

Vite 插件，用于自动注入 flexible.js 到 HTML。

**参数：**
- `options` (ViteFlexibleInjectOptions): 插件配置
  - `flexibleScriptPath` (string, 可选): flexible.js 路径，默认 '/flexible.js'

**返回值：**
- `Vite Plugin`: Vite 插件实例

**示例：**
```js
import { viteFlexibleInject } from 'postcss-px-convert';

export default {
  plugins: [
    viteFlexibleInject({ flexibleScriptPath: '/flexible.js' })
  ]
}
```

### generateFlexibleScript(outPath?)

生成 flexible.js 文件。

**参数：**
- `outPath` (string, 可选): 输出路径，默认项目根目录下的 'flexible.js'

**返回值：**
- `boolean`: 是否生成成功

**示例：**
```ts
import { generateFlexibleScript } from 'postcss-px-convert';

generateFlexibleScript('./public/flexible.js');
```

## 类型定义

### Px2AnyOptions

```ts
interface Px2AnyOptions {
  unitToConvert: 'rem' | 'vw';           // 转换目标单位
  rootValue?: number;                    // rem 基准值，默认 16
  viewportWidth?: number;                // vw 基准宽度，默认 375
  unitPrecision?: number;                // 单位精度，默认 5
  minPixelValue?: number;                // 最小转换数值，默认 1
  selectorBlackList?: (string | RegExp)[]; // 选择器黑名单
  propList?: string[];                   // 只转换指定属性，默认 ['*']
  mediaQuery?: boolean;                  // 是否转换媒体查询 px，默认 false
  include?: (string | RegExp)[];         // 只转换指定文件/文件夹
  exclude?: (string | RegExp)[];         // 排除指定文件/文件夹
  landscape?: boolean;                   // 是否横屏适配，默认 false
  landscapeUnit?: 'rem' | 'vw';          // 横屏时转换单位
  landscapeWidth?: number;               // 横屏基准宽度
  ignoreComment?: string;                // 忽略注释，默认 'no'
  customPxReplace?: (px: number, converted: string, unit: 'rem' | 'vw') => string; // 自定义转换函数
  injectFlexibleScript?: boolean;        // 是否自动生成 flexible.js
  flexibleScriptPath?: string;           // flexible.js 输出路径
}
```

### ViteFlexibleInjectOptions

```ts
interface ViteFlexibleInjectOptions {
  flexibleScriptPath?: string;           // flexible.js 路径
}
``` 