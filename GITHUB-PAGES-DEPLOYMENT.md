# GitHub Pages 部署指南

這份文件說明如何將 Slidev 簡報部署到 GitHub Pages。

## 自動部署設定

### 1. GitHub Repository 設定

1. 前往 GitHub repository: `https://github.com/ayugioh2003/ooad-ai`
2. 點擊 **Settings** 標籤
3. 在左側選單點擊 **Pages**
4. 在 **Source** 區域選擇 **GitHub Actions**

### 2. 部署流程

每當有新的 commit 推送到 `main` 或 `master` 分支，且修改了 `apps/slidev-presentation/` 目錄下的檔案時，GitHub Actions 會自動：

1. 檢查程式碼
2. 安裝 pnpm 和 Node.js
3. 安裝依賴項目
4. 建置 Slidev 簡報
5. 部署到 GitHub Pages

### 3. 存取簡報

部署完成後，可透過以下 URL 存取簡報：

🚀 **Live Demo**: [https://ayugioh2003.github.io/ooad-ai/](https://ayugioh2003.github.io/ooad-ai/)

## 手動部署

如果需要手動觸發部署：

1. 前往 GitHub repository 的 **Actions** 標籤
2. 選擇 **Deploy Slidev to GitHub Pages** 工作流程
3. 點擊 **Run workflow** 按鈕

## 本地開發

```bash
# 開發模式
pnpm dev:slidev

# 建置檢視
cd apps/slidev-presentation
NODE_ENV=production pnpm run build
```

## 技術細節

- 使用 GitHub Actions 進行 CI/CD
- 自動偵測 `apps/slidev-presentation/` 的檔案變更
- 支援 pnpm workspace
- 建置後部署到 GitHub Pages
- 使用正確的 base path (`/ooad-ai/`) 以符合 GitHub Pages 的路徑結構
