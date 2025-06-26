import { CategoryRepository } from '~/repositories/CategoryRepository';
import type { Category } from '~/types/post';
import type { ApiResponse } from '~/types/api';

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  // 獲取所有類別
  async getAllCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const categories = await this.categoryRepository.findAll();

      return {
        success: true,
        data: categories
      };

    } catch (error) {
      console.error('Get categories error:', error);
      return {
        success: false,
        error: '獲取類別列表失敗'
      };
    }
  }

  // 根據 ID 獲取類別
  async getCategoryById(id: number): Promise<ApiResponse<Category>> {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        return {
          success: false,
          error: '類別不存在'
        };
      }

      return {
        success: true,
        data: category
      };

    } catch (error) {
      console.error('Get category error:', error);
      return {
        success: false,
        error: '獲取類別失敗'
      };
    }
  }

  // 創建新類別（管理員功能）
  async createCategory(name: string, description: string): Promise<ApiResponse<Category>> {
    try {
      // 驗證輸入資料
      const validation = this.validateCategoryData(name, description);
      if (!validation.success) {
        return validation;
      }

      // 檢查類別名稱是否已存在
      const nameExists = await this.categoryRepository.nameExists(name);
      if (nameExists) {
        return {
          success: false,
          error: '類別名稱已存在'
        };
      }

      // 創建類別
      const category = await this.categoryRepository.create(name, description);

      return {
        success: true,
        data: category,
        message: '類別創建成功'
      };

    } catch (error) {
      console.error('Create category error:', error);
      return {
        success: false,
        error: '創建類別失敗'
      };
    }
  }

  // 更新類別（管理員功能）
  async updateCategory(id: number, updates: Partial<Category>): Promise<ApiResponse<Category>> {
    try {
      // 檢查類別是否存在
      const existingCategory = await this.categoryRepository.findById(id);
      if (!existingCategory) {
        return {
          success: false,
          error: '類別不存在'
        };
      }

      // 驗證更新資料
      if (updates.name) {
        if (updates.name.trim().length < 1) {
          return {
            success: false,
            error: '類別名稱不能為空'
          };
        }

        if (updates.name.length > 50) {
          return {
            success: false,
            error: '類別名稱不能超過 50 字元'
          };
        }

        // 檢查名稱是否與其他類別重複
        const existingWithSameName = await this.categoryRepository.findByName(updates.name);
        if (existingWithSameName && existingWithSameName.id !== id) {
          return {
            success: false,
            error: '類別名稱已存在'
          };
        }
      }

      if (updates.description && updates.description.length > 200) {
        return {
          success: false,
          error: '類別描述不能超過 200 字元'
        };
      }

      // 執行更新
      const category = await this.categoryRepository.update(id, updates);
      if (!category) {
        return {
          success: false,
          error: '更新失敗'
        };
      }

      return {
        success: true,
        data: category,
        message: '類別更新成功'
      };

    } catch (error) {
      console.error('Update category error:', error);
      return {
        success: false,
        error: '更新類別失敗'
      };
    }
  }

  // 刪除類別（管理員功能）
  async deleteCategory(id: number): Promise<ApiResponse<void>> {
    try {
      // 檢查類別是否存在
      const existingCategory = await this.categoryRepository.findById(id);
      if (!existingCategory) {
        return {
          success: false,
          error: '類別不存在'
        };
      }

      // TODO: 檢查是否有貼文使用此類別
      // 在實際應用中，應該要防止刪除還有貼文的類別
      // 或者提供選項將相關貼文移到其他類別

      // 執行刪除
      const success = await this.categoryRepository.delete(id);
      if (!success) {
        return {
          success: false,
          error: '刪除失敗'
        };
      }

      return {
        success: true,
        message: '類別刪除成功'
      };

    } catch (error) {
      console.error('Delete category error:', error);
      return {
        success: false,
        error: '刪除類別失敗'
      };
    }
  }

  // 驗證類別資料
  private validateCategoryData(name: string, description: string): ApiResponse<void> {
    const errors: string[] = [];

    if (!name || name.trim().length < 1) {
      errors.push('類別名稱為必填欄位');
    } else if (name.length > 50) {
      errors.push('類別名稱不能超過 50 字元');
    }

    if (description && description.length > 200) {
      errors.push('類別描述不能超過 200 字元');
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
