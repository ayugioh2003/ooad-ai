<template>
  <div class="wow-container py-8">
    <div class="max-w-2xl mx-auto">
      <!-- 頁面標題 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">個人設定</h1>
        <p class="text-gray-600">管理您的個人資料和偏好設定</p>
      </div>

      <!-- 個人資料設定 -->
      <div class="wow-card mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">個人資料</h2>
        
        <div class="space-y-6">
          <!-- 頭像區域 -->
          <div class="flex items-center space-x-6">
            <div class="w-20 h-20 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {{ userInitials }}
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900 mb-1">個人頭像</h3>
              <p class="text-sm text-gray-600 mb-3">目前使用文字頭像，未來將支援上傳圖片</p>
              <button class="wow-button-secondary" disabled>
                上傳頭像 (開發中)
              </button>
            </div>
          </div>

          <!-- 基本資料表單 -->
          <form @submit.prevent="saveProfile" class="space-y-4">
            <div>
              <label for="displayName" class="block text-sm font-medium text-gray-700 mb-2">
                顯示名稱
              </label>
              <input
                id="displayName"
                v-model="profileForm.displayName"
                type="text"
                class="wow-input"
                placeholder="請輸入顯示名稱"
              >
            </div>

            <div>
              <label for="bio" class="block text-sm font-medium text-gray-700 mb-2">
                個人簡介
              </label>
              <textarea
                id="bio"
                v-model="profileForm.bio"
                class="wow-input"
                rows="4"
                placeholder="介紹一下自己..."
              ></textarea>
              <p class="text-sm text-gray-500 mt-1">{{ profileForm.bio?.length || 0 }}/200 字元</p>
            </div>

            <div>
              <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
                所在地區
              </label>
              <input
                id="location"
                v-model="profileForm.location"
                type="text"
                class="wow-input"
                placeholder="例如：台北市"
              >
            </div>

            <div>
              <label for="website" class="block text-sm font-medium text-gray-700 mb-2">
                個人網站
              </label>
              <input
                id="website"
                v-model="profileForm.website"
                type="url"
                class="wow-input"
                placeholder="https://..."
              >
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="resetForm"
                class="wow-button-secondary"
              >
                重置
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="wow-button"
              >
                <span v-if="saving" class="inline-flex items-center">
                  <Icon name="heroicons:arrow-path" class="w-4 h-4 animate-spin mr-2" />
                  儲存中...
                </span>
                <span v-else>儲存變更</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- 帳戶安全 -->
      <div class="wow-card mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">帳戶安全</h2>
        
        <div class="space-y-4">
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Email 地址</h3>
              <p class="text-sm text-gray-600">{{ user?.email }}</p>
            </div>
            <button class="wow-button-secondary" disabled>
              變更 Email (開發中)
            </button>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <div>
              <h3 class="text-sm font-medium text-gray-900">密碼</h3>
              <p class="text-sm text-gray-600">定期更新密碼以保護帳戶安全</p>
            </div>
            <button class="wow-button-secondary" @click="showPasswordChange = true">
              變更密碼
            </button>
          </div>

          <div class="flex justify-between items-center py-3">
            <div>
              <h3 class="text-sm font-medium text-gray-900">帳戶狀態</h3>
              <p class="text-sm text-gray-600">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  啟用中
                </span>
              </p>
            </div>
            <button class="text-red-600 hover:text-red-700 text-sm font-medium" disabled>
              停用帳戶 (開發中)
            </button>
          </div>
        </div>
      </div>

      <!-- 隱私設定 -->
      <div class="wow-card">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">隱私設定</h2>
        
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-sm font-medium text-gray-900">公開個人資料</h3>
              <p class="text-sm text-gray-600">其他使用者可以查看您的基本資料</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="privacySettings.publicProfile" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-sm font-medium text-gray-900">顯示在排行榜</h3>
              <p class="text-sm text-gray-600">允許在公開排行榜中顯示您的名稱</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="privacySettings.showInRanking" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- 變更密碼對話框 -->
    <div
      v-if="showPasswordChange"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showPasswordChange = false"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">變更密碼</h3>
        
        <form @submit.prevent="changePassword" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">目前密碼</label>
            <input
              v-model="passwordForm.currentPassword"
              type="password"
              class="wow-input"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">新密碼</label>
            <input
              v-model="passwordForm.newPassword"
              type="password"
              class="wow-input"
              required
              minlength="6"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">確認新密碼</label>
            <input
              v-model="passwordForm.confirmPassword"
              type="password"
              class="wow-input"
              required
            >
          </div>

          <div v-if="passwordError" class="text-red-600 text-sm">
            {{ passwordError }}
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showPasswordChange = false"
              class="wow-button-secondary"
            >
              取消
            </button>
            <button
              type="submit"
              :disabled="changingPassword"
              class="wow-button"
            >
              <span v-if="changingPassword">變更中...</span>
              <span v-else>變更密碼</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 成功訊息 -->
    <div
      v-if="successMessage"
      class="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50"
    >
      <div class="flex items-center">
        <Icon name="heroicons:check-circle" class="w-5 h-5 mr-2" />
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 頁面標題
useHead({
  title: 'Aotter Wow - 個人設定'
})

