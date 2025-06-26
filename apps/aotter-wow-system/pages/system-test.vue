<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Aotter Wow 系統整合測試</h1>
      
      <!-- 認證狀態 -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">認證狀態</h2>
        <div v-if="authStore.isLoggedIn" class="text-green-600">
          <p>✅ 已登入: {{ authStore.user?.username }} ({{ authStore.user?.email }})</p>
          <button @click="authStore.logout()" class="mt-2 bg-red-500 text-white px-4 py-2 rounded">
            登出
          </button>
        </div>
        <div v-else class="text-red-600">
          <p>❌ 未登入</p>
          <NuxtLink to="/auth-test" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded inline-block">
            前往登入
          </NuxtLink>
        </div>
      </div>

      <!-- API 測試 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- 分類測試 -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">分類列表</h2>
          <button @click="loadCategories" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">
            重新載入分類
          </button>
          <div v-if="categoriesLoading" class="text-gray-500">載入中...</div>
          <div v-else-if="categories.length > 0" class="space-y-2">
            <div v-for="category in categories" :key="category.id" class="flex items-center space-x-2 p-2 border rounded">
              <span class="text-2xl">{{ category.icon }}</span>
              <div>
                <span class="font-medium">{{ category.name }}</span>
                <p class="text-sm text-gray-600">{{ category.description }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-gray-500">沒有分類資料</div>
        </div>

        <!-- 貼文測試 -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">貼文列表</h2>
          <button @click="loadPosts" class="bg-green-500 text-white px-4 py-2 rounded mb-4">
            重新載入貼文
          </button>
          <div v-if="postsLoading" class="text-gray-500">載入中...</div>
          <div v-else-if="posts.length > 0" class="space-y-4">
            <div v-for="post in posts" :key="post.id" class="border rounded p-4">
              <h3 class="font-semibold">{{ post.title }}</h3>
              <p class="text-gray-600 text-sm">{{ post.content }}</p>
              <div class="mt-2 flex items-center justify-between">
                <span class="text-sm text-gray-500">作者: {{ post.authorName }}</span>
                <span class="text-sm text-gray-500">Wow: {{ post.wowCount || 0 }}</span>
              </div>
            </div>
          </div>
          <div v-else class="text-gray-500">沒有貼文資料</div>
        </div>
      </div>

      <!-- 建立貼文測試 -->
      <div class="bg-white rounded-lg shadow p-6 mt-8" v-if="authStore.isLoggedIn">
        <h2 class="text-xl font-semibold mb-4">建立測試貼文</h2>
        <form @submit.prevent="createTestPost" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">標題</label>
            <input v-model="newPost.title" type="text" required class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">內容</label>
            <textarea v-model="newPost.content" required class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">分類</label>
            <select v-model="newPost.categoryId" required class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">選擇分類</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.icon }} {{ category.name }}
              </option>
            </select>
          </div>
          <button type="submit" :disabled="creatingPost" class="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50">
            {{ creatingPost ? '建立中...' : '建立貼文' }}
          </button>
        </form>
      </div>

      <!-- Wow 互動測試 -->
      <div class="bg-white rounded-lg shadow p-6 mt-8" v-if="authStore.isLoggedIn && posts.length > 0">
        <h2 class="text-xl font-semibold mb-4">Wow 互動測試</h2>
        <div class="space-y-4">
          <div v-for="post in posts.slice(0, 3)" :key="post.id" class="border rounded p-4">
            <h3 class="font-medium mb-2">{{ post.title }}</h3>
            <div class="flex space-x-2">
              <button 
                v-for="category in categories.slice(0, 4)" 
                :key="category.id"
                @click="giveWow(post.id, category.name)"
                class="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
              >
                {{ category.icon }} {{ category.name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 錯誤訊息 -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-8">
        {{ error }}
      </div>

      <!-- 成功訊息 -->
      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-8">
        {{ success }}
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()

// 狀態
const categories = ref([])
const posts = ref([])
const categoriesLoading = ref(false)
const postsLoading = ref(false)
const creatingPost = ref(false)
const error = ref('')
const success = ref('')

// 新貼文表單
const newPost = reactive({
  title: '',
  content: '',
  categoryId: ''
})

// 載入分類
const loadCategories = async () => {
  categoriesLoading.value = true
  try {
    const response = await $fetch('/api/categories')
    if (response.success) {
      categories.value = response.data || []
      success.value = `載入了 ${categories.value.length} 個分類`
    } else {
      error.value = '載入分類失敗'
    }
  } catch (err) {
    error.value = '載入分類時發生錯誤'
    console.error(err)
  } finally {
    categoriesLoading.value = false
  }
}

// 載入貼文
const loadPosts = async () => {
  postsLoading.value = true
  try {
    const response = await $fetch('/api/posts')
    if (response.success) {
      posts.value = response.data || []
      success.value = `載入了 ${posts.value.length} 篇貼文`
    } else {
      error.value = '載入貼文失敗'
    }
  } catch (err) {
    error.value = '載入貼文時發生錯誤'
    console.error(err)
  } finally {
    postsLoading.value = false
  }
}

// 建立測試貼文
const createTestPost = async () => {
  creatingPost.value = true
  try {
    const response = await $fetch('/api/posts', {
      method: 'POST',
      body: {
        title: newPost.title,
        content: newPost.content,
        categoryId: newPost.categoryId
      }
    })
    
    if (response.success) {
      success.value = '貼文建立成功！'
      // 清空表單
      newPost.title = ''
      newPost.content = ''
      newPost.categoryId = ''
      // 重新載入貼文
      await loadPosts()
    } else {
      error.value = response.error || '建立貼文失敗'
    }
  } catch (err) {
    error.value = '建立貼文時發生錯誤'
    console.error(err)
  } finally {
    creatingPost.value = false
  }
}

// 給 Wow 評價
const giveWow = async (postId, category) => {
  try {
    const response = await $fetch('/api/wows', {
      method: 'POST',
      body: {
        postId,
        category
      }
    })
    
    if (response.success) {
      success.value = `成功給了 ${category} Wow！`
      // 重新載入貼文以更新計數
      await loadPosts()
    } else {
      error.value = response.error || 'Wow 評價失敗'
    }
  } catch (err) {
    error.value = 'Wow 評價時發生錯誤'
    console.error(err)
  }
}

// 清除訊息
const clearMessages = () => {
  error.value = ''
  success.value = ''
}

// 自動載入資料
onMounted(async () => {
  await loadCategories()
  await loadPosts()
})

// 監聽訊息，5秒後自動清除
watch([error, success], () => {
  setTimeout(clearMessages, 5000)
})
</script>
