# Aotter-Wow 評價網站 - 類別圖設計

## 1. 類別圖概述

類別圖展示了系統中各個類別的結構、屬性、方法以及它們之間的關係。本設計遵循分層架構原則，將類別分為領域模型、服務層、資料存取層和控制層。

## 2. 領域模型類別圖

### 2.1 核心實體類別

```mermaid
classDiagram
    class User {
        -id: number
        -username: string
        -email: string
        -passwordHash: string
        -userType: UserType
        -joinDate: Date
        -createdAt: Date
        -updatedAt: Date
        +constructor(username: string, email: string, password: string)
        +validatePassword(password: string): boolean
        +isAdmin(): boolean
        +getProfile(): UserProfile
        +updateProfile(profile: UserProfile): void
    }

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
        +constructor(title: string, content: string, authorId: number, categoryId: number)
        +validate(): boolean
        +incrementWowCount(): void
        +getWowCount(): number
        +isAuthor(userId: number): boolean
        +getSummary(): string
    }

    class Category {
        -id: number
        -name: string
        -description: string
        -createdAt: Date
        +constructor(name: string, description: string)
        +validate(): boolean
        +getPostCount(): number
    }

    class Wow {
        -id: number
        -userId: number
        -postId: number
        -wowDate: Date
        +constructor(userId: number, postId: number)
        +validate(): boolean
        +isValidCombination(userId: number, postId: number): boolean
    }

    class UserType {
        <<enumeration>>
        USER
        ADMIN
    }

    %% 關係
    User "1" -- "0..*" Post : "authors"
    User "1" -- "0..*" Wow : "gives"
    Post "1" -- "0..*" Wow : "receives"
    Category "1" -- "0..*" Post : "categorizes"
    User "1" -- "1" UserType : "has_type"
```

### 2.2 值物件類別

```mermaid
classDiagram
    class UserProfile {
        <<value object>>
        +username: string
        +email: string
        +joinDate: Date
        +totalPosts: number
        +totalWowsReceived: number
        +totalWowsGiven: number
        +constructor(user: User)
        +validate(): boolean
    }

    class PostContent {
        <<value object>>
        +title: string
        +content: string
        +publishDate: Date
        +category: string
        +constructor(title: string, content: string)
        +validate(): boolean
        +getSummary(maxLength: number): string
    }

    class WowStats {
        <<value object>>
        +count: number
        +lastWowDate: Date
        +topWowPosts: Post[]
        +constructor(posts: Post[])
        +calculateStats(): void
    }
```

## 3. 服務層類別圖

### 3.1 業務服務類別

```mermaid
classDiagram
    class UserService {
        -userRepository: UserRepository
        +constructor(userRepository: UserRepository)
        +registerUser(userData: RegisterRequest): Promise~User~
        +authenticateUser(username: string, password: string): Promise~User~
        +getUserProfile(userId: number): Promise~UserProfile~
        +updateUserProfile(userId: number, profile: UserProfile): Promise~void~
        +getUserStats(userId: number): Promise~UserStats~
        -hashPassword(password: string): string
        -validateUserData(userData: RegisterRequest): void
    }

    class PostService {
        -postRepository: PostRepository
        -categoryRepository: CategoryRepository
        +constructor(postRepo: PostRepository, categoryRepo: CategoryRepository)
        +createPost(postData: CreatePostRequest, authorId: number): Promise~Post~
        +getPost(postId: number): Promise~Post~
        +getAllPosts(pagination: Pagination): Promise~Post[]~
        +getPostsByCategory(categoryId: number): Promise~Post[]~
        +getTopWowPosts(limit: number): Promise~Post[]~
        +updatePost(postId: number, updateData: UpdatePostRequest): Promise~void~
        +deletePost(postId: number, userId: number): Promise~void~
        +searchPosts(keyword: string, filters: SearchFilters): Promise~Post[]~
        -validatePostData(postData: CreatePostRequest): void
    }

    class WowService {
        -wowRepository: WowRepository
        -postRepository: PostRepository
        +constructor(wowRepo: WowRepository, postRepo: PostRepository)
        +giveWow(userId: number, postId: number): Promise~Wow~
        +getWowsByPost(postId: number): Promise~Wow[]~
        +getWowsByUser(userId: number): Promise~Wow[]~
        +hasUserWowedPost(userId: number, postId: number): Promise~boolean~
        +getWowStats(postId: number): Promise~WowStats~
        -validateWowRules(userId: number, postId: number): Promise~void~
        -checkDuplicateWow(userId: number, postId: number): Promise~boolean~
        -checkSelfWow(userId: number, postId: number): Promise~boolean~
    }

    class CategoryService {
        -categoryRepository: CategoryRepository
        +constructor(categoryRepository: CategoryRepository)
        +getAllCategories(): Promise~Category[]~
        +getCategory(categoryId: number): Promise~Category~
        +createCategory(categoryData: CreateCategoryRequest): Promise~Category~
        +getCategoryStats(categoryId: number): Promise~CategoryStats~
        -validateCategoryData(categoryData: CreateCategoryRequest): void
    }
```

