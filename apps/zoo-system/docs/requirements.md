# 需求分析文件

## 1. 系統目標

建立一個概念動物園系統，以收集遊客的「Wow」（驚嘆反應）為核心功能，提供遊戲化的動物園體驗。

## 2. 利害關係人

- **主要使用者：** 動物園遊客
- **系統管理員：** 動物園管理人員
- **系統開發者：** 技術團隊

## 3. 功能需求

### 3.1 Wow 統計管理

#### Wow 來源
- 動物表演雜技時
- 動物展現可愛行為時
- 遊客與動物互動時
- 特殊動物行為時

#### Wow 記錄方式
- 遊客主動按讚/評分
- 系統自動偵測（遊客停留時間、拍照數量）

#### Wow 資訊內容
- 時間戳記
- 地點
- 相關動物
- 評分遊客
- Wow 類型
- 強度等級 (1-10分)

#### Wow 分類
- **可愛類：** 動物可愛行為
- **技能類：** 動物技能表演
- **互動類：** 遊客與動物互動
- **驚喜類：** 意外驚喜行為

### 3.2 動物管理

#### 動物基本資訊
- 編號 (ID)
- 名稱
- 種類
- 年齡
- 特色描述

#### 動物能力管理
- 特殊技能/才藝列表
- Wow 產生能力 (1-10等級)
- 技能更新功能

#### 表演系統
- 自動隨機表演觸發
- 無時間限制
- 遊客無法主動要求表演

### 3.3 訪客服務

#### 遊客功能
- 隨意命名進入（無需註冊）
- 查看動物資訊
- 給 Wow 評分（每次表演限評分一次）
- 查看自己的 Wow 收集記錄
- 查看排行榜
- 分享 Wow 功能

#### 分享機制
- 生成分享連結
- 直接顯示給其他遊客

#### 排行榜系統
- **遊客排行榜：** 按總 Wow 點數排序
- **動物排行榜：** 按獲得的 Wow 總分排序

## 4. 非功能需求

### 4.1 效能需求
- 系統響應時間 < 2秒
- 支援多位遊客同時使用

### 4.2 可用性需求
- 直觀的使用者介面
- 無需學習即可使用

### 4.3 資料需求
- Wow 記錄永久保存
- 遊客資料暫存（可清除）

## 5. 系統限制

- 概念性系統，不需完全符合現實動物園
- 專注於 Wow 收集機制
- 簡化的使用者管理（無註冊系統）

## 6. 系統邊界

### 包含功能
- Wow 統計和管理
- 動物資訊管理
- 遊客互動服務
- 排行榜系統
- 分享功能

### 不包含功能
- 門票購買系統
- 實體設施管理
- 員工排班系統
- 財務管理
- 成就系統
