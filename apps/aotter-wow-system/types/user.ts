// 使用者角色枚舉
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

// 使用者個人資料
export interface UserProfile {
  displayName?: string;
  bio?: string;
  avatar?: string;
  location?: string;
  website?: string;
}

// 完整使用者資料
export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  profile: UserProfile;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 使用者註冊資料
export interface UserRegistration {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

// 使用者登入資料
export interface UserLogin {
  email: string;
  password: string;
}

// 使用者公開資訊（用於回應）
export interface UserPublic {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 使用者更新資料
export interface UserUpdate {
  username?: string;
  email?: string;
  profile?: Partial<UserProfile>;
}

// 創建使用者的資料（內部使用）
export interface CreateUserData {
  username: string;
  email: string;
  passwordHash: string;
  role?: UserRole;
  profile?: UserProfile;
}

// JWT 載荷
export interface JwtPayload {
  userId: string;
  username: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

// 使用者統計資料
export interface UserStats {
  id: string;
  username: string;
  role: UserRole;
  createdAt: Date;
  totalPosts: number;
  totalWows: number;
}