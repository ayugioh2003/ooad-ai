---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Welcome to Slidev
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# open graph
# seoMeta:
#  ogImage: https://cover.sli.dev
---

# 專案文件與 AI

AI 可以寫扣，那也可以寫專案開發的文件吧

<div @click="$slidev.nav.next" class="mt-12 py-1" hover:bg="white op-10">
  Press Space for next page <carbon:arrow-right />
</div>

<div class="abs-br m-6 text-xl">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="slidev-icon-btn">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---

# 動機

<div class="">
  <img src="./assets/2025-06-25-16-48-06.png" class="w-[300px]"/>
</div>

<br/>

- 買了一堂在講 OOAD 的課
- 本來 RD Sharing 時想手動畫圖來講
- 但剛好公司有給 Github Copilot 的 seat
- 那乾脆就兩個混在一起講好了，叫 A幫我幫我畫圖

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/features/slide-scope-style
-->

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---

# 專案的源頭

<img src="./assets/2025-06-26-17-13-07.png" class="w-[300px]" />

甲方/老闆：我想要某個東西，
需求、畫面、程式你都要做好。
東西明天給我，OK 吧

我：...

---

# 軟體開發的生命週期

<div class="relative">

```mermaid
flowchart RL
  subgraph 設計端
    A[需求蒐集] --> B[需求分析]
    B --> C[系統分析]
    C --> D[系統設計]
  end

  subgraph 程式開發端
    E[程式撰寫] --> F[測試]
    F --> G[上線部署]
  end

  D -- 設計文件/規格書 --> E
```

<div class="absolute right-[110px] top-0 border-red-500 border w-[340px] h-[90px]" v-click="2">
</div>

</div>

<div class="flex justify-end" v-click="1">
  <img src="./assets/2025-06-25-18-40-56.png" class="w-[500px]"/>
</div>

---

# 領取 ~~隕石~~ 任務

<img src="./assets/2025-06-26-17-30-49.png" class="w-[300px]" />

老闆：我尾牙猜題活動不小心給錯選項，研發部明年生出一個 Aotter Wow 系統可以吧

研發部：...

---

# 概念發想

能讓使用者發出 Wow 的驚嘆

- 本來想做個可愛動物園系統，讓使用者看到都能 Wow
- 但想不到要怎麼做成程式
- 就魔轉成評價系統，讓使用者可以按 Wow

---

# 名詞介紹

- USE CASE
- OO / OOP
- OOAD

---

# Use Case

<div class="w-[650px]">


```mermaid
flowchart LR
    %% 參與者定義 (左側)
    subgraph Actors ["👥 系統參與者"]
        direction TB
        Guest[("👤 訪客<br/>Guest")]
        User[("👨‍💼 一般使用者<br/>User")]
        Admin[("👨‍💻 管理員<br/>Admin")]
    end
    
    %% 系統邊界與功能分組 (橫向排列)
    subgraph System ["🌟 Aotter-Wow System"]
        direction LR
        
        %% 第一排功能模組
        subgraph Row1 ["上層功能"]
            direction LR
            
            subgraph Auth ["🔐 認證管理"]
                direction TB
                UC001(("UC-001<br/>註冊"))
                UC002(("UC-002<br/>登入"))
                UC003(("UC-003<br/>登出"))
                UC004(("UC-004<br/>個人資料"))
            end
            
            subgraph Content ["📝 內容管理"]
                direction TB
                UC005(("UC-005<br/>發布貼文"))
                UC006(("UC-006<br/>編輯貼文"))
                UC007(("UC-007<br/>刪除貼文"))
            end
        end
        
        %% 第二排功能模組
        subgraph Row2 ["下層功能"]
            direction LR
            
            subgraph Browse ["🔍 內容瀏覽"]
                direction TB
                UC008(("UC-008<br/>瀏覽貼文"))
                UC011(("UC-011<br/>搜尋貼文"))
                UC013(("UC-013<br/>類別瀏覽"))
            end
            
            subgraph Rating ["⭐ 評價系統"]
                direction TB
                UC009(("UC-009<br/>Wow評價"))
                UC010(("UC-010<br/>Wow統計"))
                UC012(("UC-012<br/>排行榜"))
            end
            
            subgraph Management ["⚙️ 系統管理"]
                direction TB
                UC014(("UC-014<br/>管理內容"))
                UC015(("UC-015<br/>系統統計"))
            end
        end
    end
    
    %% 參與者與功能的連接 (簡化線條)
    Actors -.-> Auth
    Actors -.-> Browse
    
    User -.-> Content
    User -.-> Rating
    
    Admin -.-> Management
    
    %% 重要的包含關係
    Content -.->|需要登入| Auth
    Rating -.->|需要登入| Auth
    Management -.->|需要登入| Auth
    
    %% 擴展關係
    Rating -.->|擴展| Browse
```


