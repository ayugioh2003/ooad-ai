# 實作範例（TypeScript）

此資料夾包含概念動物園 Wow 收集系統的 TypeScript 實作範例。

## 專案結構

```
src/
├── models/              # 實體類別
├── services/            # 業務邏輯層
├── repositories/        # 資料存取層
├── controllers/         # 控制器層
├── interfaces/          # 介面定義
├── types/               # 型別定義
└── app.ts               # 應用程式入口
package.json
tsconfig.json
jest.config.js
```

## 快速開始

1. 確保已安裝 Node.js 16+ 和 npm/yarn
2. 安裝依賴：`npm install` 或 `yarn install`
3. 編譯專案：`npm run build`
4. 執行專案：`npm start`
5. 開發模式：`npm run dev`
6. 執行測試：`npm test`

## 主要特色

- 完整的 OOAD 設計實現
- TypeScript 強型別系統
- Express.js 框架
- SQLite 本地資料庫
- RESTful API
- 簡單的 Web 介面
- Jest 單元測試
- ESLint + Prettier 程式碼品質
