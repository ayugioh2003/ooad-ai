import { getDatabase } from '~/utils/database'

export default defineEventHandler(async (event) => {
  try {
    // 只允許 GET 請求
    assertMethod(event, 'GET')

    // 獲取資料庫實例
    const db = getDatabase()
    
    // 獲取所有分類
    const categories = await db.all('categories')

    return {
      success: true,
      data: categories
    }

  } catch (error: any) {
    console.error('Categories API error:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