### 3.2 請求/回應 DTO 類別

```mermaid
classDiagram
    class RegisterRequest {
        <<DTO>>
        +username: string
        +email: string
        +password: string
        +confirmPassword: string
        +validate(): boolean
    }

    class LoginRequest {
        <<DTO>>
        +username: string
        +password: string
        +validate(): boolean
    }

    class CreatePostRequest {
        <<DTO>>
        +title: string
        +content: string
        +categoryId: number
        +validate(): boolean
    }

    class UpdatePostRequest {
        <<DTO>>
        +title?: string
        +content?: string
        +categoryId?: number
        +validate(): boolean
    }

    class SearchFilters {
        <<DTO>>
        +categoryId?: number
        +sortBy?: SortOption
        +dateFrom?: Date
        +dateTo?: Date
        +minWowCount?: number
    }

    class Pagination {
        <<DTO>>
        +page: number
        +limit: number
        +offset: number
        +constructor(page: number, limit: number)
        +validate(): boolean
    }

    class ApiResponse~T~ {
        <<DTO>>
        +success: boolean
        +data?: T
        +message: string
        +error?: ErrorDetails
        +constructor(success: boolean, data?: T, message?: string)
        +static success(data: T, message?: string): ApiResponse~T~
        +static error(message: string, error?: ErrorDetails): ApiResponse~T~
    }
```

## 4. 資料存取層類別圖

### 4.1 Repository 介面

```mermaid
classDiagram
    class IUserRepository {
        <<interface>>
        +findById(id: number): Promise~User | null~
        +findByUsername(username: string): Promise~User | null~
        +findByEmail(email: string): Promise~User | null~
        +create(user: User): Promise~User~
        +update(user: User): Promise~void~
        +delete(id: number): Promise~void~
        +exists(username: string, email: string): Promise~boolean~
    }

    class IPostRepository {
        <<interface>>
        +findById(id: number): Promise~Post | null~
        +findAll(pagination: Pagination): Promise~Post[]~
        +findByAuthor(authorId: number): Promise~Post[]~
        +findByCategory(categoryId: number): Promise~Post[]~
        +findTopWow(limit: number): Promise~Post[]~
        +search(keyword: string, filters: SearchFilters): Promise~Post[]~
        +create(post: Post): Promise~Post~
        +update(post: Post): Promise~void~
        +delete(id: number): Promise~void~
        +incrementWowCount(postId: number): Promise~void~
    }

    class IWowRepository {
        <<interface>>
        +findById(id: number): Promise~Wow | null~
        +findByUser(userId: number): Promise~Wow[]~
        +findByPost(postId: number): Promise~Wow[]~
        +findByUserAndPost(userId: number, postId: number): Promise~Wow | null~
        +create(wow: Wow): Promise~Wow~
        +delete(id: number): Promise~void~
        +count(postId: number): Promise~number~
        +exists(userId: number, postId: number): Promise~boolean~
    }

    class ICategoryRepository {
        <<interface>>
        +findById(id: number): Promise~Category | null~
        +findAll(): Promise~Category[]~
        +findByName(name: string): Promise~Category | null~
        +create(category: Category): Promise~Category~
        +update(category: Category): Promise~void~
        +delete(id: number): Promise~void~
        +getPostCount(categoryId: number): Promise~number~
    }
```

### 4.2 Repository 實作類別

