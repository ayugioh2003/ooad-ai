import { getDatabase } from '~/utils/database'
import { verifyPassword, generateToken, isValidEmail } from '~/utils/auth'
import type { JwtPayload } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    // 驗證 HTTP 方法
    assertMethod(event, 'POST')

    // 獲取請求資料
    const body = await readBody(event)
    
    // 驗證必要欄位
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: email, password'
      })
    }

    // 驗證 email 格式
    if (!isValidEmail(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    // 獲取資料庫實例
    const db = getDatabase()

    // 查找用戶
    const user = await db.get('users', (u: any) => u.email === body.email)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }

    // 檢查用戶是否啟用
    if (!user.isActive) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Account is disabled'
      })
    }

    // 驗證密碼
    const isPasswordValid = await verifyPassword(body.password, user.passwordHash)
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password'
      })
    }

    // 生成 JWT token
    const tokenPayload: JwtPayload = {
      userId: user.id,
      username: user.username,
      role: user.role
    }
    const token = generateToken(tokenPayload)

    // 設置 cookie
    setCookie(event, 'auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    // 回傳用戶資料（不包含密碼）
    const { passwordHash: _, ...userWithoutPassword } = user

    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: 'Login successful'
    }

  } catch (error: any) {
    console.error('Login API Error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
