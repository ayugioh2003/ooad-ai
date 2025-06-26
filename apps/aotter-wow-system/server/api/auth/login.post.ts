import { UserService } from '~/services/UserService';
import type { UserLogin } from '~/types/user';

export default defineEventHandler(async (event) => {
  // 只允許 POST 請求
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  try {
    // 獲取請求資料
    const body = await readBody(event);
    
    // 驗證必要欄位
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing email or password'
      });
    }

    const userLogin: UserLogin = {
      email: body.email,
      password: body.password
    };

    // 執行登入
    const userService = new UserService();
    const result = await userService.login(userLogin);

    if (!result.success) {
      throw createError({
        statusCode: 401,
        statusMessage: result.error || 'Login failed'
      });
    }

    // 設置 JWT cookie
    const token = result.data?.token;
    if (token) {
      setCookie(event, 'auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
    }

    return {
      success: true,
      data: {
        user: result.data?.user,
        token: result.data?.token
      },
      message: result.message
    };

  } catch (error: any) {
    console.error('Login API error:', error);
    
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});
