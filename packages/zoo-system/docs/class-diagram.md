# 類別圖設計

## UML 類別圖

```mermaid
classDiagram
    %% 核心實體類別
    class Animal {
        -id: string
        -name: string
        -species: string
        -age: number
        -description: string
        -wowGenerationAbility: number
        -skills: Skill
        -location: Location
        -performances: Performance
        
        +performSkill(skill: Skill): Performance
        +performRandomSkill(): Performance
        +addSkill(skill: Skill): void
        +removeSkill(skillId: string): boolean
        +isPerforming(): boolean
        +getCurrentPerformance(): Performance
        +updateInfo(name: string, description: string): void
        +getId(): string
        +getName(): string
        +getSkills(): Skill
    }
    
    class Visitor {
        -id: string
        -name: string
        -visitDate: Date
        -totalWowPoints: number
        -wowCollection: WowCollection
        
        +rateWow(animal: Animal, intensity: number, category: WowCategory): Wow
        +shareWow(wow: Wow): ShareLink
        +viewAnimal(animalId: string): Animal
        +getWowCollection(): WowCollection
        +getTotalWowPoints(): number
        +addWowPoints(points: number): void
    }
    
    class Wow {
        -id: string
        -timestamp: Date
        -animal: Animal
        -visitor: Visitor
        -location: Location
        -category: WowCategory
        -intensity: number
        -description: string
        -performance: Performance
        
        +generateShareLink(): string
        +isRatedBy(visitor: Visitor): boolean
        +getDetails(): WowDetails
        +calculateWowPoints(): number
        +isValid(): boolean
    }
    
    class Performance {
        -id: string
        -animal: Animal
        -skill: Skill
        -startTime: Date
        -endTime: Date | null
        -duration: number
        -location: Location
        -isActiveFlag: boolean
        
        +start(): void
        +end(): void
        +isActive(): boolean
        +getActualDuration(): number
    }
    
    class Skill {
        -id: string
        -name: string
        -description: string
        -difficulty: number
        -category: SkillCategory
        
        +getId(): string
        +getName(): string
        +getDifficulty(): number
    }
    
    class Location {
        -id: string
        -name: string
        -description: string
        -animals: Animal
        
        +addAnimal(animal: Animal): void
        +removeAnimal(animalId: string): boolean
        +getAnimals(): Animal
    }
    
    %% 管理類別
    class WowCollection {
        -visitor: Visitor
        -wowRecords: Wow
        -totalPoints: number
        
        +addWow(wow: Wow): void
        +getWowsByCategory(category: WowCategory): Wow
        +getWowsByAnimal(animal: Animal): Wow
        +calculateTotalPoints(): number
    }
    
    class ShareLink {
        -id: string
        -wow: Wow
        -sharedBy: Visitor
        -createdAt: Date
        -url: string
        -viewCount: number
        
        +generateUrl(): string
        +incrementViewCount(): void
        +getWowDetails(): Wow
    }
    
    %% 服務類別
    class WowManager {
        -wowRecords: Wow
        -shareLinks: ShareLink
        
        +createWow(animal: Animal, visitor: Visitor, intensity: number, category: WowCategory): Wow
        +getWowsByAnimal(animalId: string): Wow
        +getWowsByVisitor(visitorId: string): Wow
        +createShareLink(wow: Wow): ShareLink
    }
    
    class AnimalManager {
        -animals: Animal
        -performanceScheduler: PerformanceScheduler
        
        +addAnimal(animal: Animal): void
        +removeAnimal(animalId: string): boolean
        +getAnimal(animalId: string): Animal
        +startRandomPerformance(): Performance
    }
    
    class VisitorService {
        -visitors: Visitor
        -leaderboard: Leaderboard
        
        +createVisitor(name: string): Visitor
        +getVisitor(visitorId: string): Visitor
        +updateLeaderboard(): void
    }
    
    class Leaderboard {
        -visitorRankings: VisitorRanking
        -animalRankings: AnimalRanking
        -lastUpdated: Date
        
        +updateVisitorRankings(): void
        +updateAnimalRankings(): void
        +getTopVisitors(limit: number): VisitorRanking
        +getTopAnimals(limit: number): AnimalRanking
    }
    
    class PerformanceScheduler {
        -activePerformances: Performance
        -animals: Animal
        
        +scheduleRandomPerformance(): void
        +startPerformance(animal: Animal, skill: Skill): Performance
        +isAnimalPerforming(animal: Animal): boolean
    }
    
    %% 列舉
    class WowCategory {
        <<enumeration>>
        CUTE
        SKILL
        INTERACTION
        SURPRISE
    }
    
    class SkillCategory {
        <<enumeration>>
        ACROBATIC
        CUTE
        INTELLIGENT
        SOCIAL
    }
    
    %% 關係
    Animal "1" -- "0..*" Skill : "has"
    Animal "1" -- "0..*" Performance : "performs"
    Animal "0..*" -- "1" Location : "located_at"
    
    Visitor "1" -- "1" WowCollection : "has"
    Visitor "1" -- "0..*" Wow : "rates"
    Visitor "1" -- "0..*" ShareLink : "shares"
    
    Wow "0..*" -- "1" Animal : "about"
    Wow "0..*" -- "1" Visitor : "rated_by"
    Wow "0..*" -- "1" Performance : "for"
    Wow "0..*" -- "1" Location : "at"
    Wow "0..*" -- "1" WowCategory : "categorized_as"
    
    Performance "0..*" -- "1" Animal : "performed_by"
    Performance "0..*" -- "1..*" Skill : "uses"
    Performance "0..*" -- "1" Location : "at"
    
    Skill "0..*" -- "1" SkillCategory : "categorized_as"
    
    WowCollection "1" -- "0..*" Wow : "contains"
    ShareLink "0..*" -- "1" Wow : "shares"
    
    WowManager "1" -- "0..*" Wow : "manages"
    WowManager "1" -- "0..*" ShareLink : "manages"
    AnimalManager "1" -- "0..*" Animal : "manages"
    AnimalManager "1" -- "1" PerformanceScheduler : "uses"
    VisitorService "1" -- "0..*" Visitor : "manages"
    VisitorService "1" -- "1" Leaderboard : "updates"
    PerformanceScheduler "1" -- "0..*" Performance : "schedules"
```

