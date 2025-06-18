# font-checker

> 一个用于检测网页字体是否加载完成的工具，支持 JS/Vue/React，原生 API 实现。

## 功能
- 检查指定字体是否加载完成
- 支持超时设置
- 支持原生 JS、Vue、React 项目
- 支持 UMD 格式浏览器直接引入

## 安装

```bash
npm install font-checker
# 或
yarn add font-checker
```

## 用法

### 在 JS/TS/Vue/React 中
```js
import checkFontLoaded from 'font-checker';

checkFontLoaded('PingFang SC').then(loaded => {
  if (loaded) {
    console.log('字体已加载');
  } else {
    console.log('字体加载超时');
  }
});
```

### UMD 方式（浏览器直接引入）
```html
<script src="https://unpkg.com/font-checker/dist/index.umd.js"></script>
<script>
  fontChecker.default('PingFang SC').then(function(loaded) {
    if (loaded) {
      console.log('字体已加载');
    } else {
      console.log('字体加载超时');
    }
  });
</script>
```

## API

### checkFontLoaded(fontName: string, timeout?: number): Promise<boolean>
- `fontName`：要检测的字体名称
- `timeout`：超时时间（毫秒），默认 3000ms
- 返回：Promise<boolean>，true 表示已加载，false 表示超时未加载

## 发布

```bash
npm run publish:npm
```

## License
MIT 

## 单元测试

```bash
npm test
```

## 类型覆盖率检查

```bash
npm run type-coverage
```

## CI/CD

本项目已集成 GitHub Actions，自动执行构建、测试和类型检查。 