// 認證檢查
const authStore = useAuthStore()
const user = computed(() => authStore.user)

// 如果未登入，重導向到登入頁面
if (!authStore.isLoggedIn) {
  await navigateTo('/auth')
}

// 使用者初始字母
const userInitials = computed(() => {
  const name = user.value?.profile?.displayName || user.value?.username || 'U'
  const words = name.split(' ')
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
})

// 表單資料
const profileForm = ref({
  displayName: user.value?.profile?.displayName || user.value?.username || '',
  bio: user.value?.profile?.bio || '',
  location: user.value?.profile?.location || '',
  website: user.value?.profile?.website || ''
})

const privacySettings = ref({
  publicProfile: true,
  showInRanking: true
})

// 密碼變更
const showPasswordChange = ref(false)
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 狀態
const saving = ref(false)
const changingPassword = ref(false)
const successMessage = ref('')
const passwordError = ref('')

// 重置表單
const resetForm = () => {
  profileForm.value = {
    displayName: user.value?.profile?.displayName || user.value?.username || '',
    bio: user.value?.profile?.bio || '',
    location: user.value?.profile?.location || '',
    website: user.value?.profile?.website || ''
  }
}

// 儲存個人資料
const saveProfile = async () => {
  saving.value = true
  try {
    // 這裡會呼叫 API 來更新個人資料
    // await $fetch(`/api/users/${user.value.id}/profile`, {
    //   method: 'PUT',
    //   body: profileForm.value
    // })
    
    // 模擬 API 呼叫
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    successMessage.value = '個人資料已更新'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('儲存失敗:', error)
  } finally {
    saving.value = false
  }
}

// 變更密碼
const changePassword = async () => {
  passwordError.value = ''
  
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    passwordError.value = '新密碼與確認密碼不符'
    return
  }
  
  if (passwordForm.value.newPassword.length < 6) {
    passwordError.value = '新密碼至少需要 6 個字元'
    return
  }
  
  changingPassword.value = true
  try {
    // 這裡會呼叫 API 來變更密碼
    // await $fetch('/api/auth/change-password', {
    //   method: 'POST',
    //   body: {
    //     currentPassword: passwordForm.value.currentPassword,
    //     newPassword: passwordForm.value.newPassword
    //   }
    // })
    
    // 模擬 API 呼叫
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showPasswordChange.value = false
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    
    successMessage.value = '密碼已變更'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    
  } catch (error) {
    console.error('密碼變更失敗:', error)
    passwordError.value = '密碼變更失敗，請檢查目前密碼是否正確'
  } finally {
    changingPassword.value = false
  }
}
</script>
