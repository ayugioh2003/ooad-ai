import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { User, UserPublic, JwtPayload } from '~/types/user';

// 從環境變數或預設值獲取 JWT 密鑰
const getJwtSecret = (): string => {
  return process.env.JWT_SECRET || 'your-secret-key-change-in-production';
};

// 密碼雜湊
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// 驗證密碼
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// 生成 JWT Token
export const generateToken = (user: UserPublic): string => {
  const payload: JwtPayload = {
    userId: user.id,
    username: user.username,
    userType: user.userType
  };

  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: '7d' // 7天過期
  });
};

// 驗證 JWT Token
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

// 從 User 轉換為 UserPublic（移除密碼）
export const toUserPublic = (user: User): UserPublic => {
  const { password, ...publicUser } = user;
  return publicUser;
};

// 驗證 Email 格式
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 驗證密碼強度
export const isValidPassword = (password: string): boolean => {
  // 至少 6 字元
  return password.length >= 6;
};

// 驗證使用者名稱
export const isValidUsername = (username: string): boolean => {
  // 只允許英文、數字、底線，長度 3-20
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};
