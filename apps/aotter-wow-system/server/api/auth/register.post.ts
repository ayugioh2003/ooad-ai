import { getDatabase } from '~/utils/database'
import { hashPassword, generateToken, isValidEmail, isValidPassword } from '~/utils/auth'
import { UserRole } from '~/types'
import type { UserRegistration } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    // 驗證 HTTP 方法
    assertMethod(event, 'POST')

    // 獲取請求資料
    const body = await readBody(event)
    
    // 驗證必要欄位
    if (!body.username || !body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: username, email, password'
      })
    }

    // 驗證資料格式
    if (!isValidEmail(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    if (!isValidPassword(body.password)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Password must be at least 6 characters long'
      })
    }

    // 獲取資料庫實例
    const db = getDatabase()

    // 檢查 email 是否已存在
    const existingUserByEmail = await db.get('users', (user: any) => user.email === body.email)
    if (existingUserByEmail) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Email already exists'
      })
    }

    // 檢查 username 是否已存在
    const existingUserByUsername = await db.get('users', (user: any) => user.username === body.username)
    if (existingUserByUsername) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Username already exists'
      })
    }

    // 雜湊密碼
    const passwordHash = await hashPassword(body.password)

    // 創建用戶
    const result = await db.insert('users', {
      username: body.username,
      email: body.email,
      passwordHash,
      role: UserRole.USER,
      profile: {
        displayName: body.displayName || body.username,
        bio: '',
        avatar: ''
      },
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // 獲取創建的用戶
    const newUser = await db.findById('users', result.lastID)
    
    // 生成 JWT token
    const token = generateToken({
      userId: newUser.id,
      username: newUser.username,
      role: newUser.role
    })

    // 設置 cookie
    setCookie(event, 'auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    // 回傳用戶資料（不包含密碼）
    const { passwordHash: _, ...userWithoutPassword } = newUser

    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: 'Registration successful'
    }

  } catch (error: any) {
    console.error('Register API Error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})


