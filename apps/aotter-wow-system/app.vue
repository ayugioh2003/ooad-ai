<template>
  <div class="min-h-screen">
    <!-- 主要內容區域 -->
    <main class="min-h-screen bg-gray-50">
      <NuxtPage />
    </main>
    
    <!-- 頁尾 -->
    <footer class="bg-white border-t border-gray-200">
      <div class="wow-container py-8">
        <div class="text-center text-gray-600">
          <p>&copy; 2025 {{ $config.public.appName }}. OOAD 專案實作。</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// 應用程式配置
const config = useRuntimeConfig()

// 認證 store
const authStore = useAuthStore()

// 行動版選單狀態
const mobileMenuOpen = ref(false)

// 使用者選單狀態
const userMenuOpen = ref(false)
const userMenuRef = ref(null)

// 計算使用者顯示名稱和頭像初始字母
const userDisplayName = computed(() => {
  if (!authStore.user) return ''
  return authStore.user.profile?.displayName || authStore.user.username || '使用者'
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

// 處理登出
const handleLogout = async () => {
  userMenuOpen.value = false
  mobileMenuOpen.value = false
  await authStore.logout()
}

// 點擊外部關閉使用者選單
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    userMenuOpen.value = false
  }
}

// 監聽路由變化關閉選單
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
  userMenuOpen.value = false
})

// 掛載時檢查認證狀態和設置點擊外部監聽器
onMounted(() => {
  authStore.checkAuth()
  document.addEventListener('click', handleClickOutside)
})

// 卸載時清除監聽器
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 深色模式支援 (未來可以加入)
// const colorMode = useColorMode()
</script>

<style scoped>
/* 額外的組件特定樣式 */
.router-link-active {
  @apply text-purple-600 bg-purple-50;
}
</style>