```mermaid
classDiagram
    class UserRepository {
        -db: Database
        +constructor(database: Database)
        +findById(id: number): Promise~User | null~
        +findByUsername(username: string): Promise~User | null~
        +findByEmail(email: string): Promise~User | null~
        +create(user: User): Promise~User~
        +update(user: User): Promise~void~
        +delete(id: number): Promise~void~
        +exists(username: string, email: string): Promise~boolean~
        -mapRowToUser(row: any): User
        -mapUserToRow(user: User): any
    }

    class PostRepository {
        -db: Database
        +constructor(database: Database)
        +findById(id: number): Promise~Post | null~
        +findAll(pagination: Pagination): Promise~Post[]~
        +findByAuthor(authorId: number): Promise~Post[]~
        +findByCategory(categoryId: number): Promise~Post[]~
        +findTopWow(limit: number): Promise~Post[]~
        +search(keyword: string, filters: SearchFilters): Promise~Post[]~
        +create(post: Post): Promise~Post~
        +update(post: Post): Promise~void~
        +delete(id: number): Promise~void~
        +incrementWowCount(postId: number): Promise~void~
        -mapRowToPost(row: any): Post
        -mapPostToRow(post: Post): any
        -buildSearchQuery(keyword: string, filters: SearchFilters): string
    }

    class WowRepository {
        -db: Database
        +constructor(database: Database)
        +findById(id: number): Promise~Wow | null~
        +findByUser(userId: number): Promise~Wow[]~
        +findByPost(postId: number): Promise~Wow[]~
        +findByUserAndPost(userId: number, postId: number): Promise~Wow | null~
        +create(wow: Wow): Promise~Wow~
        +delete(id: number): Promise~void~
        +count(postId: number): Promise~number~
        +exists(userId: number, postId: number): Promise~boolean~
        -mapRowToWow(row: any): Wow
        -mapWowToRow(wow: Wow): any
    }

    class CategoryRepository {
        -db: Database
        +constructor(database: Database)
        +findById(id: number): Promise~Category | null~
        +findAll(): Promise~Category[]~
        +findByName(name: string): Promise~Category | null~
        +create(category: Category): Promise~Category~
        +update(category: Category): Promise~void~
        +delete(id: number): Promise~void~
        +getPostCount(categoryId: number): Promise~number~
        -mapRowToCategory(row: any): Category
        -mapCategoryToRow(category: Category): any
    }

    %% 實作關係
    UserRepository ..|> IUserRepository : "implements"
    PostRepository ..|> IPostRepository : "implements"
    WowRepository ..|> IWowRepository : "implements"
    CategoryRepository ..|> ICategoryRepository : "implements"
```

## 5. 控制層類別圖

### 5.1 控制器類別

```mermaid
classDiagram
    class UserController {
        -userService: UserService
        +constructor(userService: UserService)
        +register(req: Request, res: Response): Promise~void~
        +login(req: Request, res: Response): Promise~void~
        +logout(req: Request, res: Response): Promise~void~
        +refreshToken(req: Request, res: Response): Promise~void~
        +getProfile(req: Request, res: Response): Promise~void~
        +updateProfile(req: Request, res: Response): Promise~void~
        +getUserStats(req: Request, res: Response): Promise~void~
        -validateJWT(req: Request): User
        -handleError(res: Response, error: Error): void
    }

    class PostController {
        -postService: PostService
        +constructor(postService: PostService)
        +createPost(req: Request, res: Response): Promise~void~
        +getPost(req: Request, res: Response): Promise~void~
        +getAllPosts(req: Request, res: Response): Promise~void~
        +getPostsByCategory(req: Request, res: Response): Promise~void~
        +getTopWowPosts(req: Request, res: Response): Promise~void~
        +updatePost(req: Request, res: Response): Promise~void~
        +deletePost(req: Request, res: Response): Promise~void~
        +searchPosts(req: Request, res: Response): Promise~void~
        -validatePostAccess(postId: number, userId: number): Promise~boolean~
        -handleError(res: Response, error: Error): void
    }

    class WowController {
        -wowService: WowService
        +constructor(wowService: WowService)
        +giveWow(req: Request, res: Response): Promise~void~
        +getWowsByPost(req: Request, res: Response): Promise~void~
        +getWowsByUser(req: Request, res: Response): Promise~void~
        +getWowStats(req: Request, res: Response): Promise~void~
        -validateWowRequest(req: Request): WowRequest
        -handleError(res: Response, error: Error): void
    }

    class CategoryController {
        -categoryService: CategoryService
        +constructor(categoryService: CategoryService)
        +getAllCategories(req: Request, res: Response): Promise~void~
        +getCategory(req: Request, res: Response): Promise~void~
        +createCategory(req: Request, res: Response): Promise~void~
        +getCategoryStats(req: Request, res: Response): Promise~void~
        -validateAdminAccess(req: Request): void
        -handleError(res: Response, error: Error): void
    }

    class AdminController {
        -postService: PostService
        -userService: UserService
        +constructor(postService: PostService, userService: UserService)
        +getAllPostsForAdmin(req: Request, res: Response): Promise~void~
        +deletePost(req: Request, res: Response): Promise~void~
        +getSystemStats(req: Request, res: Response): Promise~void~
        +manageUser(req: Request, res: Response): Promise~void~
        -validateAdminAccess(req: Request): void
        -handleError(res: Response, error: Error): void
    }

    %% 定義服務類別
    class UserService {
        +register(userData): Promise~User~
        +login(credentials): Promise~LoginResult~
        +getUserById(id): Promise~User~
        +updateUser(id, data): Promise~User~
        +getUserStats(id): Promise~UserStats~
    }

    class PostService {
        +createPost(postData): Promise~Post~
        +getPostById(id): Promise~Post~
        +getAllPosts(): Promise~Post[]~
        +getPostsByCategory(categoryId): Promise~Post[]~
        +updatePost(id, data): Promise~Post~
        +deletePost(id): Promise~void~
        +searchPosts(query): Promise~Post[]~
    }

    class WowService {
        +giveWow(userId, postId): Promise~Wow~
        +getWowsByPost(postId): Promise~Wow[]~
        +getWowsByUser(userId): Promise~Wow[]~
        +getWowStats(): Promise~WowStats~
    }

    class CategoryService {
        +getAllCategories(): Promise~Category[]~
        +getCategoryById(id): Promise~Category~
        +createCategory(data): Promise~Category~
        +getCategoryStats(id): Promise~CategoryStats~
    }

    %% 定義數據類型
    class WowRequest {
        +userId: number
        +postId: number
    }

    %% 依賴關係
    UserController --> UserService : uses
    PostController --> PostService : uses
    WowController --> WowService : uses
    CategoryController --> CategoryService : uses
    AdminController --> PostService : uses
    AdminController --> UserService : uses
    WowController --> WowRequest : returns
```