## 核心實體類別

### 1. Animal（動物）

```typescript
class Animal {
    private id: string;
    private name: string;
    private species: string;
    private age: number;
    private description: string;
    private wowGenerationAbility: number; // 1-10
    private skills: Skill[];
    private location: Location;
    
    public performSkill(skill: Skill): Performance;
    public generateWow(): void;
    public addSkill(skill: Skill): void;
    public removeSkill(skillId: string): boolean;
    public getSkills(): Skill[];
    public updateInfo(name: string, description: string): void;
}
```

### 2. Visitor（遊客）

```typescript
class Visitor {
    private id: string;
    private name: string;
    private visitDate: Date;
    private totalWowPoints: number;
    private wowCollection: WowCollection;
    
    public rateWow(animal: Animal, intensity: number, category: WowCategory): Wow;
    public shareWow(wow: Wow): ShareLink;
    public viewAnimal(animalId: string): Animal;
    public getWowCollection(): WowCollection;
    public getTotalWowPoints(): number;
}
```

### 3. Wow（驚嘆記錄）

```typescript
class Wow {
    private id: string;
    private timestamp: Date;
    private animal: Animal;
    private visitor: Visitor;
    private location: Location;
    private category: WowCategory;
    private intensity: number; // 1-10
    private description: string;
    private performance: Performance;
    
    public getId(): string;
    public getDetails(): WowDetails;
    public generateShareLink(): string;
    public isRatedBy(visitor: Visitor): boolean;
}
```

### 4. WowCategory（Wow分類）

```typescript
enum WowCategory {
    CUTE = "可愛類",        // 可愛類
    SKILL = "技能類",       // 技能類
    INTERACTION = "互動類", // 互動類
    SURPRISE = "驚喜類"     // 驚喜類
}
```

### 5. Skill（技能）

```typescript
class Skill {
    private id: string;
    private name: string;
    private description: string;
    private difficulty: number; // 1-10
    private category: SkillCategory;
    
    public perform(): Performance;
    public getDetails(): SkillDetails;
}
```

### 6. Performance（表演）

```typescript
class Performance {
    private id: string;
    private animal: Animal;
    private skill: Skill;
    private startTime: Date;
    private duration: number;
    private location: Location;
    private isActive: boolean;
    private wowRecords: Wow[];
    
    public start(): void;
    public end(): void;
    public addWowRecord(wow: Wow): void;
    public canBeRatedBy(visitor: Visitor): boolean;
}
```

