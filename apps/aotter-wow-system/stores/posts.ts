export const usePostStore = defineStore('posts', () => {
  // 狀態
  const posts = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref('')

  // 獲取所有貼文
  const fetchPosts = async (options = {}) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await $fetch('/api/posts', {
        query: options
      })
      
      if (response.success) {
        posts.value = response.data || []
      } else {
        error.value = response.error || 'Failed to fetch posts'
      }
    } catch (err: any) {
      console.error('Fetch posts error:', err)
      error.value = err.data?.message || 'Failed to fetch posts'
    } finally {
      loading.value = false
    }
  }

  // 獲取分類
  const fetchCategories = async () => {
    try {
      const response = await $fetch('/api/categories')
      
      if (response.success) {
        categories.value = response.data || []
      }
    } catch (err: any) {
      console.error('Fetch categories error:', err)
    }
  }

  // 建立貼文
  const createPost = async (postData: any) => {
    try {
      const response = await $fetch('/api/posts', {
        method: 'POST',
        body: postData
      })
      
      if (data.success) {
        // 重新獲取貼文列表
        await fetchPosts()
        return { success: true, data: data.data }
      } else {
        return { success: false, error: data.error }
      }
    } catch (err: any) {
      console.error('Create post error:', err)
      return { 
        success: false, 
        error: err.data?.message || 'Failed to create post' 
      }
    }
  }

  // 給 Wow 評價
  const giveWow = async (postId: string, category: string) => {
    try {
      const data = await $fetch('/api/wows', {
        method: 'POST',
        body: { postId, category }
      })
      
      if (data.success) {
        // 更新本地貼文的 wow 計數
        const post = posts.value.find((p: any) => p.id === postId)
        if (post) {
          post.wowCount = (post.wowCount || 0) + 1
        }
        return { success: true }
      } else {
        return { success: false, error: data.error }
      }
    } catch (err: any) {
      console.error('Give wow error:', err)
      return { 
        success: false, 
        error: err.data?.message || 'Failed to give wow' 
      }
    }
  }

  // 根據 ID 獲取貼文
  const getPostById = (id: string) => {
    return posts.value.find((post: any) => post.id === id)
  }

  // 根據分類篩選貼文
  const getPostsByCategory = (categoryId: string) => {
    return posts.value.filter((post: any) => post.categoryId === categoryId)
  }

  return {
    // 狀態
    posts: readonly(posts),
    categories: readonly(categories),
    loading: readonly(loading),
    error: readonly(error),
    
    // 方法
    fetchPosts,
    fetchCategories,
    createPost,
    giveWow,
    getPostById,
    getPostsByCategory
  }
})
