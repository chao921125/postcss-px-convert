# 贡献指南

感谢您对 postcss-px-convert 的关注！我们非常欢迎并感谢任何形式的贡献。

## 行为准则

参与本项目需遵守开源社区行为准则，请保持尊重和包容的态度。

## 如何贡献

### 报告问题

如果您发现了 bug 或者有新功能建议，请通过 GitHub Issues 提出：

1. 在提交问题前，请先搜索是否已有类似问题
2. 使用清晰的标题和详细描述
3. 提供可复现的步骤、期望结果和实际结果
4. 如可能，提供示例代码或测试用例

### 提交代码

1. Fork 本仓库
2. 创建您的特性分支：`git checkout -b feature/amazing-feature`
3. 提交您的更改：`git commit -m 'feat: add some amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

### 代码风格

- 遵循现有的代码风格和结构
- 使用 TypeScript
- 确保代码通过所有测试
- 为新功能添加测试用例

### 开发流程

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 构建项目
npm run build
```

## Pull Request 规范

1. PR 应该针对单一问题或功能
2. 提交信息应简洁明了，并遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范
3. 确保 PR 通过了所有测试
4. 更新相关文档

## 版本发布流程

我们使用语义化版本控制：
- MAJOR 版本：不兼容的 API 更改
- MINOR 版本：以向后兼容的方式添加功能
- PATCH 版本：向后兼容的错误修复

## 许可证

通过贡献您的代码，您同意您的贡献将在项目的 MIT 许可下发布。 