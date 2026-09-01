# PaperNotes · 兔的论文笔记

一个公开展示个人论文 Markdown 笔记的网站。笔记以可浏览的分段 JSON 呈现，方便按主题检索和阅读。

## 内容边界

- 仓库只保存公开展示所需的网站源码与笔记 JSON。
- 不包含论文 PDF、原始笔记目录、环境变量或托管配置。
- 论文笔记是个人阅读记录；原论文与代码的权利仍归各自作者与发布方所有。

## 本地运行

需要 Node.js 22 或更高版本。

```bash
npm ci
npm run dev
```

终端会显示本地访问地址。保存代码后，开发服务器会自动刷新页面。

## 验证与构建

```bash
node --experimental-strip-types --test tests/library.test.ts tests/reader-font.test.ts
npm run build
```

## 目录说明

```text
app/            页面与全局样式
components/     阅读库与论文阅读器组件
lib/            论文数据读取与筛选逻辑
public/data/    公开的论文笔记 JSON
tests/          基础行为测试
```

## GitHub Actions

每次推送到 `main` 或创建面向 `main` 的 Pull Request，GitHub Actions 都会安装锁定依赖、运行测试并构建网站。工作流不部署网站，也不使用任何密钥。
