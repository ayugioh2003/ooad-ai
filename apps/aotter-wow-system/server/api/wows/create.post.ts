import { WowService } from '~/services/WowService';
import { verifyToken } from '~/utils/auth';
import type { WowCreate, ApiResponse } from '~/types';

export default defineEventHandler(async (event): Promise<ApiResponse> => {
  try {
    // 驗證 HTTP 方法
    assertMethod(event, 'POST');

    // 驗證使用者身份
    const token = getCookie(event, 'auth-token') || getHeader(event, 'authorization')?.replace('Bearer ', '');
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Missing authentication token'
      });
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid or expired token'
      });
    }

    // 獲取請求資料
    const body = await readBody(event);
    
    // 驗證必要欄位
    if (!body.postId || !body.category) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: postId and category'
      });
    }

    // 創建 Wow 評價資料
    const wowData: WowCreate = {
      userId: payload.userId,
      postId: body.postId,
      category: body.category
    };

    // 執行 Wow 評價
    const wowService = new WowService();
    const result = await wowService.createWow(wowData);

    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || 'Failed to create wow'
      });
    }

    return {
      success: true,
      data: result.data,
      message: 'Wow 評價已成功添加'
    };

  } catch (error: any) {
    console.error('Wow API Error:', error);
    
    // 如果是 createError 拋出的錯誤，直接重新拋出
    if (error.statusCode) {
      throw error;
    }

    // 其他錯誤
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    });
  }
});