## 6. 中介軟體類別圖

```mermaid
classDiagram
    class AuthMiddleware {
        +static requireAuth(req: Request, res: Response, next: NextFunction): void
        +static requireAdmin(req: Request, res: Response, next: NextFunction): void
        +static optionalAuth(req: Request, res: Response, next: NextFunction): void
        -static validateJWT(token: string): User | null
        -static extractTokenFromHeader(req: Request): string | null
        -static sendUnauthorized(res: Response): void
    }

    class JWTService {
        +static generateAccessToken(user: User): string
        +static generateRefreshToken(user: User): string
        +static verifyAccessToken(token: string): User | null
        +static verifyRefreshToken(token: string): User | null
        +static revokeRefreshToken(token: string): void
        +static isTokenBlacklisted(token: string): boolean
        -static privateKey: string
        -static publicKey: string
    }

    class ValidationMiddleware {
        +static validateRegister(req: Request, res: Response, next: NextFunction): void
        +static validateLogin(req: Request, res: Response, next: NextFunction): void
        +static validatePost(req: Request, res: Response, next: NextFunction): void
        +static validateWow(req: Request, res: Response, next: NextFunction): void
        -static sendValidationError(res: Response, errors: ValidationError[]): void
    }

    class ErrorMiddleware {
        +static handle(error: Error, req: Request, res: Response, next: NextFunction): void
        +static notFound(req: Request, res: Response): void
        -static logError(error: Error): void
        -static getErrorMessage(error: Error): string
    }
```

## 7. 資料庫連接類別圖

```mermaid
classDiagram
    class Database {
        -connection: sqlite3.Database
        -isConnected: boolean
        +constructor(dbPath: string)
        +connect(): Promise~void~
        +disconnect(): Promise~void~
        +query(sql: string, params?: any[]): Promise~any[]~
        +run(sql: string, params?: any[]): Promise~RunResult~
        +get(sql: string, params?: any[]): Promise~any~
        +beginTransaction(): Promise~void~
        +commit(): Promise~void~
        +rollback(): Promise~void~
        -handleError(error: Error): void
    }

    class DatabaseInitializer {
        -db: Database
        +constructor(database: Database)
        +initialize(): Promise~void~
        +createTables(): Promise~void~
        +createIndexes(): Promise~void~
        +seedData(): Promise~void~
        +dropTables(): Promise~void~
        -readSqlFile(filename: string): string
    }

    class Migration {
        +version: string
        +description: string
        +up(db: Database): Promise~void~
        +down(db: Database): Promise~void~
    }

    class MigrationRunner {
        -db: Database
        -migrations: Migration[]
        +constructor(database: Database, migrations: Migration[])
        +runMigrations(): Promise~void~
        +rollbackMigration(version: string): Promise~void~
        +getCurrentVersion(): Promise~string~
        -createMigrationTable(): Promise~void~
        -recordMigration(version: string): Promise~void~
    }
```

