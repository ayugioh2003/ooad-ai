export const useAuthStore = defineStore('auth', () => {
  // 狀態
  const user = ref(null)
  const token = ref('')
  const isLoggedIn = computed(() => !!user.value && !!token.value)

  // 登入
  const login = async (email: string, password: string) => {
    try {
      const { data } = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      if (data?.user && data?.token) {
        user.value = data.user
        token.value = data.token
        
        // 設定 cookie
        const authCookie = useCookie('auth-token', {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7 // 7 days
        })
        authCookie.value = data.token

        return { success: true, user: data.user }
      }
      
      return { success: false, error: 'Login failed' }
    } catch (error: any) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.data?.message || 'Login failed' 
      }
    }
  }

  // 註冊
  const register = async (userData: any) => {
    try {
      const { data } = await $fetch('/api/auth/register', {
        method: 'POST',
        body: userData
      })

      if (data?.user && data?.token) {
        user.value = data.user
        token.value = data.token
        
        // 設定 cookie
        const authCookie = useCookie('auth-token')
        authCookie.value = data.token

        return { success: true, user: data.user }
      }
      
      return { success: false, error: 'Registration failed' }
    } catch (error: any) {
      console.error('Register error:', error)
      return { 
        success: false, 
        error: error.data?.message || 'Registration failed' 
      }
    }
  }

  // 登出
  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // 清除狀態
      user.value = null
      token.value = ''
      
      // 清除 cookie
      const authCookie = useCookie('auth-token')
      authCookie.value = null
      
      // 導向首頁
      await navigateTo('/')
    }
  }

  // 檢查認證狀態
  const checkAuth = async () => {
    const authCookie = useCookie('auth-token')
    if (!authCookie.value) {
      return false
    }

    try {
      // 這裡可以添加驗證 token 的 API 呼叫
      // const { data } = await $fetch('/api/auth/verify')
      // 暫時直接設定 token
      token.value = authCookie.value
      return true
    } catch (error) {
      console.error('Auth check error:', error)
      await logout()
      return false
    }
  }

  return {
    // 狀態
    user: readonly(user),
    token: readonly(token),
    isLoggedIn,
    
    // 方法
    login,
    register,
    logout,
    checkAuth
  }
})
