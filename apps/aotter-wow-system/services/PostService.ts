import { PostRepository } from '~/repositories/PostRepository';
import { CategoryRepository } from '~/repositories/CategoryRepository';
import { WowRepository } from '~/repositories/WowRepository';
import type { Post, PostCreate, PostQueryOptions } from '~/types/post';
import type { ApiResponse, PaginatedData } from '~/types/api';

export class PostService {
  private postRepository = new PostRepository();
  private categoryRepository = new CategoryRepository();
  private wowRepository = new WowRepository();

  // 創建新貼文
  async createPost(postCreate: PostCreate, authorId: number): Promise<ApiResponse<Post>> {
    try {
      // 驗證輸入資料
      const validation = this.validatePostData(postCreate);
      if (!validation.success) {
        return validation;
      }

      // 檢查類別是否存在
      const category = await this.categoryRepository.findById(postCreate.categoryId);
      if (!category) {
        return {
          success: false,
          error: '指定的類別不存在'
        };
      }

      // 創建貼文
      const post = await this.postRepository.create(postCreate, authorId);

      return {
        success: true,
        data: post,
        message: '貼文發表成功'
      };

    } catch (error) {
      console.error('Create post error:', error);
      return {
        success: false,
        error: '發表貼文失敗'
      };
    }
  }

  // 獲取貼文列表
  async getPosts(options: PostQueryOptions = {}): Promise<ApiResponse<PaginatedData<Post>>> {
    try {
      const limit = options.limit || 10;
      const offset = options.offset || 0;
      const page = Math.floor(offset / limit) + 1;

      // 獲取貼文
      const posts = await this.postRepository.findPosts({
        ...options,
        limit: limit + 1 // 多取一筆來判斷是否還有下一頁
      });

      // 判斷是否還有下一頁
      const hasNextPage = posts.length > limit;
      if (hasNextPage) {
        posts.pop(); // 移除多取的那一筆
      }

      // 獲取總數（簡化版，實際應該根據篩選條件計算）
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
      console.error('Get posts error:', error);
      return {
        success: false,
        error: '獲取貼文列表失敗'
      };
    }
  }

  // 根據 ID 獲取單一貼文
  async getPostById(id: number): Promise<ApiResponse<Post>> {
    try {
      const post = await this.postRepository.findById(id);
      if (!post) {
        return {
          success: false,
          error: '貼文不存在'
        };
      }

      return {
        success: true,
        data: post
      };

    } catch (error) {
      console.error('Get post error:', error);
      return {
        success: false,
        error: '獲取貼文失敗'
      };
    }
  }

  // 更新貼文
  async updatePost(id: number, updates: Partial<Post>, userId: number): Promise<ApiResponse<Post>> {
    try {
      // 檢查貼文是否存在
      const existingPost = await this.postRepository.findById(id);
      if (!existingPost) {
        return {
          success: false,
          error: '貼文不存在'
        };
      }

      // 檢查權限（只有作者可以編輯）
      if (existingPost.authorId !== userId) {
        return {
          success: false,
          error: '沒有權限編輯此貼文'
        };
      }

      // 如果要更新類別，檢查類別是否存在
      if (updates.categoryId) {
        const category = await this.categoryRepository.findById(updates.categoryId);
        if (!category) {
          return {
            success: false,
            error: '指定的類別不存在'
          };
        }
      }

      // 驗證更新資料
      if (updates.title && updates.title.trim().length < 1) {
        return {
          success: false,
          error: '標題不能為空'
        };
      }

      if (updates.content && updates.content.trim().length < 1) {
        return {
          success: false,
          error: '內容不能為空'
        };
      }

      // 執行更新
      const post = await this.postRepository.update(id, updates);
      if (!post) {
        return {
          success: false,
          error: '更新失敗'
        };
      }

      return {
        success: true,
        data: post,
        message: '貼文更新成功'
      };

    } catch (error) {
      console.error('Update post error:', error);
      return {
        success: false,
        error: '更新貼文失敗'
      };
    }
  }

  // 刪除貼文
  async deletePost(id: number, userId: number, isAdmin: boolean = false): Promise<ApiResponse<void>> {
    try {
      // 檢查貼文是否存在
      const existingPost = await this.postRepository.findById(id);
      if (!existingPost) {
        return {
          success: false,
          error: '貼文不存在'
        };
      }

      // 檢查權限（只有作者或管理員可以刪除）
      if (existingPost.authorId !== userId && !isAdmin) {
        return {
          success: false,
          error: '沒有權限刪除此貼文'
        };
      }

      // 執行刪除
      const success = await this.postRepository.delete(id);
      if (!success) {
        return {
          success: false,
          error: '刪除失敗'
        };
      }

      return {
        success: true,
        message: '貼文刪除成功'
      };

    } catch (error) {
      console.error('Delete post error:', error);
      return {
        success: false,
        error: '刪除貼文失敗'
      };
    }
  }

  // 獲取 Wow 排行榜
  async getWowRanking(limit: number = 10): Promise<ApiResponse<Post[]>> {
    try {
      const posts = await this.postRepository.getWowRanking(limit);

      return {
        success: true,
        data: posts
      };

    } catch (error) {
      console.error('Get wow ranking error:', error);
      return {
        success: false,
        error: '獲取排行榜失敗'
      };
    }
  }

  // 驗證貼文資料
  private validatePostData(data: PostCreate): ApiResponse<void> {
    const errors: string[] = [];

    if (!data.title || data.title.trim().length < 1) {
      errors.push('標題為必填欄位');
    } else if (data.title.length > 200) {
      errors.push('標題不能超過 200 字元');
    }

    if (!data.content || data.content.trim().length < 1) {
      errors.push('內容為必填欄位');
    } else if (data.content.length > 5000) {
      errors.push('內容不能超過 5000 字元');
    }

    if (!data.categoryId || data.categoryId < 1) {
      errors.push('請選擇類別');
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
