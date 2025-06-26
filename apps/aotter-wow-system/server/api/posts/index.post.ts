import { PostService } from '~/services/PostService';
import { verifyToken } from '~/utils/auth';
import type { PostCreate } from '~/types/post';

export default defineEventHandler(async (event) => {
  // 只允許 POST 請求
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  try {
    // 驗證使用者身份
    const token = getCookie(event, 'auth-token');
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      });
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      });
    }

    // 獲取請求資料
    const body = await readBody(event);
    
    // 驗證必要欄位
    if (!body.title || !body.content || !body.categoryId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      });
    }

    const postCreate: PostCreate = {
      title: body.title,
      content: body.content,
      categoryId: body.categoryId
    };

    // 創建貼文
    const postService = new PostService();
    const result = await postService.createPost(postCreate, payload.userId);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || 'Failed to create post'
      });
    }

    return {
      success: true,
      data: result.data,
      message: result.message
    };

  } catch (error: any) {
    console.error('Create post API error:', error);
    
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});
