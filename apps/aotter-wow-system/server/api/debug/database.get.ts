import { getDatabase } from '~/utils/database'

export default defineEventHandler(async (event) => {
  try {
    const db = getDatabase()
    
    // 手動初始化
    await db.initTables()
    
    // 獲取所有分類
    const categories = await db.all('categories')
    
    return {
      success: true,
      message: 'Database debug info',
      data: {
        categories,
        categoriesCount: categories.length,
        timestamp: new Date().toISOString()
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      stack: error.stack
    }
  }
})
