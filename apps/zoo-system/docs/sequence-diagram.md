# 循序圖文件

本文件包含動物園 Wow 收集系統的主要互動流程循序圖，展示不同使用案例中各個物件之間的時序互動關係。

## 1. 遊客評分 Wow 流程

展示遊客觀看動物表演並給予 Wow 評分的完整流程。

```mermaid
sequenceDiagram
    participant V as 遊客<br/>Visitor
    participant UI as 使用者介面<br/>UI
    participant VS as 訪客服務<br/>VisitorService
    participant PS as 表演服務<br/>PerformanceService
    participant WS as Wow服務<br/>WowService
    participant LS as 排行榜服務<br/>LeaderboardService
    participant DB as 資料庫<br/>Database
  
    Note over V,DB: 遊客觀看表演並評分流程
  
    V->>UI: 進入動物園區域
    UI->>VS: 驗證遊客身份
    VS->>DB: 查詢遊客資料
    DB-->>VS: 返回遊客資訊
    VS-->>UI: 驗證成功
  
    UI->>PS: 請求當前表演資訊
    PS->>DB: 查詢進行中的表演
    DB-->>PS: 返回表演列表
    PS-->>UI: 顯示表演資訊
    UI-->>V: 展示動物表演
  
    V->>UI: 選擇給予 Wow 評分
    UI->>WS: 提交 Wow 評分請求
    WS->>VS: 驗證遊客評分權限
    VS-->>WS: 權限確認
  
    WS->>DB: 儲存 Wow 記錄
    DB-->>WS: 儲存成功
  
    WS->>LS: 更新排行榜
    LS->>DB: 計算並更新積分
    DB-->>LS: 更新完成
    LS-->>WS: 排行榜更新成功
  
    WS-->>UI: Wow 評分成功
    UI-->>V: 顯示評分結果與獲得積分
```

## 2. 動物自動表演觸發流程

展示系統自動觸發動物表演的內部流程。

```mermaid
sequenceDiagram
    participant Scheduler as 表演排程器<br/>PerformanceScheduler
    participant AS as 動物服務<br/>AnimalService
    participant PS as 表演服務<br/>PerformanceService
    participant NS as 通知服務<br/>NotificationService
    participant VS as 訪客服務<br/>VisitorService
    participant DB as 資料庫<br/>Database
  
    Note over Scheduler,DB: 自動表演觸發流程
  
    Scheduler->>AS: 檢查可表演動物
    AS->>DB: 查詢動物狀態與技能
    DB-->>AS: 返回動物資料
    AS-->>Scheduler: 提供可表演動物清單
  
    Scheduler->>PS: 隨機選擇並安排表演
    PS->>DB: 建立表演記錄
    DB-->>PS: 表演建立成功
  
    PS->>NS: 發送表演開始通知
    NS->>VS: 取得附近遊客清單
    VS->>DB: 查詢區域內遊客
    DB-->>VS: 返回遊客清單
    VS-->>NS: 提供通知對象
  
    NS-->>PS: 通知發送完成
    PS-->>Scheduler: 表演啟動成功
  
    Note over Scheduler,DB: 表演進行中...
  
    Scheduler->>PS: 表演時間結束
    PS->>DB: 更新表演狀態為完成
    DB-->>PS: 狀態更新成功
    PS-->>Scheduler: 表演流程完成
```

## 3. Wow 分享流程

展示遊客分享 Wow 記錄給朋友的流程。

```mermaid
sequenceDiagram
    participant V as 遊客<br/>Visitor
    participant UI as 使用者介面<br/>UI
    participant WS as Wow服務<br/>WowService
    participant SS as 分享服務<br/>ShareService
    participant Friend as 朋友<br/>Friend
    participant DB as 資料庫<br/>Database
  
    Note over V,DB: Wow 分享流程
  
    V->>UI: 選擇要分享的 Wow 記錄
    UI->>WS: 請求 Wow 詳細資訊
    WS->>DB: 查詢 Wow 記錄
    DB-->>WS: 返回 Wow 資料
    WS-->>UI: 提供 Wow 詳細資訊
  
    V->>UI: 確認分享操作
    UI->>SS: 建立分享連結請求
    SS->>DB: 生成唯一分享 ID
    DB-->>SS: 返回分享 ID
  
    SS->>DB: 儲存分享記錄
    DB-->>SS: 儲存成功
    SS-->>UI: 返回分享連結
  
    UI-->>V: 顯示分享連結
    V->>Friend: 傳送分享連結
  
    Friend->>UI: 點擊分享連結
    UI->>SS: 驗證分享連結
    SS->>DB: 查詢分享記錄
    DB-->>SS: 返回分享資料
    SS-->>UI: 提供 Wow 資訊
    UI-->>Friend: 顯示分享的 Wow 內容
```

