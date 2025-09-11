# Cloudflare Pages 部署指南

## 配置說明

由於這個專案使用了較舊的依賴版本，需要特殊的構建設置來在 Cloudflare Pages 上成功部署。

### Cloudflare Pages 設置

在 Cloudflare Pages 項目設置中，請使用以下配置：

**構建設置：**
- Framework preset: `None` (不要選擇 Create React App)
- Build command: `npm install --legacy-peer-deps && npm run build`
- Build output directory: `build`
- Root directory: `/` (留空)

**環境變量：**
- `NODE_VERSION`: `20`
- `NPM_FLAGS`: `--legacy-peer-deps`

### 為什麼需要這些設置

1. **`--legacy-peer-deps` 標誌**：這個專案使用了一些舊版本的依賴，需要這個標誌來繞過 peer dependency 衝突。

2. **Node.js 版本 20**：確保構建環境使用正確的 Node.js 版本。

3. **手動構建命令**：避免使用預設的 `npm ci`，因為它對 lock file 同步有嚴格要求。

### 故障排除

如果部署失敗：

1. 確認構建命令是：`npm install --legacy-peer-deps && npm run build`
2. 確認輸出目錄是：`build`
3. 確認 Node.js 版本設為：`20`
4. 檢查 package-lock.json 是否與 package.json 同步

### 本地測試

在推送到 GitHub 之前，可以本地測試構建：

```bash
# 清理 node_modules
rm -rf node_modules package-lock.json

# 重新安裝依賴
npm install --legacy-peer-deps

# 構建專案
npm run build

# 測試構建結果
npx serve build
```

### GitHub Pages 部署（備選方案）

如果 Cloudflare Pages 有問題，可以使用 GitHub Pages：

```bash
npm run deploy
```