</div>
---

# OO

名人講 OO

<iframe width="560" height="315" src="https://www.youtube.com/embed/BQtROdysZwc?si=AiaeaErvh1kzHEhB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<!-- 
https://www.youtube.com/watch?v=BQtROdysZwc
-->

---

# OO & OOP (1)

OOP，物件導向程式設計。將程式中的一切視為物件

OOP 概念緣起：Simula, Smalltalk (1969 ~ 1972 Xerox PARC; Alan Kay, etc)

<img src="./assets/2025-06-26-16-42-12.png" class="w-[450px]">

<!-- 
  賈伯斯的 mac 介面聽說偷抄 smalltalk
  https://spectrum.ieee.org/vera-rubin-observatory-first-images
 -->

---

# OO & OOP (2)

<div class="flex gap-20">

<div>
Alan Kay: 我從 Cell 想出了 OOP 這個概念

- 保持狀態
- 從自身或物件接收訊息
- 接收訊息時，將訊息傳給自身或另一個物件
</div>

<img src="./assets/2025-06-27-11-08-15.png" class="w-[150px]" />

</div>



<div class="flex justify-center gap-12 mt-6">
  <div v-click>

  電獺
  - 狀態
    - 員工 xx 人
    - 戰力 xx
  - 能力
    - 辦運動會
    -  <span>比賽</span>

  </div>
  <div v-click>

  雷虎
  - 狀態
    - 員工 oo 人
    - 戰力 oo
  - 能力
    - 比賽

  </div>
</div>

<!-- 
https://www.reddit.com/r/programming/comments/12pr8r/til_alan_kay_a_pioneer_in_developing/
-->

---

# OOAD

物件導向分析、設計大概在 1990 中期發展的，軟體開發、物件導向建模方法論。常使用 UML

<div v-click>

物件導向分析 (靜態)
- 替真實世界建立模型
- 物件被賦予的職責
- 物件可以做哪些事情、可以有什麼狀態
- 常使用類別圖

</div>

<div v-click>

物件導向設計 (動態)
- 如何安排、使用這些物件，來解決真實世界的問題
- 常使用循序圖

</div>


<!-- 
https://en.wikipedia.org/wiki/Object-oriented_analysis_and_design
-->


---

# OOA


<div class="w-[700px]">

```mermaid
classDiagram
    direction LR
    
    %% 左側：使用者相關類別
    class User {
        -id: number
        -username: string
        -email: string
        -passwordHash: string
        -userType: UserType
        -joinDate: Date
        -createdAt: Date
        -updatedAt: Date
        +constructor(username, email, password)
        +validatePassword(password): boolean
        +isAdmin(): boolean
        +getProfile(): UserProfile
        +updateProfile(profile): void
    }

    class UserType {
        <<enumeration>>
        USER
        ADMIN
    }

    %% 中間：內容相關類別
    class Post {
        -id: number
        -title: string
        -content: string
        -authorId: number
        -categoryId: number
        -wowCount: number
        -publishDate: Date
        -createdAt: Date
        -updatedAt: Date
        +constructor(title, content, authorId, categoryId)
        +validate(): boolean
        +incrementWowCount(): void
        +getWowCount(): number
        +isAuthor(userId): boolean
        +getSummary(): string
    }

    class Category {
        -id: number
        -name: string
        -description: string
        -createdAt: Date
        +constructor(name, description)
        +validate(): boolean
        +getPostCount(): number
    }

    %% 右側：評價相關類別
    class Wow {
        -id: number
        -userId: number
        -postId: number
        -wowDate: Date
        +constructor(userId, postId)
        +validate(): boolean
        +isValidCombination(userId, postId): boolean
    }

    %% 關係定義（橫向排列）
    User "1" --o "1" UserType : has_type
    User "1" --o "0..*" Post : authors
    User "1" --o "0..*" Wow : gives
    
    Category "1" --o "0..*" Post : categorizes
    Post "1" --o "0..*" Wow : receives
```


</div>

---

# OOD


<div class="w-[440px]">

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

</div>

---

# 還沒完成的網站 Demo

![](./assets/2025-06-27-10-56-14.png)

---

# 小結

<v-clicks>

- OOAD 感覺比較適合小型的程式開發 (可能是我還沒很懂)
- 可以嘗試建立 project template prompt。可能還需要
  - 網站地圖
  - 線稿圖 (或用 MCP + Figma 幫產 wireframe / mockup)
- 之後試看看 gemini cli 看看，不然要一直確認指令滿麻煩的

</v-clicks>