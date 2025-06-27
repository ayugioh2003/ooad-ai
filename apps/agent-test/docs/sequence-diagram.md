# Aotter-Wow 評價網站 - 順序圖設計

## 1. 順序圖概述

順序圖展示了系統中不同物件之間的互動順序，以時間為軸描述訊息傳遞的過程。

## 2. 核心使用案例的順序圖

### 2.1 使用者註冊流程

```mermaid
sequenceDiagram
    participant User as 使用者
    participant UI as Nuxt.js 前端
    participant API as Server API
    participant US as UserService
    participant UR as UserRepository
    participant DB as SQLite資料庫

    User->>UI: 填寫註冊表單
    UI->>UI: 前端表單驗證
    UI->>API: POST /api/users/register
    API->>API: 輸入格式驗證
    API->>US: registerUser(userData)
    US->>US: 密碼雜湊處理
    US->>UR: checkUserExists(username, email)
    UR->>DB: SELECT查詢使用者是否存在
    DB-->>UR: 查詢結果
    UR-->>US: 使用者不存在
    US->>UR: createUser(hashedUserData)
    UR->>DB: INSERT新使用者記錄
    DB-->>UR: 插入成功，返回userId
    UR-->>US: 創建成功
    US-->>API: 註冊成功
    API->>API: 生成JWT Token (Access + Refresh)
    API-->>UI: 返回成功回應和Token
    UI-->>User: 顯示註冊成功，自動登入
```

---

### 2.2 使用者登入流程

```mermaid
sequenceDiagram
    participant User as 使用者
    participant UI as Nuxt.js 前端
    participant API as Server API
    participant US as UserService
    participant UR as UserRepository
    participant DB as SQLite資料庫

    User->>UI: 輸入帳號密碼
    UI->>API: POST /api/auth/login
    API->>API: 輸入驗證
    API->>US: authenticateUser(username, password)
    US->>UR: findUserByUsername(username)
    UR->>DB: SELECT查詢使用者
    DB-->>UR: 返回使用者資料
    UR-->>US: 使用者資料
    US->>US: 驗證密碼雜湊
    alt 密碼正確
        US-->>API: 驗證成功，返回使用者資料
        API->>API: 生成JWT Token (Access + Refresh)
        API-->>UI: 登入成功，返回Token
        UI-->>User: 跳轉到首頁
    else 密碼錯誤
        US-->>API: 驗證失敗
        API-->>UI: 返回錯誤訊息
        UI-->>User: 顯示登入失敗
    end
```

---

### 2.3 發布貼文流程

```mermaid
sequenceDiagram
    participant User as 使用者
    participant UI as Nuxt.js 前端
    participant API as Server API
    participant PS as PostService
    participant PR as PostRepository
    participant CR as CategoryRepository
    participant DB as SQLite資料庫

    User->>UI: 填寫貼文表單
    UI->>API: POST /api/posts (Bearer Token)
    API->>API: JWT Token驗證
    API->>API: 輸入驗證
    API->>PS: createPost(postData, userId)
    PS->>CR: validateCategory(categoryId)
    CR->>DB: SELECT查詢類別是否存在
    DB-->>CR: 類別存在
    CR-->>PS: 類別驗證成功
    PS->>PS: 建立Post物件
    PS->>PR: savePost(post)
    PR->>DB: INSERT新貼文記錄
    DB-->>PR: 返回postId
    PR-->>PS: 貼文創建成功
    PS-->>API: 返回貼文資料
    API-->>UI: 返回成功回應
    UI-->>User: 顯示發布成功
    UI->>UI: 跳轉到貼文詳細頁面
```

---

### 2.4 給予Wow評價流程