### 7. Location（地點）

```typescript
class Location {
    private id: string;
    private name: string;
    private description: string;
    private animals: Animal[];
    
    public addAnimal(animal: Animal): void;
    public removeAnimal(animalId: string): boolean;
    public getAnimals(): Animal[];
}
```

## 集合和管理類別

### 8. WowCollection（Wow收集記錄）

```typescript
class WowCollection {
    private visitor: Visitor;
    private wowRecords: Wow[];
    private totalPoints: number;
    
    public addWow(wow: Wow): void;
    public getWowsByCategory(category: WowCategory): Wow[];
    public getWowsByAnimal(animal: Animal): Wow[];
    public calculateTotalPoints(): number;
    public getStatistics(): CollectionStats;
}
```

### 9. ShareLink（分享連結）

```typescript
class ShareLink {
    private id: string;
    private wow: Wow;
    private sharedBy: Visitor;
    private createdAt: Date;
    private url: string;
    private viewCount: number;
    
    public generateUrl(): string;
    public incrementViewCount(): void;
    public getWowDetails(): Wow;
}
```

## 服務和管理類別

### 10. WowManager（Wow管理器）

```typescript
class WowManager {
    private wowRecords: Wow[];
    private shareLinks: ShareLink[];
    
    public createWow(animal: Animal, visitor: Visitor, intensity: number, category: WowCategory): Wow;
    public getWowsByAnimal(animalId: string): Wow[];
    public getWowsByVisitor(visitorId: string): Wow[];
    public generateStatistics(): WowStatistics;
    public createShareLink(wow: Wow): ShareLink;
    public getSharedWow(linkId: string): Wow;
}
```

### 11. AnimalManager（動物管理器）

```typescript
class AnimalManager {
    private animals: Animal[];
    private performanceScheduler: PerformanceScheduler;
    
    public addAnimal(animal: Animal): void;
    public removeAnimal(animalId: string): boolean;
    public updateAnimal(animal: Animal): void;
    public getAnimal(animalId: string): Animal | null;
    public getAllAnimals(): Animal[];
    public startRandomPerformance(): Performance;
}
```

### 12. VisitorService（訪客服務）

```typescript
class VisitorService {
    private visitors: Visitor[];
    private leaderboard: Leaderboard;
    
    public createVisitor(name: string): Visitor;
    public getVisitor(visitorId: string): Visitor | null;
    public updateLeaderboard(): void;
    public getVisitorRanking(visitor: Visitor): number;
}
```

### 13. Leaderboard（排行榜）

```typescript
class Leaderboard {
    private visitorRankings: VisitorRanking[];
    private animalRankings: AnimalRanking[];
    private lastUpdated: Date;
    
    public updateVisitorRankings(): void;
    public updateAnimalRankings(): void;
    public getTopVisitors(limit: number): VisitorRanking[];
    public getTopAnimals(limit: number): AnimalRanking[];
    public getVisitorRank(visitor: Visitor): number;
    public getAnimalRank(animal: Animal): number;
}
```

### 14. PerformanceScheduler（表演排程器）

```typescript
class PerformanceScheduler {
    private activePerformances: Performance[];
    private animals: Animal[];
    
    public scheduleRandomPerformance(): void;
    public startPerformance(animal: Animal, skill: Skill): Performance;
    public endPerformance(performanceId: string): void;
    public getActivePerformances(): Performance[];
    public isAnimalPerforming(animal: Animal): boolean;
}
```

## 類別關係

### 繼承關係
- 無明顯繼承需求

### 組合關係
- Visitor 組合 WowCollection
- Animal 組合 Skill[]
- Performance 組合 Animal, Skill, Location
- WowManager 組合 Wow[], ShareLink[]

### 聚合關係
- Location 聚合 Animal[]
- Leaderboard 聚合 VisitorRanking[], AnimalRanking[]

### 關聯關係
- Wow 關聯 Animal, Visitor, Performance
- ShareLink 關聯 Wow, Visitor
- Performance 關聯 Animal, Skill, Location

## 關鍵設計原則

1. **單一職責原則：** 每個類別都有明確的職責
2. **開放封閉原則：** 易於擴展新的 Wow 類型和技能
3. **依賴倒置原則：** 高層模組不依賴低層模組的具體實現
4. **介面隔離原則：** 小而專精的介面設計
