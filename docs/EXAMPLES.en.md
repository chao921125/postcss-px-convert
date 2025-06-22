# Usage Examples

## PostCSS Plugin Usage

### Basic Usage

#### Object Syntax
```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-convert': {
      unitToConvert: 'rem',
      rootValue: 37.5,
      unitPrecision: 5,
      minPixelValue: 1
    }
  }
}
```

#### Function Syntax
```js
// postcss.config.js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  plugins: [
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 37.5,
      unitPrecision: 5,
      minPixelValue: 1
    })
  ]
}
```

### Vite Project Configuration

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
          injectFlexibleScript: true,
          flexibleScriptPath: './public/flexible.js'
        })
      ]
    }
  },
  plugins: [
    viteFlexibleInject({ flexibleScriptPath: '/flexible.js' })
  ]
});
```

### Webpack Project Configuration

```js
// webpack.config.js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  postcssPxConvert({
                    unitToConvert: 'rem',
                    rootValue: 37.5
                  })
                ]
              }
            }
          }
        ]
      }
    ]
  }
};
```

### Vue CLI Project Configuration

```js
// vue.config.js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcssPxConvert({
            unitToConvert: 'rem',
            rootValue: 37.5
          })
        ]
      }
    }
  }
};
```

## Node.js API Usage

### Direct CSS String Conversion

```js
const { px2any } = require('postcss-px-convert');

const css = `
  body {
    font-size: 32px;
    margin: 8px 16px;
    padding: 4px;
  }
  
  .container {
    width: 375px;
    height: 667px;
  }
`;

const result = px2any(css, {
  unitToConvert: 'rem',
  rootValue: 37.5,
  unitPrecision: 5
});

console.log(result);
// Output:
// body {
//   font-size: 0.85333rem;
//   margin: 0.21333rem 0.42667rem;
//   padding: 0.10667rem;
// }
// 
// .container {
//   width: 10.00000rem;
//   height: 17.78667rem;
// }
```

### Batch File Processing

```js
const fs = require('fs');
const path = require('path');
const { px2any } = require('postcss-px-convert');

function processCssFiles(dir, options) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processCssFiles(filePath, options);
    } else if (file.endsWith('.css')) {
      const css = fs.readFileSync(filePath, 'utf-8');
      const result = px2any(css, options);
      fs.writeFileSync(filePath, result);
      console.log(`Processed: ${filePath}`);
    }
  });
}

processCssFiles('./src/styles', {
  unitToConvert: 'rem',
  rootValue: 37.5
});
```

## Advanced Usage

### Custom Conversion Function

```js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  plugins: [
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 37.5,
      customPxReplace: (px, converted, unit) => {
        // Special handling for specific values
        if (px === 1) {
          return '1px'; // Don't convert 1px
        }
        if (px === 2) {
          return '0.5px'; // Convert 2px to 0.5px
        }
        return converted; // Normal conversion for other values
      }
    })
  ]
};
```

### Selector Filtering

```js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  plugins: [
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 37.5,
      selectorBlackList: [
        '.ignore',           // Ignore .ignore class
        /^\.no-rem/,         // Ignore classes starting with .no-rem
        /^\.ant-/            // Ignore Ant Design components
      ]
    })
  ]
};
```

### Property Filtering

```js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  plugins: [
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 37.5,
      propList: [
        'font-size',         // Only convert font-size
        'margin*',           // Convert all margin-related properties
        '*padding',          // Convert all padding-related properties
        'width',             // Convert width
        'height'             // Convert height
      ]
    })
  ]
};
```

### Landscape Adaptation

```js
const postcssPxConvert = require('postcss-px-convert');

module.exports = {
  plugins: [
    postcssPxConvert({
      unitToConvert: 'rem',
      rootValue: 37.5,
      landscape: true,           // Enable landscape adaptation
      landscapeUnit: 'vw',       // Use vw for landscape
      landscapeWidth: 568        // Base width for landscape
    })
  ]
};
```

### Ignore Comments

```css
/* Use comments to ignore conversion in CSS */
body {
  font-size: 32px; /* Will be converted */
}

/* px-convert-ignore */
.ignore-section {
  font-size: 32px; /* Won't be converted */
}
```

## Complete Project Examples

### React + Vite Project

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssPxConvert from 'postcss-px-convert';
import { viteFlexibleInject } from 'postcss-px-convert';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
          selectorBlackList: [/^\.ant-/],
          propList: ['*'],
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

```jsx
// App.jsx
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Hello World</h1>
      <p>This is a responsive application</p>
    </div>
  );
}

export default App;
```

```css
/* App.css */
.app {
  padding: 16px;
  max-width: 375px;
  margin: 0 auto;
}

.app h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

.app p {
  font-size: 16px;
  line-height: 1.5;
}
```

### Vue 3 + Vite Project

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postcssPxConvert from 'postcss-px-convert';
import { viteFlexibleInject } from 'postcss-px-convert';

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        postcssPxConvert({
          unitToConvert: 'rem',
          rootValue: 37.5,
          selectorBlackList: [/^\.el-/],
          propList: ['*'],
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

```vue
<!-- App.vue -->
<template>
  <div class="app">
    <h1>Hello Vue</h1>
    <p>This is a responsive application</p>
  </div>
</template>

<style scoped>
.app {
  padding: 16px;
  max-width: 375px;
  margin: 0 auto;
}

.app h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

.app p {
  font-size: 16px;
  line-height: 1.5;
}
</style>
```