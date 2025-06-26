import { WowService } from '~/services/WowService';
import { verifyToken } from '~/utils/auth';

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
    if (!body.postId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing postId'
      });
    }

    const postId = Number(body.postId);
    if (isNaN(postId)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid postId'
      });
    }

    // 給 Wow
    const wowService = new WowService();
    const result = await wowService.giveWow(payload.userId, postId);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || 'Failed to give wow'
      });
    }

    return {
      success: true,
      data: result.data,
      message: result.message
    };

  } catch (error: any) {
    console.error('Give wow API error:', error);
    
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});
