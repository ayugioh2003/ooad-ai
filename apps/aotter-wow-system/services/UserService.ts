import { UserRepository } from '~/repositories/UserRepository';
import { hashPassword, verifyPassword, generateToken, toUserPublic, isValidEmail, isValidPassword, isValidUsername } from '~/utils/auth';
import type { User, UserRegistration, UserLogin, UserPublic } from '~/types/user';
import type { ApiResponse } from '~/types/api';

export class UserService {
  private userRepository = new UserRepository();

  // 使用者註冊
  async register(userRegistration: UserRegistration): Promise<ApiResponse<{ user: UserPublic; token: string }>> {
    try {
      // 驗證輸入資料
      const validation = this.validateRegistrationData(userRegistration);
      if (!validation.success) {
        return validation;
      }

      // 檢查 Email 是否已存在
      const emailExists = await this.userRepository.emailExists(userRegistration.email);
      if (emailExists) {
        return {
          success: false,
          error: 'Email 已被使用'
        };
      }

      // 檢查使用者名稱是否已存在
      const usernameExists = await this.userRepository.usernameExists(userRegistration.username);
      if (usernameExists) {
        return {
          success: false,
          error: '使用者名稱已被使用'
        };
      }

      // 雜湊密碼
      const hashedPassword = await hashPassword(userRegistration.password);
      
      // 創建使用者
      const user = await this.userRepository.create({
        ...userRegistration,
        password: hashedPassword
      });

      // 生成 JWT token
      const userPublic = toUserPublic(user);
      const token = generateToken(userPublic);

      return {
        success: true,
        data: {
          user: userPublic,
          token
        },
        message: '註冊成功'
      };

    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: '註冊失敗，請稍後再試'
      };
    }
  }

  // 使用者登入
  async login(userLogin: UserLogin): Promise<ApiResponse<{ user: UserPublic; token: string }>> {
    try {
      // 驗證輸入資料
      if (!userLogin.email || !userLogin.password) {
        return {
          success: false,
          error: 'Email 和密碼為必填欄位'
        };
      }

      if (!isValidEmail(userLogin.email)) {
        return {
          success: false,
          error: 'Email 格式不正確'
        };
      }

      // 查找使用者
      const user = await this.userRepository.findByEmail(userLogin.email);
      if (!user) {
        return {
          success: false,
          error: 'Email 或密碼錯誤'
        };
      }

      // 驗證密碼
      const isPasswordValid = await verifyPassword(userLogin.password, user.passwordHash);
      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Email 或密碼錯誤'
        };
      }

      // 生成 JWT token
      const userPublic = toUserPublic(user);
      const token = generateToken(userPublic);

      return {
        success: true,
        data: {
          user: userPublic,
          token
        },
        message: '登入成功'
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: '登入失敗，請稍後再試'
      };
    }
  }

  // 根據 ID 獲取使用者資料
  async getUserById(id: number): Promise<ApiResponse<UserPublic>> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        return {
          success: false,
          error: '使用者不存在'
        };
      }

      return {
        success: true,
        data: toUserPublic(user)
      };

    } catch (error) {
      console.error('Get user error:', error);
      return {
        success: false,
        error: '獲取使用者資料失敗'
      };
    }
  }

  // 更新使用者資料
  async updateUser(id: number, updates: Partial<User>): Promise<ApiResponse<UserPublic>> {
    try {
      // 如果要更新密碼，需要雜湊
      if (updates.password) {
        if (!isValidPassword(updates.password)) {
          return {
            success: false,
            error: '密碼至少需要 6 個字元'
          };
        }
        updates.password = await hashPassword(updates.password);
      }

      // 驗證 Email 格式
      if (updates.email && !isValidEmail(updates.email)) {
        return {
          success: false,
          error: 'Email 格式不正確'
        };
      }

      // 驗證使用者名稱格式
      if (updates.username && !isValidUsername(updates.username)) {
        return {
          success: false,
          error: '使用者名稱只能包含英文、數字、底線，長度 3-20 字元'
        };
      }

      const user = await this.userRepository.update(id, updates);
      if (!user) {
        return {
          success: false,
          error: '使用者不存在'
        };
      }

      return {
        success: true,
        data: toUserPublic(user),
        message: '更新成功'
      };

    } catch (error) {
      console.error('Update user error:', error);
      return {
        success: false,
        error: '更新失敗'
      };
    }
  }

  // 刪除使用者（管理員功能）
  async deleteUser(id: number): Promise<ApiResponse<void>> {
    try {
      const success = await this.userRepository.delete(id);
      if (!success) {
        return {
          success: false,
          error: '使用者不存在'
        };
      }

      return {
        success: true,
        message: '刪除成功'
      };

    } catch (error) {
      console.error('Delete user error:', error);
      return {
        success: false,
        error: '刪除失敗'
      };
    }
  }

  // 驗證註冊資料
  private validateRegistrationData(data: UserRegistration): ApiResponse<void> {
    const errors: string[] = [];

    if (!data.username) {
      errors.push('使用者名稱為必填欄位');
    } else if (!isValidUsername(data.username)) {
      errors.push('使用者名稱只能包含英文、數字、底線，長度 3-20 字元');
    }

    if (!data.email) {
      errors.push('Email 為必填欄位');
    } else if (!isValidEmail(data.email)) {
      errors.push('Email 格式不正確');
    }

    if (!data.password) {
      errors.push('密碼為必填欄位');
    } else if (!isValidPassword(data.password)) {
      errors.push('密碼至少需要 6 個字元');
    }

    if (errors.length > 0) {
      return {
        success: false,
        error: errors.join(', ')
      };
    }

    return {
      success: true
    };
  }
}
