# postcss-px-convert

[![npm version](https://img.shields.io/npm/v/postcss-px-convert.svg)](https://www.npmjs.com/package/postcss-px-convert)
[![npm downloads](https://img.shields.io/npm/dm/postcss-px-convert.svg)](https://www.npmjs.com/package/postcss-px-convert)
[![License](https://img.shields.io/npm/l/postcss-px-convert.svg)](https://github.com/chao921125/postcss-px-convert/blob/main/LICENSE)

A powerful PostCSS plugin and Node.js tool that converts px units to rem or vw in CSS, suitable for responsive mobile development.

English | [中文文档](./README.md)

## ✨ Features

- 🚀 **High Performance**: Based on the PostCSS ecosystem, fast conversion
- 🎯 **Precise Conversion**: Supports accurate value calculation and unit conversion
- 🔧 **Flexible Configuration**: Rich configuration options for various needs
- 📱 **Mobile Optimization**: Optimized for responsive mobile design
- 🛠️ **Multi-scenario Support**: Compatible with CSS, JS, Vue, React and more
- 🔌 **Plugin Ecosystem**: Provides PostCSS plugin and Vite plugin
- 📦 **Auto Generation**: Supports automatic generation and injection of flexible.js
- 🎨 **Filtering**: Supports selector, property, and file-based filtering

## 📦 Installation

```bash
npm install postcss-px-convert --save-dev
```

Or with pnpm:

```bash
pnpm add postcss-px-convert --save-dev
```

Or with yarn:

```bash
yarn add postcss-px-convert --dev
```

## 🚀 Quick Start

### Basic Usage

#### rem Configuration Example

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-convert': {
      unitToConvert: 'rem',
      rootValue: 37.5,      // 1/10 of design width, 37.5 for 375px designs, 75 for 750px designs
      unitPrecision: 5,
      propList: ['*'],      // Convert all properties
      selectorBlackList: [], // Selectors to ignore
      replace: true,        // Replace original px after conversion
      mediaQuery: false,    // Convert px in media queries
      minPixelValue: 1      // Values <= 1px won't be converted
    }
  }
}
```

#### vw Configuration Example

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-convert': {
      unitToConvert: 'vw',
      viewportWidth: 375,  // Design width
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1
    }
  }
}
```

### Standalone Configuration File

```js
// .postcssrc.js or postcss.config.js
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ["Android >= 4.1", "iOS >= 7.1", "Chrome > 31", "ff > 31", "ie >= 8"]
    },
    'postcss-px-convert': {
      unitToConvert: 'rem',
      rootValue: 37.5,
      unitPrecision: 5,
      propList: ["*"],
      selectorBlackList: ["ignore"],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      exclude: /node_modules/i
    }
  }
}
```

### Vite Project

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

### Modern PostCSS Configuration (Array Format)

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
};
```

This configuration format is fully compatible with your example. The plugin supports standard PostCSS array format configuration.

## 📖 Documentation

- [API Documentation](./docs/api.en.md) - Detailed API reference | [中文](./docs/api.md)
- [Configuration Guide](./docs/configuration.en.md) - Complete configuration options | [中文](./docs/configuration.md)
- [Usage Examples](./docs/examples.en.md) - Rich examples | [中文](./docs/examples.md)
- [Contributing Guide](./docs/CONTRIBUTING.en.md) - How to contribute | [中文](./docs/CONTRIBUTING.md)

## 🎯 Main Features

### 1. Unit Conversion

Convert px to rem or vw:

```css
/* Input */
body {
  font-size: 32px;
  margin: 16px;
  width: 375px;
}

/* Output (rem) */
body {
  font-size: 0.85333rem;
  margin: 0.42667rem;
  width: 10.00000rem;
}

/* Output (vw) */
body {
  font-size: 8.53333vw;
  margin: 4.26667vw;
  width: 100.00000vw;
}
```

### 2. Smart Filtering

Support multiple filtering methods:

```js
{
  selectorBlackList: ['.ignore', /^\.ant-/],  // Selector filtering
  propList: ['font-size', 'margin*'],         // Property filtering
  exclude: [/node_modules/]                   // File filtering
}
```

### 3. Landscape Adaptation

Support different conversion rules for landscape mode:

```js
{
  landscape: true,
  landscapeUnit: 'vw',
  landscapeWidth: 568
}
```

### 4. Auto-generate flexible.js

```js
{
  injectFlexibleScript: true,
  flexibleScriptPath: './public/flexible.js'
}
```

## 🔧 Configuration Options

| Option                  | Type                    | Default   | Description           |
|------------------------|-------------------------|-----------|-----------------------|
| `unitToConvert`        | `'rem' \| 'vw'`        | `'rem'`   | Target unit           |
| `rootValue`            | `number`               | `16`      | rem base value        |
| `viewportWidth`        | `number`               | `375`     | vw base width         |
| `unitPrecision`        | `number`               | `5`       | Unit precision        |
| `minPixelValue`        | `number`               | `1`       | Min value to convert  |
| `selectorBlackList`    | `(string \| RegExp)[]` | `[]`      | Selector blacklist    |
| `propList`             | `string[]`             | `['*']`   | Property filter list  |
| `mediaQuery`           | `boolean`              | `false`   | Convert media queries |
| `landscape`            | `boolean`              | `false`   | Landscape adaptation  |
| `injectFlexibleScript` | `boolean`              | `false`   | Generate flexible.js  |

For more configuration options, see the [Configuration Guide](./docs/configuration.en.md).

## 📱 Mobile Adaptation

### rem Approach

Recommended to set `rootValue` to 1/10 of the design draft width:

```js
// Design width 375px
{
  unitToConvert: 'rem',
  rootValue: 37.5
}

// Design width 750px
{
  unitToConvert: 'rem',
  rootValue: 75
}
```

#### Dynamic rootValue Setting

When a project has multiple design widths (e.g., main project is based on 750px while some third-party components are based on 375px), you can set rootValue dynamically:

```js
{
  unitToConvert: 'rem',
  rootValue: ({ file }) => {
    // Use 37.5 as base for Vant components
    if (file.indexOf('node_modules/vant') !== -1) {
      return 37.5;
    }
    // Use 75 as base for other files
    return 75;
  }
}
```

### vw Approach

Use the design draft width directly:

```js
// Design width 375px
{
  unitToConvert: 'vw',
  viewportWidth: 375
}
```

## 🔌 Plugin Support

### PostCSS Plugin

```js
// Object syntax
{
  plugins: {
    'postcss-px-convert': options
  }
}

// Function syntax
{
  plugins: [
    postcssPxConvert(options)
  ]
}
```

### Framework-specific Configurations

#### Vue CLI Project

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-convert')({
            unitToConvert: 'rem',
            rootValue: 37.5
          })
        ]
      }
    }
  }
};
```

#### Next.js Project

```js
// next.config.js
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [{
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              require('postcss-px-convert')({
                unitToConvert: 'vw',
                viewportWidth: 375
              })
            ]
          }
        }
      }]
    });
    return config;
  }
});
```

#### Webpack Project

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('postcss-px-convert')({
                  unitToConvert: 'rem',
                  rootValue: ({ file }) => {
                    // Dynamically set rootValue
                    return file.indexOf('node_modules/vant') !== -1 ? 37.5 : 75;
                  }
                })
              ]
            }
          }
        }
      ]
    }]
  }
};
```

### Vite Plugin

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

## 🧪 Testing

```bash
npm test
```

Run test cases:

```bash
npm run test:watch
```

## 🤝 Contributing

Issues and Pull Requests are welcome! Please see the [Contributing Guide](./docs/CONTRIBUTING.en.md) for details.

## 📄 License

MIT License - See the [LICENSE](LICENSE) file for details.

## 🔗 Related Links

- [PostCSS](https://postcss.org/)
- [Vite](https://vitejs.dev/)
- [amfe-flexible](https://github.com/amfe/lib-flexible)

---

If this project helps you, please give it a ⭐️! 