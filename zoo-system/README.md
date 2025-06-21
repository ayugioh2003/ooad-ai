# 概念動物園 Wow 收集系統

## 系統概觀圖

```mermaid
graph TB
    %% 使用者
    subgraph "使用者 (Users)"
        V[👤 遊客<br/>Visitors]
        A[👨‍💼 管理員<br/>Admins]
    end
    
    %% 核心功能
    subgraph "核心功能 (Core Features)"
        WowSystem[🌟 Wow 收集系統<br/>Wow Collection System]
        AnimalSystem[🐾 動物管理系統<br/>Animal Management]
        PerformanceSystem[🎭 表演系統<br/>Performance System]
    end
    
    %% 遊戲化功能
    subgraph "遊戲化功能 (Gamification)"
        Leaderboard[🏆 排行榜<br/>Leaderboard]
        Sharing[📤 分享功能<br/>Sharing]
        Collection[📚 收集記錄<br/>Collection Records]
    end
    
    %% 資料管理
    subgraph "資料管理 (Data Management)"
        Statistics[📊 統計分析<br/>Statistics]
        Reports[📋 報表系統<br/>Reports]
    end
    
    %% 互動流程
    V --> WowSystem
    V --> AnimalSystem
    V --> PerformanceSystem
    V --> Leaderboard
    V --> Sharing
    V --> Collection
    
    A --> AnimalSystem
    A --> Statistics
    A --> Reports
    
    %% 系統互動
    AnimalSystem --> PerformanceSystem
    PerformanceSystem --> WowSystem
    WowSystem --> Collection
    WowSystem --> Leaderboard
    WowSystem --> Sharing
    WowSystem --> Statistics
    
    %% 自動化流程
    PerformanceSystem -.->|自動觸發| V
    Statistics -.->|即時更新| Leaderboard
```

## 系統特色流程

```mermaid
flowchart LR
    A[動物隨機表演] --> B[遊客觀看]
    B --> C[給予 Wow 評分]
    C --> D[計算點數]
    D --> E[更新收集記錄]
    E --> F[更新排行榜]
    F --> G[可分享給朋友]
    G --> H[激勵更多參與]
    H --> A
    
    style A fill:#ff9999
    style C fill:#99ff99
    style F fill:#9999ff
    style G fill:#ffff99
```

## 系統概述

這是一個以收集遊客「Wow」（驚嘆）為核心的概念動物園系統。遊客可以觀看動物表演，給予評分，收集 Wow 點數，並與其他遊客分享體驗。

## 主要功能

1. **Wow 統計管理** - 收集和分析遊客的驚嘆反應
2. **動物管理** - 管理動物資訊和技能
3. **訪客服務** - 提供遊客互動功能

## 系統特色

- Wow 分類系統（可愛類、技能類、互動類、驚喜類）
- 遊客互動功能（分享、比較）
- 遊戲化元素（點數、排行榜）
- 隨機動物表演系統
- 即時評分機制

## 開發文件

- [需求分析](./docs/requirements.md)
- [類別圖](./docs/class-diagram.md)
- [使用案例](./docs/use-cases.md)
- [系統架構](./docs/architecture.md)