```mermaid
sequenceDiagram
    participant User as 使用者
    participant UI as Nuxt.js 前端
    participant API as Server API
    participant WS as WowService
    participant WR as WowRepository
    participant PR as PostRepository
    participant DB as SQLite資料庫

    User->>UI: 點擊Wow按鈕
    UI->>API: POST /api/wows (Bearer Token)
    API->>API: JWT Token驗證
    API->>WS: giveWow(userId, postId)
    
    par 驗證過程
        WS->>PR: getPostById(postId)
        PR->>DB: SELECT查詢貼文
        DB-->>PR: 貼文資料
        PR-->>WS: 貼文存在
    and
        WS->>WR: checkExistingWow(userId, postId)
        WR->>DB: SELECT查詢已存在的Wow
        DB-->>WR: 查詢結果
        WR-->>WS: 尚未給予Wow
    end
    
    WS->>WS: 驗證使用者不是貼文作者
    
    alt 所有驗證通過
        WS->>WR: createWow(userId, postId)
        WR->>DB: INSERT Wow記錄
        DB-->>WR: 插入成功
        WR-->>WS: Wow創建成功
        WS->>PR: incrementWowCount(postId)
        PR->>DB: UPDATE posts SET wow_count = wow_count + 1
        DB-->>PR: 更新成功
        PR-->>WS: 計數更新成功
        WS-->>API: Wow給予成功
        API-->>UI: 返回成功回應
        UI->>UI: 更新按鈕狀態為"已Wow"
        UI->>UI: 更新Wow計數顯示
        UI-->>User: 顯示操作成功
    else 驗證失敗
        WS-->>API: 返回錯誤訊息
        API-->>UI: 返回錯誤回應
        UI-->>User: 顯示錯誤訊息
    end
```

---

### 2.5 查看Wow排行榜流程

```mermaid
sequenceDiagram
    participant User as 使用者
    participant UI as Nuxt.js 前端
    participant API as Server API
    participant PS as PostService
    participant PR as PostRepository
    participant DB as SQLite資料庫

    User->>UI: 點擊Wow排行榜
    UI->>API: GET /api/leaderboard
    API->>PS: getTopWowPosts(limit, categoryId?)
    PS->>PR: findPostsOrderByWow(limit, categoryId)
    PR->>DB: SELECT with JOIN and ORDER BY wow_count DESC
    DB-->>PR: 排序後的貼文列表
    PR-->>PS: 貼文資料
    PS->>PS: 格式化回應資料
    PS-->>API: 排行榜資料
    API-->>UI: 返回排行榜JSON
    UI->>UI: 渲染排行榜頁面
    UI-->>User: 顯示Wow排行榜

    loop 對每篇貼文
        UI->>UI: 顯示貼文標題、Wow數量、作者
        UI->>UI: 提供查看詳細連結
    end
```

---

### 2.6 搜尋貼文流程

```mermaid
sequenceDiagram
    participant User as 使用者
    participant UI as Nuxt.js 前端
    participant API as Server API
    participant PS as PostService
    participant PR as PostRepository
    participant DB as SQLite資料庫

    User->>UI: 輸入搜尋關鍵字
    UI->>API: GET /api/posts?search=keyword
    API->>PS: searchPosts(keyword, filters)
    PS->>PS: 建構搜尋條件
    PS->>PR: findPostsByKeyword(searchCriteria)
    PR->>DB: SELECT with WHERE LIKE '%keyword%'
    DB-->>PR: 符合條件的貼文
    PR-->>PS: 搜尋結果
    PS->>PS: 按相關性或Wow數排序
    PS-->>API: 格式化搜尋結果
    API-->>UI: 返回搜尋結果JSON
    UI->>UI: 渲染搜尋結果頁面
    UI-->>User: 顯示搜尋結果

    opt 如果沒有結果
        UI-->>User: 顯示"找不到相關貼文"
    end
```

---

### 2.7 管理員刪除不當內容流程

