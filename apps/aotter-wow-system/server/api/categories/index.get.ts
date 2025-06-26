import { CategoryService } from '~/services/CategoryService';

export default defineEventHandler(async (event) => {
  // 只允許 GET 請求
  if (event.node.req.method !== 'GET') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  try {
    const categoryService = new CategoryService();
    const result = await categoryService.getAllCategories();

    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || 'Failed to get categories'
      });
    }

    return {
      success: true,
      data: result.data
    };

  } catch (error: any) {
    console.error('Categories API error:', error);
    
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});
