import { WowRepository } from '~/repositories/WowRepository';
import { PostRepository } from '~/repositories/PostRepository';
import type { Wow } from '~/types/post';
import type { ApiResponse } from '~/types/api';

export class WowService {
  private wowRepository = new WowRepository();
  private postRepository = new PostRepository();

  // 給貼文 Wow 評價
  async giveWow(userId: number, postId: number): Promise<ApiResponse<Wow>> {
    try {
      // 檢查貼文是否存在
      const post = await this.postRepository.findById(postId);
      if (!post) {
        return {
          success: false,
          error: '貼文不存在'
        };
      }

      // 檢查是否已經給過 Wow
      const existingWow = await this.wowRepository.findByUserAndPost(userId, postId);
      if (existingWow) {
        return {
          success: false,
          error: '您已經對此貼文給過 Wow 了'
        };
      }

      // 檢查不能給自己的貼文 Wow
      if (post.authorId === userId) {
        return {
          success: false,
          error: '不能對自己的貼文給 Wow'
        };
      }

      // 創建 Wow 評價
      const wow = await this.wowRepository.create(userId, postId);

      // 更新貼文的 Wow 計數
      await this.postRepository.incrementWowCount(postId);

      return {
        success: true,
        data: wow,
        message: 'Wow 成功！'
      };

    } catch (error) {
      console.error('Give wow error:', error);
      return {
        success: false,
        error: '給 Wow 失敗'
      };
    }
  }

  // 取消 Wow 評價
  async removeWow(userId: number, postId: number): Promise<ApiResponse<void>> {
    try {
      // 檢查貼文是否存在
      const post = await this.postRepository.findById(postId);
      if (!post) {
        return {
          success: false,
          error: '貼文不存在'
        };
      }

      // 檢查是否已經給過 Wow
      const existingWow = await this.wowRepository.findByUserAndPost(userId, postId);
      if (!existingWow) {
        return {
          success: false,
          error: '您還沒有對此貼文給過 Wow'
        };
      }

      // 刪除 Wow 評價
      const success = await this.wowRepository.deleteByUserAndPost(userId, postId);
      if (!success) {
        return {
          success: false,
          error: '取消 Wow 失敗'
        };
      }

      // 更新貼文的 Wow 計數
      await this.postRepository.decrementWowCount(postId);

      return {
        success: true,
        message: '已取消 Wow'
      };

    } catch (error) {
      console.error('Remove wow error:', error);
      return {
        success: false,
        error: '取消 Wow 失敗'
      };
    }
  }

  // 檢查使用者是否已對貼文給過 Wow
  async hasUserWowed(userId: number, postId: number): Promise<ApiResponse<boolean>> {
    try {
      const wow = await this.wowRepository.findByUserAndPost(userId, postId);
      
      return {
        success: true,
        data: !!wow
      };

    } catch (error) {
      console.error('Check wow status error:', error);
      return {
        success: false,
        error: '檢查 Wow 狀態失敗'
      };
    }
  }

  // 獲取貼文的 Wow 列表
  async getPostWows(postId: number): Promise<ApiResponse<Wow[]>> {
    try {
      const wows = await this.wowRepository.findByPost(postId);

      return {
        success: true,
        data: wows
      };

    } catch (error) {
      console.error('Get post wows error:', error);
      return {
        success: false,
        error: '獲取 Wow 列表失敗'
      };
    }
  }

  // 獲取使用者給過的 Wow 列表
  async getUserWows(userId: number): Promise<ApiResponse<Wow[]>> {
    try {
      const wows = await this.wowRepository.findByUser(userId);

      return {
        success: true,
        data: wows
      };

    } catch (error) {
      console.error('Get user wows error:', error);
      return {
        success: false,
        error: '獲取使用者 Wow 列表失敗'
      };
    }
  }

  // 獲取統計資訊
  async getWowStats(): Promise<ApiResponse<{
    totalWows: number;
    totalPosts: number;
    avgWowsPerPost: number;
  }>> {
    try {
      const totalWows = await this.wowRepository.countAll();
      const totalPosts = await this.postRepository.countAll();
      const avgWowsPerPost = totalPosts > 0 ? totalWows / totalPosts : 0;

      return {
        success: true,
        data: {
          totalWows,
          totalPosts,
          avgWowsPerPost: Math.round(avgWowsPerPost * 100) / 100
        }
      };

    } catch (error) {
      console.error('Get wow stats error:', error);
      return {
        success: false,
        error: '獲取統計資訊失敗'
      };
    }
  }
}
