# 暗黑破坏神网页版 (DiabloWeb)

这是原版暗黑破坏神游戏的网页移植版，基于 GalaXyHaXz 和 devilution 团队重构的源代码开发。

## 🎮 在线游玩

访问 [diabloweb.pages.dev](https://diabloweb.pages.dev) 立即开始游玩！

## 🌐 语言支持

本项目现已支持多语言界面：
- 🇺🇸 English (英文)
- 🇹🇼 繁體中文 (繁体中文)
- 🇨🇳 简体中文
- 🇯🇵 日本語 (日文)
- 🇰🇷 한국어 (韩文)

您可以在游戏界面右上角切换语言。

## 📋 2025年9月9日更新记录

### 🔧 技术修复与改进

#### 1. 解决 Node.js 兼容性问题
- **问题**: 项目使用过时的 `node-sass@4.14.1`，与 Node.js 20 不兼容
- **解决方案**: 
  - 移除 `node-sass`，改用现代的 `sass` (Dart Sass)
  - 更新 webpack 配置以使用新的 Sass 加载器
  - 修复 OpenSSL Legacy Provider 问题，为构建脚本添加 `--openssl-legacy-provider` 参数

#### 2. 修复 Shareware 版本加载问题
- **问题**: "试玩免费版" 按钮点击后出现 404 错误和文件大小错误
- **根本原因**: 
  - `spawn.mpq` 文件 (25.8 MB) 超过 Cloudflare Pages 的 25MB 静态文件限制
  - 从 GitHub Releases 直接加载时遭遇 CORS 跨域问题
- **最终解决方案**:
  - 将大文件分割为小块：`spawn.mpq.chunk000` (20MB) + `spawn.mpq.chunk001` (4.8MB)
  - 建立元数据文件 `spawn.mpq.meta` 记录分割信息
  - 修改加载逻辑：依序下载分块文件并在内存中重组
  - 所有文件都从同域名提供，避免 CORS 问题

#### 3. 修复 CI/CD 构建问题
- **问题**: Cloudflare Pages CI 环境将 ESLint 警告视为错误
- **解决方案**: 重构代码以避免在循环中创建函数，符合 `no-loop-func` 规则

#### 4. 新增国际化支持
- **功能**: 完整的多语言支持（英文/繁体中文/简体中文/日文/韩文）
- **实现**:
  - 建立 i18n 系统，支持语言自动检测和持久化存储
  - 新增语言选择器组件，支持实时切换
  - 翻译所有用户界面文字，包括菜单、错误信息、加载提示等
  - 支持各语言职业名称本地化

### 🗂️ 新增文件结构
```
src/
├── i18n/
│   ├── index.js          # 国际化核心逻辑
│   ├── en.json           # 英文翻译
│   ├── zh-tw.json        # 繁体中文翻译
│   ├── zh-cn.json        # 简体中文翻译
│   ├── ja.json           # 日文翻译
│   └── ko.json           # 韩文翻译
├── components/
│   ├── LanguageSelector.js    # 语言选择器组件
│   └── LanguageSelector.scss  # 语言选择器样式
public/
└── chunks/
    ├── spawn.mpq.chunk000     # 分割文件 1
    ├── spawn.mpq.chunk001     # 分割文件 2
    └── spawn.mpq.meta         # 分割元数据
split_spawn.js                 # 文件分割工具脚本
```

### 🚀 部署优化
- 使用 Cloudflare Pages 自动部署
- 文件分块技术绕过云端平台文件大小限制
- 优化加载体验，支持分块下载进度显示

### 🎯 游戏体验改进
- 修复免费试玩版无法加载的问题
- 新增多语言界面，提升各地区用户体验
- 保持完整的原版游戏功能
- 支持存档管理和文件上传功能

## 🛠️ 本地开发

### 系统需求
- Node.js 18+ 
- npm 或 yarn

### 安装步骤
```bash
# 复制项目
git clone https://github.com/anomixer/diabloweb
cd diabloweb

# 安装依赖包
npm install --legacy-peer-deps

# 启动开发服务器
npm start

# 构建生产版本
npm run build
```

### 文件分割工具
如果您需要重新分割 `spawn.mpq` 文件：
```bash
node split_spawn.js
```

## 📁 游戏文件说明

### 正版游戏
- 支持原版 `DIABDAT.MPQ` 文件
- 可从 [GoG](https://www.gog.com/game/diablo) 购买正版游戏
- 支持文件拖拽上传

### 试玩版本
- 免费的共享版本，已压缩成网页专用版约 25MB
- 自动分块加载，无需手动下载
- 包含游戏基本内容供试玩

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 授权

本项目基于原始 DiabloWeb 项目开发，详情请参考相关授权文件。

## 🔗 相关链接

- 原始项目: [d07RiV/diabloweb](https://github.com/d07RiV/diabloweb)
- 在线游玩: [diabloweb.pages.dev](https://diabloweb.pages.dev)
- 问题反馈: [GitHub Issues](https://github.com/anomixer/diabloweb/issues)