## 4. 管理員查看統計流程

展示管理員查看系統統計資料的流程。

```mermaid
sequenceDiagram
    participant A as 管理員<br/>Admin
    participant AdminUI as 管理介面<br/>Admin UI
    participant Auth as 認證服務<br/>AuthService
    participant Stats as 統計服務<br/>StatisticsService
    participant WS as Wow服務<br/>WowService
    participant AS as 動物服務<br/>AnimalService
    participant DB as 資料庫<br/>Database
  
    Note over A,DB: 管理員統計查看流程
  
    A->>AdminUI: 登入管理系統
    AdminUI->>Auth: 驗證管理員憑證
    Auth->>DB: 查詢管理員權限
    DB-->>Auth: 返回權限資訊
    Auth-->>AdminUI: 認證成功
  
    A->>AdminUI: 請求查看 Wow 統計
    AdminUI->>Stats: 取得統計資料請求
  
    Stats->>WS: 查詢 Wow 相關數據
    WS->>DB: 查詢 Wow 記錄
    DB-->>WS: 返回 Wow 資料
    WS-->>Stats: 提供 Wow 統計
  
    Stats->>AS: 查詢動物相關數據
    AS->>DB: 查詢動物與表演記錄
    DB-->>AS: 返回動物資料
    AS-->>Stats: 提供動物統計
  
    Stats->>DB: 查詢遊客活躍度
    DB-->>Stats: 返回遊客統計
  
    Stats-->>AdminUI: 提供綜合統計報告
    AdminUI-->>A: 顯示統計圖表與報表
```

## 5. 排行榜更新流程

展示系統自動更新排行榜的流程。

```mermaid
sequenceDiagram
    participant Timer as 定時器<br/>Timer
    participant LS as 排行榜服務<br/>LeaderboardService
    participant VS as 訪客服務<br/>VisitorService
    participant WS as Wow服務<br/>WowService
    participant Cache as 快取系統<br/>Cache
    participant DB as 資料庫<br/>Database
  
    Note over Timer,DB: 定期排行榜更新流程
  
    Timer->>LS: 觸發排行榜更新任務
  
    LS->>VS: 請求所有遊客資料
    VS->>DB: 查詢遊客清單
    DB-->>VS: 返回遊客資料
    VS-->>LS: 提供遊客清單
  
    LS->>WS: 計算每位遊客的 Wow 積分
    WS->>DB: 查詢 Wow 記錄與評分
    DB-->>WS: 返回 Wow 統計資料
    WS-->>LS: 提供積分計算結果
  
    LS->>LS: 排序並生成排行榜
  
    LS->>Cache: 更新快取中的排行榜
    Cache-->>LS: 快取更新成功
  
    LS->>DB: 儲存最新排行榜資料
    DB-->>LS: 儲存成功
  
    LS-->>Timer: 排行榜更新完成
  
    Note over Timer,DB: 下次更新等待中...
```

## 循序圖設計原則

### 1. 時序性 (Temporal Ordering)

- 每個循序圖都按照實際的時間順序展示互動
- 使用同步訊息 (`->>`) 表示需要等待回應的呼叫
- 使用非同步訊息 (`-->>`) 表示回應訊息

### 2. 職責分離 (Separation of Concerns)

- 每個參與者都有明確的職責範圍
- 業務邏輯與資料存取分離
- UI 層與服務層分離

### 3. 錯誤處理

雖然圖中為了簡潔沒有完全展示，但實際實作中每個服務調用都應包含：

- 異常處理機制
- 失敗回滾策略
- 使用者友善的錯誤訊息

### 4. 效能考量

- 使用快取減少資料庫存取
- 批次處理大量資料操作
- 非同步處理不需要即時回應的操作

## 與其他設計文件的關聯

- **類別圖**: 循序圖中的參與者對應類別圖中的類別
- **使用案例圖**: 每個循序圖實現一個或多個使用案例
- **系統架構**: 參與者的分層對應系統架構的層次設計

這些循序圖提供了系統動態行為的詳細視圖，有助於開發團隊理解系統的運作流程並進行實作。