## 8. 工具類別圖

```mermaid
classDiagram
    class PasswordHelper {
        +static hash(password: string): Promise~string~
        +static verify(password: string, hash: string): Promise~boolean~
        +static generateSalt(): string
        -static validatePassword(password: string): boolean
    }

    class ValidationHelper {
        +static validateEmail(email: string): boolean
        +static validateUsername(username: string): boolean
        +static validatePassword(password: string): boolean
        +static sanitizeInput(input: string): string
        +static escapeHtml(html: string): string
    }

    class DateHelper {
        +static formatDate(date: Date): string
        +static parseDate(dateString: string): Date
        +static isValidDate(date: any): boolean
        +static getRelativeTime(date: Date): string
    }

    class ResponseHelper {
        +static success~T~(data: T, message?: string): ApiResponse~T~
        +static error(message: string, details?: any): ApiResponse~null~
        +static paginated~T~(data: T[], total: number, page: number, limit: number): PaginatedResponse~T~
    }
```

## 9. 異常處理類別圖

```mermaid
classDiagram
    class AppError {
        +message: string
        +statusCode: number
        +isOperational: boolean
        +constructor(message: string, statusCode: number)
    }

    class ValidationError {
        +field: string
        +message: string
        +value: any
        +constructor(field: string, message: string, value?: any)
    }

    class NotFoundError {
        +constructor(resource: string, id: any)
    }

    class UnauthorizedError {
        +constructor(message?: string)
    }

    class DuplicateError {
        +field: string
        +value: any
        +constructor(field: string, value: any)
    }

    class BusinessRuleError {
        +rule: string
        +constructor(rule: string, message: string)
    }

    %% 繼承關係
    ValidationError --|> AppError : "extends"
    NotFoundError --|> AppError : "extends"
    UnauthorizedError --|> AppError : "extends"
    DuplicateError --|> AppError : "extends"
    BusinessRuleError --|> AppError : "extends"
```

## 10. 設計模式應用

### 10.1 使用的設計模式

**Repository Pattern**

- 封裝資料存取邏輯
- 提供統一的資料操作介面
- 便於測試和替換資料來源

**Service Layer Pattern**

- 封裝業務邏輯
- 協調多個Repository的操作
- 提供事務邊界

**DTO Pattern**

- 封裝資料傳輸
- 驗證輸入資料
- 避免直接暴露領域模型

**Factory Pattern**

- Database連接的建立
- Error物件的創建
- Response物件的生成

**Strategy Pattern**

- 搜尋算法的選擇
- 排序方式的切換
- 驗證規則的應用

### 10.2 SOLID 原則應用

**Single Responsibility Principle (SRP)**

- 每個類別都有單一職責
- Controller只處理HTTP相關邏輯
- Service只處理業務邏輯
- Repository只處理資料存取

**Open/Closed Principle (OCP)**

- 使用介面定義契約
- 便於擴展新功能
- 無需修改現有程式碼

**Liskov Substitution Principle (LSP)**

- Repository介面的實作可以互相替換
- 不同的資料庫實作遵循相同介面

**Interface Segregation Principle (ISP)**

- 介面設計精簡，只包含必要方法
- 避免強迫實作不需要的方法

**Dependency Inversion Principle (DIP)**

- 高層模組不依賴低層模組
- 都依賴於抽象介面
- 使用依賴注入

## 11. 效能考量

### 11.1 快取策略

- Service層實作適當的快取邏輯
- Repository層提供批次操作方法
- 避免重複查詢

### 11.2 資料庫最佳化

- 使用適當的索引
- 避免N+1查詢問題
- 實作分頁機制

### 11.3 記憶體管理

- 適當的物件生命週期管理
- 避免記憶體洩漏
- 使用物件池技術

## 12. 測試考量

### 12.1 單元測試

- 每個類別都可以獨立測試
- 使用Mock物件模擬依賴
- 測試覆蓋率目標 > 80%

### 12.2 整合測試

- 測試Service和Repository的整合
- 測試資料庫操作的正確性
- 測試API端點的完整流程

### 12.3 測試工具

- Jest: 單元測試框架
- Supertest: API測試工具
- sqlite3: 測試資料庫

## 13. 下一階段

完成類別圖設計後，接下來將進行：

1. 程式碼實作和專案建立
2. 單元測試編寫
3. 資料庫初始化腳本
4. API端點實作
5. 前端介面開發
