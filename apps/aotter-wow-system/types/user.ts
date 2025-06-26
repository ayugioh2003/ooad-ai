// 使用者類型枚舉
export enum UserType {
  REGULAR = 'regular',
  ADMIN = 'admin'
}

// 使用者介面
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  joinDate: Date;
  userType: UserType;
}

// 使用者註冊資料
export interface UserRegistration {
  username: string;
  email: string;
  password: string;
}

// 使用者登入資料
export interface UserLogin {
  email: string;
  password: string;
}

// 使用者公開資訊（不包含密碼）
export interface UserPublic {
  id: number;
  username: string;
  email: string;
  joinDate: Date;
  userType: UserType;
}

// JWT 載荷
export interface JwtPayload {
  userId: number;
  username: string;
  userType: UserType;
  iat?: number;
  exp?: number;
}
