import { PostService } from '~/services/PostService';
import type { PostQueryOptions } from '~/types/post';

export default defineEventHandler(async (event) => {
  // 只允許 GET 請求
  if (event.node.req.method !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  try {
    // 獲取查詢參數
    const query = getQuery(event);
    
    const options: PostQueryOptions = {
      categoryId: query.categoryId ? Number(query.categoryId) : undefined,
      authorId: query.authorId ? Number(query.authorId) : undefined,
      search: query.search ? String(query.search) : undefined,
      sortBy: query.sortBy as 'publishDate' | 'wowCount' || 'publishDate',
      sortOrder: query.sortOrder as 'asc' | 'desc' || 'desc',
      limit: query.limit ? Number(query.limit) : 10,
      offset: query.offset ? Number(query.offset) : 0
    };

    // 獲取貼文列表
    const postService = new PostService();
    const result = await postService.getPosts(options);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || 'Failed to get posts'
      });
    }

    return {
      success: true,
      data: result.data
    };

  } catch (error: any) {
    console.error('Get posts API error:', error);
    
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});
