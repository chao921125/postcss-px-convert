# Font Load Checker

一个用于检测字体是否已加载的工具库，支持原生JavaScript、Vue和React。

## 特性

- 检测指定字体是否已加载
- 获取所有已加载字体的列表
- 支持Vue 3集成（组合式API）
- 支持React集成（Hooks）
- 支持TypeScript
- 支持UMD/ESM/CommonJS模块格式

## 安装

```bash
npm install font-load-checker
# 或
yarn add font-load-checker
# 或
pnpm add font-load-checker
```

## 使用方法

### 原生JavaScript

```js
import FontChecker from 'font-load-checker';

// 创建检查器实例
const checker = new FontChecker();

// 检查单个字体
checker.check('Arial').then(result => {
  console.log(`Arial 字体已加载: ${result.loaded}`);
});

// 检查多个字体
checker.check(['Arial', 'Helvetica', 'Times New Roman']).then(results => {
  results.forEach(font => {
    console.log(`${font.name} 字体已加载: ${font.loaded}`);
  });
});

// 检查所有已加载的字体
checker.check().then(allFonts => {
  console.log('所有已加载的字体:', allFonts);
});
```

### Vue 3

#### 使用组合式API

```vue
<template>
  <div>
    <div v-if="loading">检查中...</div>
    <div v-else>
      <div v-for="(font, index) in results" :key="index">
        {{ font.name }}: {{ font.loaded ? '已加载' : '未加载' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFontCheck, createFontChecker } from 'font-load-checker';

// 使用Hook检查指定字体
const { results, loading, error } = useFontCheck(['Arial', 'Helvetica', 'NonExistentFont']);

// 或者使用工厂函数创建检查器实例
const checker = createFontChecker({ timeout: 5000 });
const checkCustomFonts = async () => {
  const customResults = await checker.check(['Arial', 'Times New Roman']);
  console.log('自定义字体检查结果:', customResults);
};
</script>
```

### React

#### 使用Hooks

```jsx
import { useFontCheck, createFontChecker } from 'font-load-checker';

function FontDemo() {
  const { results, loading, error } = useFontCheck(['Arial', 'Helvetica', 'NonExistentFont']);
  
  if (loading) return <div>检查中...</div>;
  if (error) return <div>发生错误: {error.message}</div>;
  
  return (
    <div>
      {Array.isArray(results) && results.map((font, index) => (
        <div key={index}>
          {font.name}: {font.loaded ? '已加载' : '未加载'}
        </div>
      ))}
    </div>
  );
}

// 或者使用工厂函数创建检查器实例
function CustomFontCheck() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const checkFonts = async () => {
    setLoading(true);
    const checker = createFontChecker({ timeout: 3000 });
    try {
      const fontResults = await checker.check(['Arial', 'Helvetica']);
      setResults(Array.isArray(fontResults) ? fontResults : [fontResults]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button onClick={checkFonts}>检查字体</button>
      {loading ? <div>检查中...</div> : (
        <div>
          {results.map((font, index) => (
            <div key={index}>
              {font.name}: {font.loaded ? '已加载' : '未加载'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## 浏览器支持

该库使用了现代浏览器API，包括：

- FontFace API
- document.fonts
- Promise

支持所有现代浏览器，包括：

- Chrome 35+
- Firefox 41+
- Safari 10+
- Edge 79+

## API参考

### 核心API

#### `FontChecker`

```typescript
new FontChecker(options?: FontCheckerOptions)
```

**选项：**

- `timeout`: 字体加载超时时间（毫秒），默认为3000

**方法：**

- `check(fontNames?: string | string[]): Promise<FontCheckResult | FontCheckResult[]>`
  - 如果不提供参数，则检查所有已加载的字体
  - 如果提供字符串，则检查单个字体
  - 如果提供字符串数组，则检查多个字体

**返回值类型：**

```typescript
interface FontCheckResult {
  name: string;      // 字体名称
  loaded: boolean;   // 是否已加载
  status: string;    // 状态：'loaded', 'error', 'fallback'
}
```

### 通用API

#### `createFontChecker`

```typescript
createFontChecker(options?: FontCheckerOptions): FontChecker
```

创建一个字体检查器实例。

### Vue API

#### `useFontCheck`

```typescript
useFontCheck(fonts?: string | string[], options?: FontCheckerOptions)
```

**返回值：**

```typescript
{
  results: Ref<FontCheckResult | FontCheckResult[] | undefined>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
}
```

### React API

#### `useFontCheck`

```typescript
useFontCheck(fonts?: string | string[], options?: FontCheckerOptions)
```

**返回值：**

```typescript
{
  results: FontCheckResult | FontCheckResult[] | undefined;
  loading: boolean;
  error: Error | null;
}
```

## 许可证

MIT