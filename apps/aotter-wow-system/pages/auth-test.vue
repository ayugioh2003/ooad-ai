<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ isLogin ? '登入帳號' : '註冊帳號' }}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- 註冊時的用戶名 -->
          <div v-if="!isLogin">
            <label for="username" class="block text-sm font-medium text-gray-700">
              用戶名
            </label>
            <div class="mt-1">
              <input
                id="username"
                v-model="form.username"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <!-- 密碼 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              密碼
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <!-- 註冊時的顯示名稱 -->
          <div v-if="!isLogin">
            <label for="displayName" class="block text-sm font-medium text-gray-700">
              顯示名稱 (可選)
            </label>
            <div class="mt-1">
              <input
                id="displayName"
                v-model="form.displayName"
                type="text"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <!-- 錯誤訊息 -->
          <div v-if="error" class="text-red-600 text-sm">
            {{ error }}
          </div>

          <!-- 成功訊息 -->
          <div v-if="success" class="text-green-600 text-sm">
            {{ success }}
          </div>

          <!-- 提交按鈕 -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {{ loading ? '處理中...' : (isLogin ? '登入' : '註冊') }}
            </button>
          </div>
        </form>

        <!-- 切換登入/註冊 -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                {{ isLogin ? '還沒有帳號？' : '已有帳號？' }}
              </span>
            </div>
          </div>

          <div class="mt-6">
            <button
              @click="toggleMode"
              class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              {{ isLogin ? '註冊新帳號' : '登入現有帳號' }}
            </button>
          </div>
        </div>

        <!-- 用戶狀態 -->
        <div v-if="authStore.isLoggedIn" class="mt-6 p-4 bg-green-50 rounded-md">
          <h3 class="text-sm font-medium text-green-800">已登入用戶</h3>
          <div class="mt-2 text-sm text-green-700">
            <p>用戶名: {{ authStore.user?.username }}</p>
            <p>Email: {{ authStore.user?.email }}</p>
            <p>角色: {{ authStore.user?.role }}</p>
          </div>
          <button
            @click="handleLogout"
            class="mt-2 text-sm text-green-600 hover:text-green-500"
          >
            登出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore()

// 狀態
const isLogin = ref(true)
const loading = ref(false)
const error = ref('')
const success = ref('')

// 表單資料
const form = reactive({
  username: '',
  email: '',
  password: '',
  displayName: ''
})

// 切換登入/註冊模式
const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  success.value = ''
  // 清空表單
  Object.keys(form).forEach(key => {
    form[key] = ''
  })
}

// 處理表單提交
const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    let result
    
    if (isLogin.value) {
      // 登入
      result = await authStore.login(form.email, form.password)
    } else {
      // 註冊
      result = await authStore.register({
        username: form.username,
        email: form.email,
        password: form.password,
        displayName: form.displayName || form.username
      })
    }

    if (result.success) {
      success.value = isLogin.value ? '登入成功！' : '註冊成功！'
      // 清空表單
      Object.keys(form).forEach(key => {
        form[key] = ''
      })
    } else {
      error.value = result.error || '操作失敗'
    }
  } catch (err) {
    error.value = '發生未知錯誤'
    console.error('Form submit error:', err)
  } finally {
    loading.value = false
  }
}

// 登出
const handleLogout = async () => {
  await authStore.logout()
  success.value = '已成功登出'
  error.value = ''
}
</script>
