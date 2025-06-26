<template>
  <div class="wow-container py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">登入狀態測試</h1>
    
    <div class="wow-card">
      <h2 class="text-xl font-semibold mb-4">目前登入狀態</h2>
      
      <div v-if="authStore?.isLoggedIn" class="space-y-4">
        <div class="text-green-600 font-medium">✓ 已登入</div>
        
        <div class="space-y-2">
          <p><strong>使用者名稱:</strong> {{ authStore.user?.username }}</p>
          <p><strong>Email:</strong> {{ authStore.user?.email }}</p>
          <p><strong>顯示名稱:</strong> {{ authStore.user?.profile?.displayName }}</p>
          <p><strong>角色:</strong> {{ authStore.user?.role }}</p>
        </div>
        
        <div class="flex space-x-4">
          <NuxtLink to="/dashboard" class="wow-button">前往個人後台</NuxtLink>
          <NuxtLink to="/profile" class="wow-button-secondary">個人設定</NuxtLink>
          <button @click="handleLogout" class="wow-button-secondary">登出</button>
        </div>
      </div>
      
      <div v-else class="space-y-4">
        <div class="text-red-600 font-medium">✗ 未登入</div>
        <NuxtLink to="/auth" class="wow-button">前往登入</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestAuth',
  computed: {
    authStore() {
      return this.$pinia ? useAuthStore() : null
    }
  },
  mounted() {
    // 檢查登入狀態
    if (this.authStore && process.client) {
      this.authStore.checkAuth()
    }
  },
  methods: {
    async handleLogout() {
      if (this.authStore) {
        await this.authStore.logout()
      }
    }
  }
}
</script>
