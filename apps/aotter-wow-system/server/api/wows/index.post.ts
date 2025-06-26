import { getDatabase } from '~/utils/database'
import { verifyToken } from '~/utils/auth'
import type { WowCreate } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    // 驗證 HTTP 方法
    assertMethod(event, 'POST')

    // 獲取請求資料
    const body = await readBody(event)
    
    // 驗證必要欄位
    if (!body.postId || !body.category) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: postId and category'
      })
    }

    // 驗證用戶身份（目前暫時跳過，稍後實作）
    // const token = getCookie(event, 'auth-token')
    // const payload = verifyToken(token)
    
    // 模擬用戶 ID
    const userId = 'user_test_1'

    // 獲取資料庫實例
    const db = getDatabase()
    
    // 檢查貼文是否存在
    const post = await db.findById('posts', body.postId)
    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found'
      })
    }

    // 檢查是否已經對此貼文給過 Wow
    const existingWow = await db.get('wows', (wow: any) => 
      wow.userId === userId && wow.postId === body.postId
    )

    if (existingWow) {
      // 更新現有的 Wow 評價
      await db.update('wows', existingWow.id, {
        category: body.category,
        updatedAt: new Date()
      })
    } else {
      // 創建新的 Wow 評價
      await db.insert('wows', {
        userId,
        postId: body.postId,
        category: body.category,
        createdAt: new Date()
      })

      // 更新貼文的 Wow 計數
      const currentWowCount = post.wowCount || 0
      await db.update('posts', body.postId, {
        wowCount: currentWowCount + 1
      })
    }

    return {
      success: true,
      message: 'Wow 評價已成功更新',
      data: {
        postId: body.postId,
        category: body.category,
        timestamp: new Date().toISOString()
      }
    }

  } catch (error: any) {
    console.error('Wow API Error:', error)
    
    // 如果是 createError 拋出的錯誤，直接重新拋出
    if (error.statusCode) {
      throw error
    }

    // 其他錯誤
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})