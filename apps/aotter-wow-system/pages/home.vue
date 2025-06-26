<template>
  <div class="wow-container py-8">
    <!-- 歡迎區塊 -->
    <div class="wow-card wow-fade-in mb-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          歡迎來到 Aotter Wow 系統
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
          一個以 Wow 評價為核心的社群貼文平台
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/create" class="wow-button">
            開始發文
          </NuxtLink>
          <NuxtLink to="/ranking" class="wow-button-secondary">
            查看排行榜
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 貼文列表 -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">最新貼文</h2>
        <button
          @click="fetchPosts"
          :disabled="loading"
          class="wow-button-secondary"
        >
          <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 animate-spin mr-2" />
          {{ loading ? '載入中...' : '重新整理' }}
        </button>
      </div>

      <!-- 載入狀態 -->
      <div v-if="loading && posts.length === 0" class="text-center py-8">
        <div class="wow-loading mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-400">載入貼文中...</p>
      </div>

      <!-- 錯誤狀態 -->
      <div v-else-if="error" class="wow-card bg-red-50 border-red-200 text-red-800">
        <p class="font-medium">載入失敗</p>
        <p class="text-sm mt-1">{{ error }}</p>
      </div>

      <!-- 貼文列表 -->
      <div v-else-if="posts.length > 0" class="wow-grid">
        <div
          v-for="post in posts"
          :key="post.id"
          class="wow-card wow-card-hover"
          @click="() => navigateTo(`/posts/${post.id}`)"
        >
          <!-- 貼文頭部 -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="wow-avatar">
                {{ getInitials(post.author?.username || 'U') }}
              </div>
              <div>
                <h3 class="font-medium text-gray-900 dark:text-white">
                  {{ post.author?.username || '匿名用戶' }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatDate(post.createdAt) }}
                </p>
              </div>
            </div>
            <div class="wow-badge wow-badge-primary">
              {{ post.category?.name || '未分類' }}
            </div>
          </div>

          <!-- 貼文內容 -->
          <div class="mb-4">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ post.title }}
            </h4>
            <p class="text-gray-600 dark:text-gray-400 line-clamp-3">
              {{ post.content }}
            </p>
          </div>

          <!-- 貼文底部 -->
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <button
                @click.stop="handleWow(post.id)"
                class="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <Icon name="heroicons:heart" class="w-5 h-5" />
                <span>{{ post.wowCount || 0 }}</span>
              </button>
            </div>
            <time class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatTime(post.createdAt) }}
            </time>
          </div>
        </div>
      </div>

      <!-- 空狀態 -->
      <div v-else class="text-center py-12">
        <Icon name="heroicons:document-text" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">還沒有貼文</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">成為第一個發文的人吧！</p>
        <NuxtLink to="/create" class="wow-button">
          發表第一篇貼文
        </NuxtLink>
      </div>
    </div>

    <!-- 統計資訊 -->
    <div class="wow-card">
      <h2 class="text-2xl font-semibold mb-6 text-center">平台統計</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-primary-600 mb-2">{{ stats.users }}</div>
          <div class="text-gray-600 dark:text-gray-400">註冊用戶</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary-600 mb-2">{{ stats.posts }}</div>
          <div class="text-gray-600 dark:text-gray-400">總貼文數</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary-600 mb-2">{{ stats.wows }}</div>
          <div class="text-gray-600 dark:text-gray-400">Wow 評價</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary-600 mb-2">{{ stats.categories }}</div>
          <div class="text-gray-600 dark:text-gray-400">分類數量</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 頁面元資料
useHead({
  title: '首頁 - Aotter Wow 系統',
  meta: [
    { name: 'description', content: 'Aotter Wow 系統首頁，探索社群貼文和 Wow 評價功能' }
  ]
})

// 響應式資料
const posts = ref([])
const loading = ref(false)
const error = ref('')

// 模擬統計資料
const stats = reactive({
  users: 0,
  posts: 0,
  wows: 0,
  categories: 0
})

// 獲取貼文列表
const fetchPosts = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // 模擬 API 呼叫
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模擬貼文資料
    posts.value = [
      {
        id: 'post_1',
        title: '歡迎來到 Aotter Wow！',
        content: '這是我們平台的第一篇貼文，歡迎大家多多發文互動！讓我們一起建立一個充滿正能量的社群空間。',
        wowCount: 15,
        createdAt: new Date().toISOString(),
        author: {
          username: 'admin',
          profile: { displayName: '系統管理員' }
        },
        category: {
          name: '公告',
          color: '#3b82f6'
        }
      },
      {
        id: 'post_2',
        title: '今天的午餐真美味！',
        content: '在市中心發現了一家超讚的小餐廳，他們的義大利麵簡直是人間美味！推薦給大家。',
        wowCount: 8,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        author: {
          username: 'foodlover',
          profile: { displayName: '美食愛好者' }
        },
        category: {
          name: '美食',
          color: '#f97316'
        }
      },
      {
        id: 'post_3',
        title: '週末登山行',
        content: '這個週末去了陽明山，風景真的很美！空氣清新，心情都變好了。大家也來親近大自然吧！',
        wowCount: 12,
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        author: {
          username: 'hiker',
          profile: { displayName: '登山愛好者' }
        },
        category: {
          name: '旅遊',
          color: '#eab308'
        }
      }
    ]
    
    // 更新統計
    stats.users = 128
    stats.posts = posts.value.length
    stats.wows = posts.value.reduce((sum, post) => sum + post.wowCount, 0)
    stats.categories = 8
    
  } catch (err) {
    console.error('Fetch posts error:', err)
    error.value = '載入貼文時發生錯誤'
  } finally {
    loading.value = false
  }
}

// 處理 Wow 評價
const handleWow = async (postId) => {
  try {
    const response = await $fetch('/api/wows', {
      method: 'POST',
      body: { postId, category: 'like' }
    })
    
    if (response.success) {
      // 更新本地貼文的 wow 計數
      const post = posts.value.find(p => p.id === postId)
      if (post) {
        post.wowCount++
      }
    }
  } catch (err) {
    console.error('Wow error:', err)
  }
}

// 工具函數
const getInitials = (name) => {
  return name.substring(0, 2).toUpperCase()
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW')
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60000) return '剛剛'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分鐘前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小時前`
  return `${Math.floor(diff / 86400000)} 天前`
}

// 頁面載入時獲取資料
onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
