# 暗黑破壞神網頁版 (DiabloWeb)

這是原版暗黑破壞神遊戲的網頁移植版，基於 GalaXyHaXz 和 devilution 團隊重構的原始碼開發。

## 🎮 線上遊玩

訪問 [diabloweb.pages.dev](https://diabloweb.pages.dev) 立即開始遊玩！

## 🌐 語言支援

本專案現已支援多語言介面：
- 🇺🇸 English (英文)
- 🇹🇼 繁體中文

您可以在遊戲介面右上角切換語言。

## 📋 2025年9月9日更新紀錄

### 🔧 技術修復與改進

#### 1. 解決 Node.js 相容性問題
- **問題**: 專案使用過時的 `node-sass@4.14.1`，與 Node.js 20 不相容
- **解決方案**: 
  - 移除 `node-sass`，改用現代的 `sass` (Dart Sass)
  - 更新 webpack 配置以使用新的 Sass 載入器
  - 修復 OpenSSL Legacy Provider 問題，為構建腳本添加 `--openssl-legacy-provider` 參數

#### 2. 修復 Shareware 版本載入問題
- **問題**: "試玩免費版" 按鈕點擊後出現 404 錯誤和檔案大小錯誤
- **根本原因**: 
  - `spawn.mpq` 檔案 (25.8 MB) 超過 Cloudflare Pages 的 25MB 靜態檔案限制
  - 從 GitHub Releases 直接載入時遭遇 CORS 跨域問題
- **最終解決方案**:
  - 將大檔案分割為小塊：`spawn.mpq.chunk000` (20MB) + `spawn.mpq.chunk001` (4.8MB)
  - 建立中繼資料檔案 `spawn.mpq.meta` 記錄分割資訊
  - 修改載入邏輯：依序下載分塊檔案並在記憶體中重組
  - 所有檔案都從同域名提供，避免 CORS 問題

#### 3. 修復 CI/CD 構建問題
- **問題**: Cloudflare Pages CI 環境將 ESLint 警告視為錯誤
- **解決方案**: 重構程式碼以避免在迴圈中建立函數，符合 `no-loop-func` 規則

#### 4. 新增國際化支援
- **功能**: 完整的繁體中文/英文雙語支援
- **實現**:
  - 建立 i18n 系統，支援語言自動偵測和持久化儲存
  - 新增語言選擇器組件，支援即時切換
  - 翻譯所有使用者介面文字，包括選單、錯誤訊息、載入提示等
  - 支援繁體中文職業名稱：戰士、盜賊、法師

### 🗂️ 新增檔案結構
```
src/
├── i18n/
│   ├── index.js          # 國際化核心邏輯
│   ├── en.json           # 英文翻譯
│   └── zh-tw.json        # 繁體中文翻譯
├── components/
│   ├── LanguageSelector.js    # 語言選擇器組件
│   └── LanguageSelector.scss  # 語言選擇器樣式
public/
└── chunks/
    ├── spawn.mpq.chunk000     # 分割檔案 1
    ├── spawn.mpq.chunk001     # 分割檔案 2
    └── spawn.mpq.meta         # 分割中繼資料
split_spawn.js                 # 檔案分割工具腳本
```

### 🚀 部署優化
- 使用 Cloudflare Pages 自動部署
- 檔案分塊技術繞過雲端平台檔案大小限制
- 優化載入體驗，支援分塊下載進度顯示

### 🎯 遊戲體驗改進
- 修復免費試玩版無法載入的問題
- 新增繁體中文介面，提升中文使用者體驗
- 保持完整的原版遊戲功能
- 支援存檔管理和檔案上傳功能

## 🛠️ 本地開發

### 系統需求
- Node.js 18+ 
- npm 或 yarn

### 安裝步驟
```bash
# 複製專案
git clone https://github.com/anomixer/diabloweb
cd diabloweb

# 安裝相依套件
npm install --legacy-peer-deps

# 啟動開發伺服器
npm start

# 建置生產版本
npm run build
```

### 檔案分割工具
如果您需要重新分割 `spawn.mpq` 檔案：
```bash
node split_spawn.js
```

## 📁 遊戲檔案說明

### 正版遊戲
- 支援原版 `DIABDAT.MPQ` 檔案
- 可從 [GoG](https://www.gog.com/game/diablo) 購買正版遊戲
- 支援檔案拖曳上傳

### 試玩版本
- 免費的共享版本，約 50MB 下載
- 自動分塊載入，無需手動下載
- 包含遊戲基本內容供試玩

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

本專案基於原始 DiabloWeb 專案開發，詳情請參考相關授權文件。

## 🔗 相關連結

- 原始專案: [d07RiV/diabloweb](https://github.com/d07RiV/diabloweb)
- 線上遊玩: [diabloweb.pages.dev](https://diabloweb.pages.dev)
- 回報問題: [GitHub Issues](https://github.com/anomixer/diabloweb/issues)
