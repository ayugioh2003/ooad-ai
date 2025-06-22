# Aotter-Wow 評價網站 - 領域模型分析

## 1. 領域概念識別

### 1.1 主要實體 (Entities)

**User (使用者)**
- 系統中的參與者，可以是一般使用者或管理員
- 具有唯一識別性
- 擁有個人資料和狀態

**Post (貼文)**
- 使用者發布的內容單位
- 具有唯一識別性
- 包含文字內容和分類資訊

**Category (類別)**
- 貼文的分類標籤
- 如：動物、美食、旅遊等

**Wow (讚賞評價)**
- 使用者對貼文的正面評價
- 表示一種評價關係

### 1.2 值物件 (Value Objects)

**UserProfile (使用者資料)**
- username: 使用者名稱
- email: 電子郵件
- password: 密碼
- joinDate: 註冊日期

**PostContent (貼文內容)**
- title: 標題
- content: 內容文字
- publishDate: 發布日期

**WowStats (Wow 統計)**
- count: Wow 數量
- lastWowDate: 最後一次收到 Wow 的時間

## 2. 概念類別圖

### 2.1 核心類別

```
User
├── id: Long
├── username: String
├── email: String
├── password: String
├── joinDate: Date
├── userType: UserType (USER, ADMIN)
├── posts: List<Post>
└── wowsGiven: List<Wow>

Post
├── id: Long
├── title: String
├── content: String
├── publishDate: Date
├── author: User
├── category: Category
├── wows: List<Wow>
└── wowCount: Integer

Category
├── id: Long
├── name: String
├── description: String
└── posts: List<Post>

Wow
├── id: Long
├── user: User
├── post: Post
└── wowDate: Date
```

### 2.2 關係說明

**User 與 Post (一對多)**
- 一個使用者可以發布多篇貼文
- 每篇貼文只能有一個作者
- 關係：User "1" ---- "0..*" Post

**Post 與 Category (多對一)**
- 每篇貼文屬於一個類別
- 一個類別可以包含多篇貼文
- 關係：Category "1" ---- "0..*" Post

**User 與 Wow (一對多)**
- 一個使用者可以給予多個 Wow
- 每個 Wow 只能由一個使用者給予
- 關係：User "1" ---- "0..*" Wow

**Post 與 Wow (一對多)**
- 一篇貼文可以收到多個 Wow
- 每個 Wow 只能給予一篇貼文
- 關係：Post "1" ---- "0..*" Wow

**User 與 Post 透過 Wow (多對多)**
- 透過 Wow 實體建立使用者與貼文的評價關係
- 一個使用者對一篇貼文只能給一個 Wow

## 3. 業務規則在領域模型中的體現

### 3.1 約束條件

**唯一性約束**
- User.username 必須唯一
- User.email 必須唯一
- 同一個 User 對同一個 Post 只能有一個 Wow

**必要性約束**
- Post.title 不能為空，至少 3 個字
- Post.content 不能為空
- User.username, email, password 不能為空

**業務邏輯約束**
- 使用者不能對自己的貼文給 Wow
- Wow 一旦給予不可撤銷

### 3.2 計算屬性

**Post.wowCount**
- 計算方式：COUNT(Post.wows)
- 用於排序和統計

**User 相關統計**
- totalPostsCount: 使用者發布的貼文總數
- totalWowsReceived: 使用者收到的 Wow 總數
- totalWowsGiven: 使用者給出的 Wow 總數

## 4. 領域服務識別

### 4.1 PostService (貼文服務)
- 負責貼文的建立、編輯、刪除
- 處理貼文的查詢和排序邏輯
- 驗證貼文內容的合法性

### 4.2 WowService (評價服務)
- 處理 Wow 評價的給予邏輯
- 驗證 Wow 的業務規則
- 計算 Wow 相關統計

### 4.3 UserService (使用者服務)
- 處理使用者註冊、登入、認證
- 管理使用者權限
- 提供使用者統計資訊

### 4.4 CategoryService (類別服務)
- 管理貼文類別
- 提供類別相關的查詢功能

## 5. 聚合根識別

### 5.1 User 聚合
- **聚合根**: User
- **包含實體**: User 本身
- **業務不變量**: 使用者名稱和 Email 的唯一性

### 5.2 Post 聚合
- **聚合根**: Post
- **包含實體**: Post, Wow (與此貼文相關的)
- **業務不變量**: 
  - 貼文內容的完整性
  - Wow 評價的唯一性約束

### 5.3 Category 聚合
- **聚合根**: Category
- **包含實體**: Category 本身
- **業務不變量**: 類別名稱的唯一性

## 6. 事件識別

### 6.1 領域事件

**PostPublished (貼文已發布)**
- 觸發時機：使用者成功發布新貼文
- 攜帶資訊：Post ID, Author ID, Publish Date

**WowGiven (Wow 已給予)**
- 觸發時機：使用者給予貼文 Wow 評價
- 攜帶資訊：User ID, Post ID, Wow Date

**UserRegistered (使用者已註冊)**
- 觸發時機：新使用者註冊成功
- 攜帶資訊：User ID, Username, Registration Date

## 7. 領域模型驗證

### 7.1 需求覆蓋檢查
✅ 使用者註冊/登入功能 → User 聚合  
✅ 發布文字貼文功能 → Post 聚合  
✅ Wow 評價系統 → Wow 實體 + WowService  
✅ 貼文分類功能 → Category 聚合  
✅ Wow 排行榜功能 → PostService + Post.wowCount  
✅ 管理員功能 → User.userType + 相關服務  

### 7.2 業務規則驗證
✅ 一個使用者對一篇貼文只能給一個 Wow → Wow 實體約束  
✅ 使用者不能對自己的貼文給 Wow → WowService 業務邏輯  
✅ 貼文必須有標題和內容 → Post 實體約束  
✅ 使用者名稱和 Email 唯一 → User 實體約束  

## 8. 類別設計參考

詳細的類別圖設計請參考：`docs/class-diagram.md`

### 8.1 類別圖涵蓋範圍
- **領域模型類別**: User, Post, Category, Wow 及相關值物件
- **服務層類別**: UserService, PostService, WowService, CategoryService
- **資料存取層類別**: Repository 介面及實作
- **控制層類別**: 各種 Controller 和中介軟體
- **支援類別**: 工具類別、異常處理、DTO 物件

### 8.2 設計模式應用
- Repository Pattern: 資料存取封裝
- Service Layer Pattern: 業務邏輯封裝
- DTO Pattern: 資料傳輸物件
- Factory Pattern: 物件創建
- Strategy Pattern: 算法選擇

## 9. 下一階段

完成領域模型和類別圖設計後，接下來將進行：
1. 系統架構設計
2. 順序圖設計
3. 資料庫詳細設計
4. 程式碼實作
