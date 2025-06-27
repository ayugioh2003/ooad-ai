<template>
  <div class="wow-container py-8">
    <!-- 使用者後台標題 -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">個人後台</h1>
      <p class="text-gray-600">管理您的個人資料和貼文</p>
    </div>

    <!-- 使用者資訊卡片 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- 使用者資料 -->
      <div class="lg:col-span-1">
        <div class="wow-card">
          <div class="text-center">
            <div class="w-20 h-20 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {{ userInitials }}
            </div>
            <h2 class="text-xl font-semibold text-gray-900 mb-1">{{ userDisplayName }}</h2>
            <p class="text-gray-600 mb-2">{{ user?.email }}</p>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {{ user?.role === 'admin' ? '管理員' : '一般會員' }}
            </span>
            <div class="mt-4 text-sm text-gray-500">
              <p>加入時間：{{ formatDate(user?.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 統計資訊 -->
      <div class="lg:col-span-2">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="wow-card text-center">
            <div class="text-2xl font-bold text-purple-600 mb-1">{{ stats.postsCount }}</div>
            <div class="text-sm text-gray-600">發布貼文</div>
          </div>
          <div class="wow-card text-center">
            <div class="text-2xl font-bold text-pink-600 mb-1">{{ stats.wowsReceived }}</div>
            <div class="text-sm text-gray-600">獲得 Wow</div>
          </div>
          <div class="wow-card text-center">
            <div class="text-2xl font-bold text-blue-600 mb-1">{{ stats.wowsGiven }}</div>
            <div class="text-sm text-gray-600">給出 Wow</div>
          </div>
          <div class="wow-card text-center">
            <div class="text-2xl font-bold text-green-600 mb-1">{{ stats.ranking || 'N/A' }}</div>
            <div class="text-sm text-gray-600">排名</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能選項卡 -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === tab.id
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <Icon :name="tab.icon" class="w-4 h-4 inline mr-2" />
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>

    <!-- 選項卡內容 -->
    <div class="min-h-[400px]">
      <!-- 我的貼文 -->
      <div v-if="activeTab === 'posts'" class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">我的貼文</h3>
          <NuxtLink to="/create" class="wow-button">
            <Icon name="heroicons:plus" class="w-4 h-4 mr-2" />
            發新貼文
          </NuxtLink>
        </div>
        
        <div v-if="loading" class="text-center py-8">
          <div class="wow-loading mx-auto mb-4"></div>
          <p class="text-gray-600">載入中...</p>
        </div>
        
        <div v-else-if="userPosts.length === 0" class="text-center py-12">
          <Icon name="heroicons:document-text" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600 mb-4">您還沒有發布任何貼文</p>
          <NuxtLink to="/create" class="wow-button">立即發文</NuxtLink>
        </div>
        
        <div v-else class="wow-grid">
          <div
            v-for="post in userPosts"
            :key="post.id"
            class="wow-card hover:shadow-lg transition-shadow"
          >
            <div class="flex justify-between items-start mb-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {{ post.category }}
              </span>
              <span class="text-xs text-gray-500">{{ formatDate(post.createdAt) }}</span>
            </div>
            <h4 class="font-semibold text-gray-900 mb-2">{{ post.title }}</h4>
            <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ post.content }}</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-2 text-sm text-gray-500">
                <Icon name="heroicons:star" class="w-4 h-4 text-yellow-400" />
                <span>{{ post.wowCount || 0 }} Wow</span>
              </div>
              <div class="flex space-x-2">
                <button class="text-blue-600 hover:text-blue-700 text-sm">編輯</button>
                <button class="text-red-600 hover:text-red-700 text-sm">刪除</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 我給出的 Wow -->
      <div v-else-if="activeTab === 'wows-given'" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">我給出的 Wow</h3>
        <div class="text-center py-12">
          <Icon name="heroicons:heart" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600">此功能開發中...</p>
        </div>
      </div>

      <!-- 我收到的 Wow -->
      <div v-else-if="activeTab === 'wows-received'" class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900">我收到的 Wow</h3>
        <div class="text-center py-12">
          <Icon name="heroicons:gift" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600">此功能開發中...</p>
        </div>
      </div>

      <!-- 帳戶設定 -->
      <div v-else-if="activeTab === 'settings'" class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900">帳戶設定</h3>
        
        <div class="wow-card">
          <h4 class="font-medium text-gray-900 mb-4">基本資料</h4>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">顯示名稱</label>
              <input
                type="text"
                :value="user?.profile?.displayName || user?.username"
                class="wow-input"
                placeholder="請輸入顯示名稱"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">個人簡介</label>
              <textarea
                :value="user?.profile?.bio"
                class="wow-input"
                rows="3"
                placeholder="介紹一下自己..."
              ></textarea>
            </div>
            <div class="flex justify-end">
              <button class="wow-button">儲存變更</button>
            </div>
          </div>
        </div>

        <div class="wow-card">
          <h4 class="font-medium text-gray-900 mb-4">安全設定</h4>
          <div class="space-y-4">
            <button class="wow-button-secondary">變更密碼</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 添加認證中間件
definePageMeta({
  middleware: 'auth'
})

// 頁面標題
useHead({
  title: 'Aotter Wow - 個人後台'
})

// 認證檢查
const authStore = useAuthStore()
const user = computed(() => authStore.user)

// 使用者顯示資訊
const userDisplayName = computed(() => {
  return user.value?.profile?.displayName || user.value?.username || '使用者'
})

const userInitials = computed(() => {
  const name = userDisplayName.value
  if (!name) return 'U'
  const words = name.split(' ')
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
})

// 選項卡配置
const activeTab = ref('posts')
const tabs = [
  { id: 'posts', name: '我的貼文', icon: 'heroicons:document-text' },
  { id: 'wows-given', name: '給出的 Wow', icon: 'heroicons:heart' },
  { id: 'wows-received', name: '收到的 Wow', icon: 'heroicons:gift' },
  { id: 'settings', name: '帳戶設定', icon: 'heroicons:cog-6-tooth' }
]

// 統計資料
const stats = ref({
  postsCount: 0,
  wowsReceived: 0,
  wowsGiven: 0,
  ranking: null
})

// 使用者貼文
const userPosts = ref([])
const loading = ref(false)

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// 載入使用者資料
const loadUserData = async () => {
  loading.value = true
  try {
    // 這裡可以添加 API 呼叫來載入使用者的貼文和統計資料
    // const [postsResponse, statsResponse] = await Promise.all([
    //   $fetch(`/api/users/${user.value.id}/posts`),
    //   $fetch(`/api/users/${user.value.id}/stats`)
    // ])
    
    // 暫時使用模擬資料
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    stats.value = {
      postsCount: 5,
      wowsReceived: 23,
      wowsGiven: 15,
      ranking: 12
    }
    
    userPosts.value = []
    
  } catch (error) {
    console.error('載入使用者資料失敗:', error)
  } finally {
    loading.value = false
  }
}

// 掛載時載入資料
onMounted(() => {
  loadUserData()
})
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
