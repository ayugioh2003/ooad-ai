import { d as defineEventHandler, c as createError } from '../../nitro/nitro.mjs';
import { C as CategoryRepository } from '../../_/CategoryRepository.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'node:crypto';
import 'node:url';
import '../../_/database.mjs';
import 'bcryptjs';
import 'jsonwebtoken';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class CategoryService {
  constructor() {
    __publicField(this, "categoryRepository", new CategoryRepository());
  }
  // 獲取所有類別
  async getAllCategories() {
    try {
      const categories = await this.categoryRepository.findAll();
      return {
        success: true,
        data: categories
      };
    } catch (error) {
      console.error("Get categories error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u985E\u5225\u5217\u8868\u5931\u6557"
      };
    }
  }
  // 根據 ID 獲取類別
  async getCategoryById(id) {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        return {
          success: false,
          error: "\u985E\u5225\u4E0D\u5B58\u5728"
        };
      }
      return {
        success: true,
        data: category
      };
    } catch (error) {
      console.error("Get category error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u985E\u5225\u5931\u6557"
      };
    }
  }
  // 創建新類別（管理員功能）
  async createCategory(name, description) {
    try {
      const validation = this.validateCategoryData(name, description);
      if (!validation.success) {
        return validation;
      }
      const nameExists = await this.categoryRepository.nameExists(name);
      if (nameExists) {
        return {
          success: false,
          error: "\u985E\u5225\u540D\u7A31\u5DF2\u5B58\u5728"
        };
      }
      const category = await this.categoryRepository.create(name, description);
      return {
        success: true,
        data: category,
        message: "\u985E\u5225\u5275\u5EFA\u6210\u529F"
      };
    } catch (error) {
      console.error("Create category error:", error);
      return {
        success: false,
        error: "\u5275\u5EFA\u985E\u5225\u5931\u6557"
      };
    }
  }
  // 更新類別（管理員功能）
  async updateCategory(id, updates) {
    try {
      const existingCategory = await this.categoryRepository.findById(id);
      if (!existingCategory) {
        return {
          success: false,
          error: "\u985E\u5225\u4E0D\u5B58\u5728"
        };
      }
      if (updates.name) {
        if (updates.name.trim().length < 1) {
          return {
            success: false,
            error: "\u985E\u5225\u540D\u7A31\u4E0D\u80FD\u70BA\u7A7A"
          };
        }
        if (updates.name.length > 50) {
          return {
            success: false,
            error: "\u985E\u5225\u540D\u7A31\u4E0D\u80FD\u8D85\u904E 50 \u5B57\u5143"
          };
        }
        const existingWithSameName = await this.categoryRepository.findByName(updates.name);
        if (existingWithSameName && existingWithSameName.id !== id) {
          return {
            success: false,
            error: "\u985E\u5225\u540D\u7A31\u5DF2\u5B58\u5728"
          };
        }
      }
      if (updates.description && updates.description.length > 200) {
        return {
          success: false,
          error: "\u985E\u5225\u63CF\u8FF0\u4E0D\u80FD\u8D85\u904E 200 \u5B57\u5143"
        };
      }
      const category = await this.categoryRepository.update(id, updates);
      if (!category) {
        return {
          success: false,
          error: "\u66F4\u65B0\u5931\u6557"
        };
      }
      return {
        success: true,
        data: category,
        message: "\u985E\u5225\u66F4\u65B0\u6210\u529F"
      };
    } catch (error) {
      console.error("Update category error:", error);
      return {
        success: false,
        error: "\u66F4\u65B0\u985E\u5225\u5931\u6557"
      };
    }
  }
  // 刪除類別（管理員功能）
  async deleteCategory(id) {
    try {
      const existingCategory = await this.categoryRepository.findById(id);
      if (!existingCategory) {
        return {
          success: false,
          error: "\u985E\u5225\u4E0D\u5B58\u5728"
        };
      }
      const success = await this.categoryRepository.delete(id);
      if (!success) {
        return {
          success: false,
          error: "\u522A\u9664\u5931\u6557"
        };
      }
      return {
        success: true,
        message: "\u985E\u5225\u522A\u9664\u6210\u529F"
      };
    } catch (error) {
      console.error("Delete category error:", error);
      return {
        success: false,
        error: "\u522A\u9664\u985E\u5225\u5931\u6557"
      };
    }
  }
  // 驗證類別資料
  validateCategoryData(name, description) {
    const errors = [];
    if (!name || name.trim().length < 1) {
      errors.push("\u985E\u5225\u540D\u7A31\u70BA\u5FC5\u586B\u6B04\u4F4D");
    } else if (name.length > 50) {
      errors.push("\u985E\u5225\u540D\u7A31\u4E0D\u80FD\u8D85\u904E 50 \u5B57\u5143");
    }
    if (description && description.length > 200) {
      errors.push("\u985E\u5225\u63CF\u8FF0\u4E0D\u80FD\u8D85\u904E 200 \u5B57\u5143");
    }
    if (errors.length > 0) {
      return {
        success: false,
        error: errors.join(", ")
      };
    }
    return {
      success: true
    };
  }
}

const index_get = defineEventHandler(async (event) => {
  if (event.node.req.method !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const categoryService = new CategoryService();
    const result = await categoryService.getAllCategories();
    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || "Failed to get categories"
      });
    }
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error("Categories API error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
