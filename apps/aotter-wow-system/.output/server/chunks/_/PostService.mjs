import { P as PostRepository, W as WowRepository } from './WowRepository.mjs';
import { C as CategoryRepository } from './CategoryRepository.mjs';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class PostService {
  constructor() {
    __publicField(this, "postRepository", new PostRepository());
    __publicField(this, "categoryRepository", new CategoryRepository());
    __publicField(this, "wowRepository", new WowRepository());
  }
  // 創建新貼文
  async createPost(postCreate, authorId) {
    try {
      const validation = this.validatePostData(postCreate);
      if (!validation.success) {
        return validation;
      }
      const category = await this.categoryRepository.findById(postCreate.categoryId);
      if (!category) {
        return {
          success: false,
          error: "\u6307\u5B9A\u7684\u985E\u5225\u4E0D\u5B58\u5728"
        };
      }
      const post = await this.postRepository.create(postCreate, authorId);
      return {
        success: true,
        data: post,
        message: "\u8CBC\u6587\u767C\u8868\u6210\u529F"
      };
    } catch (error) {
      console.error("Create post error:", error);
      return {
        success: false,
        error: "\u767C\u8868\u8CBC\u6587\u5931\u6557"
      };
    }
  }
  // 獲取貼文列表
  async getPosts(options = {}) {
    try {
      const limit = options.limit || 10;
      const offset = options.offset || 0;
      const page = Math.floor(offset / limit) + 1;
      const posts = await this.postRepository.findPosts({
        ...options,
        limit: limit + 1
        // 多取一筆來判斷是否還有下一頁
      });
      const hasNextPage = posts.length > limit;
      if (hasNextPage) {
        posts.pop();
      }
      const total = await this.postRepository.countAll();
      const totalPages = Math.ceil(total / limit);
      return {
        success: true,
        data: {
          items: posts,
          total,
          page,
          limit,
          totalPages
        }
      };
    } catch (error) {
      console.error("Get posts error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u8CBC\u6587\u5217\u8868\u5931\u6557"
      };
    }
  }
  // 根據 ID 獲取單一貼文
  async getPostById(id) {
    try {
      const post = await this.postRepository.findById(id);
      if (!post) {
        return {
          success: false,
          error: "\u8CBC\u6587\u4E0D\u5B58\u5728"
        };
      }
      return {
        success: true,
        data: post
      };
    } catch (error) {
      console.error("Get post error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u8CBC\u6587\u5931\u6557"
      };
    }
  }
  // 更新貼文
  async updatePost(id, updates, userId) {
    try {
      const existingPost = await this.postRepository.findById(id);
      if (!existingPost) {
        return {
          success: false,
          error: "\u8CBC\u6587\u4E0D\u5B58\u5728"
        };
      }
      if (existingPost.authorId !== userId) {
        return {
          success: false,
          error: "\u6C92\u6709\u6B0A\u9650\u7DE8\u8F2F\u6B64\u8CBC\u6587"
        };
      }
      if (updates.categoryId) {
        const category = await this.categoryRepository.findById(updates.categoryId);
        if (!category) {
          return {
            success: false,
            error: "\u6307\u5B9A\u7684\u985E\u5225\u4E0D\u5B58\u5728"
          };
        }
      }
      if (updates.title && updates.title.trim().length < 1) {
        return {
          success: false,
          error: "\u6A19\u984C\u4E0D\u80FD\u70BA\u7A7A"
        };
      }
      if (updates.content && updates.content.trim().length < 1) {
        return {
          success: false,
          error: "\u5167\u5BB9\u4E0D\u80FD\u70BA\u7A7A"
        };
      }
      const post = await this.postRepository.update(id, updates);
      if (!post) {
        return {
          success: false,
          error: "\u66F4\u65B0\u5931\u6557"
        };
      }
      return {
        success: true,
        data: post,
        message: "\u8CBC\u6587\u66F4\u65B0\u6210\u529F"
      };
    } catch (error) {
      console.error("Update post error:", error);
      return {
        success: false,
        error: "\u66F4\u65B0\u8CBC\u6587\u5931\u6557"
      };
    }
  }
  // 刪除貼文
  async deletePost(id, userId, isAdmin = false) {
    try {
      const existingPost = await this.postRepository.findById(id);
      if (!existingPost) {
        return {
          success: false,
          error: "\u8CBC\u6587\u4E0D\u5B58\u5728"
        };
      }
      if (existingPost.authorId !== userId && !isAdmin) {
        return {
          success: false,
          error: "\u6C92\u6709\u6B0A\u9650\u522A\u9664\u6B64\u8CBC\u6587"
        };
      }
      const success = await this.postRepository.delete(id);
      if (!success) {
        return {
          success: false,
          error: "\u522A\u9664\u5931\u6557"
        };
      }
      return {
        success: true,
        message: "\u8CBC\u6587\u522A\u9664\u6210\u529F"
      };
    } catch (error) {
      console.error("Delete post error:", error);
      return {
        success: false,
        error: "\u522A\u9664\u8CBC\u6587\u5931\u6557"
      };
    }
  }
  // 獲取 Wow 排行榜
  async getWowRanking(limit = 10) {
    try {
      const posts = await this.postRepository.getWowRanking(limit);
      return {
        success: true,
        data: posts
      };
    } catch (error) {
      console.error("Get wow ranking error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u6392\u884C\u699C\u5931\u6557"
      };
    }
  }
  // 驗證貼文資料
  validatePostData(data) {
    const errors = [];
    if (!data.title || data.title.trim().length < 1) {
      errors.push("\u6A19\u984C\u70BA\u5FC5\u586B\u6B04\u4F4D");
    } else if (data.title.length > 200) {
      errors.push("\u6A19\u984C\u4E0D\u80FD\u8D85\u904E 200 \u5B57\u5143");
    }
    if (!data.content || data.content.trim().length < 1) {
      errors.push("\u5167\u5BB9\u70BA\u5FC5\u586B\u6B04\u4F4D");
    } else if (data.content.length > 5e3) {
      errors.push("\u5167\u5BB9\u4E0D\u80FD\u8D85\u904E 5000 \u5B57\u5143");
    }
    if (!data.categoryId || data.categoryId < 1) {
      errors.push("\u8ACB\u9078\u64C7\u985E\u5225");
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

export { PostService as P };
//# sourceMappingURL=PostService.mjs.map
