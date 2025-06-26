export default defineEventHandler(async (event) => {
  // 只允許 POST 請求
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  try {
    // 清除 auth cookie
    deleteCookie(event, 'auth-token');

    return {
      success: true,
      message: '登出成功'
    };

  } catch (error: any) {
    console.error('Logout API error:', error);
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});
