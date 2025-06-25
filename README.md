# OOAD AI Monorepo

這是一個包含 OOAD (物件導向分析與設計) 相關專案的 monorepo，包含：

## 套件結構

- **packages/slidev-presentation**: Slidev 簡報套件
- **packages/aotter-wow-system**: Aotter Wow 系統實作
- **packages/zoo-system**: 動物園 Wow 收集系統實作

## 快速開始

```bash
# 安裝依賴
pnpm install

# 開發模式 - 啟動所有服務
pnpm dev

# 開發特定套件
pnpm dev:slidev       # 啟動 Slidev 簡報
pnpm dev:zoo          # 啟動動物園系統
pnpm dev:aotter       # 啟動 Aotter 系統

# 建置所有套件
pnpm build

# 建置特定套件
pnpm build:slidev
pnpm build:zoo
pnpm build:aotter
```

## Slidev 簡報

啟動簡報伺服器：

```bash
pnpm dev:slidev
```

然後訪問 <http://localhost:3030>

## 開發指引

每個套件都是獨立的，擁有自己的 `package.json` 和依賴。你可以：

1. 在根目錄使用統一的指令管理所有套件
2. 進入特定套件目錄進行獨立開發
3. 使用 `pnpm --filter <package-name>` 執行特定套件的指令

了解更多關於 Slidev 的資訊：[文件](https://sli.dev/)
