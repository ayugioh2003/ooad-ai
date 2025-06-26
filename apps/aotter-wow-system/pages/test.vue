<template>
  <div class="wow-container py-8">
    <!-- 用戶狀態測試 -->
    <div class="wow-card mb-8">
      <h2 class="text-2xl font-semibold mb-4">用戶狀態管理測試</h2>
      
      <div v-if="!isLoggedIn" class="space-y-4">
        <p class="text-gray-600">目前未登入</p>
        <div class="flex space-x-4">
          <button @click="testLogin" class="wow-button">
            模擬登入
          </button>
          <NuxtLink to="/auth" class="wow-button-secondary">
            前往登入頁
          </NuxtLink>
        </div>
      </div>
      
      <div v-else class="space-y-4">
        <p class="text-green-600">已登入用戶：{{ currentUser?.username }}</p>
        <button @click="testLogout" class="wow-button-secondary">
          登出
        </button>
      </div>
    </div>

    <!-- Wow 評價測試 -->
    <div class="wow-card mb-8">
      <h2 class="text-2xl font-semibold mb-4">Wow 評價功能測試</h2>
      
      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <span>測試貼文 ID: post_1</span>
          <button 
            @click="testWow('post_1', 'like')"
            class="wow-button"
            :disabled="wowLoading"
          >
            {{ wowLoading ? '處理中...' : '❤️ 點讚' }}
          </button>
          <button 
            @click="testWow('post_1', 'wow')"
            class="wow-button"
            :disabled="wowLoading"
          >
            {{ wowLoading ? '處理中...' : '😮 驚艷' }}
          </button>
        </div>
        
        <div v-if="wowResult" class="p-4 rounded-md" :class="wowResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'">
          <p class="font-medium">{{ wowResult.success ? '成功' : '失敗' }}</p>
          <p class="text-sm mt-1">{{ wowResult.message }}</p>
          <pre v-if="wowResult.data" class="text-xs mt-2 p-2 bg-gray-100 rounded">{{ JSON.stringify(wowResult.data, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- API 測試 -->
    <div class="wow-card mb-8">
      <h2 class="text-2xl font-semibold mb-4">API 端點測試</h2>
      
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button @click="testAPI('/api/categories')" class="wow-button-outline">
            測試分類 API
          </button>
          <button @click="testAPI('/api/posts')" class="wow-button-outline">
            測試貼文 API
          </button>
        </div>
        
        <div v-if="apiResult" class="p-4 bg-gray-50 rounded-md">
          <p class="font-medium mb-2">API 回應:</p>
          <pre class="text-sm overflow-auto">{{ JSON.stringify(apiResult, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- 功能展示 -->
    <div class="wow-card">
      <h2 class="text-2xl font-semibold mb-4">已完成的核心功能</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-3">
          <h3 class="font-semibold text-green-600">✅ 已實作</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>專案基礎架構 (Nuxt 3 + TypeScript)</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>資料型別定義與架構設計</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>記憶體資料庫實作</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>API 端點基礎架構</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>前端頁面與組件</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>響應式 UI 設計</span>
            </li>
          </ul>
        </div>
        
        <div class="space-y-3">
          <h3 class="font-semibold text-yellow-600">🔄 進行中</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>API TypeScript 類型修正</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>Wow 評價功能實作</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>用戶認證狀態管理</span>
            </li>
            <li class="flex items-center space-x-2">
              <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>貼文 CRUD 功能</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 頁面配置
useHead({
  title: '功能測試 - Aotter Wow 系統'
})

// 狀態管理
const currentUser = ref(null)
const isLoggedIn = computed(() => !!currentUser.value)
const wowLoading = ref(false)
const wowResult = ref(null)
const apiResult = ref(null)

// 模擬登入
const testLogin = () => {
  currentUser.value = {
    id: 'user_1',
    username: 'testuser',
    email: 'test@example.com'
  }
}

// 模擬登出
const testLogout = () => {
  currentUser.value = null
  wowResult.value = null
}

// 測試 Wow 評價
const testWow = async (postId, category) => {
  wowLoading.value = true
  wowResult.value = null
  
  try {
    const response = await $fetch('/api/wows', {
      method: 'POST',
      body: { postId, category }
    })
    
    wowResult.value = {
      success: true,
      message: '成功發送 Wow 評價！',
      data: response
    }
  } catch (error) {
    wowResult.value = {
      success: false,
      message: error.data?.message || error.message || '發送失敗'
    }
  } finally {
    wowLoading.value = false
  }
}

// 測試 API
const testAPI = async (endpoint) => {
  try {
    const response = await $fetch(endpoint)
    apiResult.value = response
  } catch (error) {
    apiResult.value = {
      error: true,
      message: error.data?.message || error.message || 'API 呼叫失敗'
    }
  }
}
</script>