```mermaid
sequenceDiagram
    participant Admin as 管理員
    participant UI as 管理介面
    participant API as Server API
    participant PS as PostService
    participant PR as PostRepository
    participant WR as WowRepository
    participant DB as SQLite資料庫

    Admin->>UI: 查看管理後台
    UI->>API: GET /api/admin/posts
    API->>API: 驗證管理員權限
    API->>PS: getAllPostsForAdmin()
    PS->>PR: findAllPostsWithDetails()
    PR->>DB: SELECT posts with author info
    DB-->>PR: 所有貼文資料
    PR-->>PS: 貼文列表
    PS-->>API: 管理用貼文列表
    API-->>UI: 返回貼文資料
    UI-->>Admin: 顯示貼文管理頁面

    Admin->>UI: 選擇刪除特定貼文
    UI->>API: DELETE /api/admin/posts/:id
    API->>API: 驗證管理員權限
    API->>PS: deletePost(postId, adminId)
    
    par 刪除相關資料
        PS->>WR: deleteWowsByPost(postId)
        WR->>DB: DELETE FROM wows WHERE post_id = ?
        DB-->>WR: 刪除Wow記錄
        WR-->>PS: Wow刪除完成
    and
        PS->>PR: deletePost(postId)
        PR->>DB: DELETE FROM posts WHERE id = ?
        DB-->>PR: 貼文刪除完成
        PR-->>PS: 貼文刪除成功
    end
    
    PS-->>API: 刪除操作完成
    API-->>UI: 返回刪除成功
    UI->>UI: 從列表中移除該貼文
    UI-->>Admin: 顯示刪除成功訊息
```

## 3. 系統互動模式分析

### 3.1 同步vs異步操作

**同步操作**
- 使用者登入/註冊
- 發布貼文
- 給予Wow評價
- 管理操作

**異步潛力**（未來擴展）
- 統計資料更新
- 通知推送
- 搜尋索引更新

### 3.2 錯誤處理模式

每個順序圖中都包含了錯誤處理的分支：
- 輸入驗證失敗
- 權限驗證失敗
- 業務規則違反
- 資料庫操作失敗

### 3.3 效能考量

**資料庫操作最佳化**
- 使用適當的索引
- 避免N+1查詢問題
- 批次操作的考慮

**快取策略**
- 熱門貼文快取
- JWT Token黑名單快取
- 類別資料快取

---

## SD-008: JWT Token 刷新流程

```mermaid
sequenceDiagram
    participant UI as Nuxt.js 前端
    participant API as Server API
    participant JS as JWTService
    participant DB as SQLite資料庫

    UI->>API: POST /api/auth/refresh (Refresh Token in Cookie)
    API->>API: 提取Refresh Token
    API->>JS: verifyRefreshToken(token)
    JS->>JS: 驗證Token簽名和過期時間
    JS->>DB: 檢查Token是否在黑名單
    DB-->>JS: Token未被撤銷
    JS-->>API: Token有效，返回使用者資料
    API->>JS: generateAccessToken(user)
    JS-->>API: 新的Access Token
    API->>JS: generateRefreshToken(user)
    JS-->>API: 新的Refresh Token
    API->>API: 設置新的Refresh Token Cookie
    API-->>UI: 返回新的Access Token
    UI->>UI: 更新Pinia Store中的Token
    
    Note over UI,DB: 如果Refresh Token過期或無效
    alt Refresh Token無效
        JS-->>API: Token無效
        API-->>UI: 401 Unauthorized
        UI->>UI: 清除本地Token
        UI->>UI: 重定向到登入頁面
    end
```

## 4. 物件互動複雜度分析

### 4.1 簡單互動（2-3個物件）
- 使用者登入
- 簡單查詢操作

### 4.2 中等複雜度（4-5個物件）
- 發布貼文
- 搜尋功能

### 4.3 複雜互動（6+個物件）
- 給予Wow評價（需要多重驗證）
- 管理員刪除操作（需要級聯刪除）

## 5. 順序圖設計原則

### 5.1 職責分離
每個層級都有明確的職責：
- Server API Handler：處理HTTP請求，驗證權限
- Service：執行業務邏輯，協調多個Repository
- Repository：封裝資料存取操作

### 5.2 錯誤傳播
錯誤從底層向上層傳播，每層都有適當的錯誤處理

### 5.3 事務一致性
涉及多個資料表的操作考慮事務的原子性

## 6. 實作考量

### 6.1 程式碼組織
順序圖指導了程式碼的組織結構，確保：
- 方法的參數和返回值設計
- 異常處理機制
- 物件間的依賴關係

### 6.2 測試策略
順序圖為單元測試和整合測試提供了清晰的測試場景

### 6.3 API設計
順序圖確保了RESTful API的一致性和完整性

## 7. 下一步驟

有了完整的順序圖設計，我們可以：
1. 開始詳細的程式碼實作
2. 建立對應的測試案例
3. 實作 Nuxt.js Server API 端點
4. 建立資料庫連接和操作邏輯
