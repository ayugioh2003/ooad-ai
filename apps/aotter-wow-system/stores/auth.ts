export const useAuthStore = defineStore('auth', () => {
  // 狀態
  const user = ref<any>(null)
  const token = ref<string>('')
  const isLoggedIn = computed(() => !!user.value && !!token.value)

  // 登入
  const login = async (email: string, password: string) => {
    try {
      const response: any = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      if (response.success && response.data?.user && response.data?.token) {
        user.value = response.data.user
        token.value = response.data.token
        
        // 保存到 cookie
        if (process.client) {
          const authCookie = useCookie('auth-token', {
            maxAge: 60 * 60 * 24 * 7, // 7 天
            secure: false, // 開發環境設為 false
            sameSite: 'lax'
          })
          authCookie.value = response.data.token
          
          const userCookie = useCookie('auth-user', {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            sameSite: 'lax'
          })
          userCookie.value = JSON.stringify(response.data.user)
        }
        
        return { success: true, user: response.data.user }
      }
      
      return { success: false, error: response.message || 'Login failed' }
    } catch (error: any) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.data?.message || error.message || 'Login failed' 
      }
    }
  }

  // 註冊
  const register = async (userData: any) => {
    try {
      const response: any = await $fetch('/api/auth/register', {
        method: 'POST',
        body: userData
      })

      if (response.success && response.data?.user && response.data?.token) {
        user.value = response.data.user
        token.value = response.data.token
        
        // 保存到 cookie
        if (process.client) {
          const authCookie = useCookie('auth-token', {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            sameSite: 'lax'
          })
          authCookie.value = response.data.token
          
          const userCookie = useCookie('auth-user', {
            maxAge: 60 * 60 * 24 * 7,
            secure: false,
            sameSite: 'lax'
          })
          userCookie.value = JSON.stringify(response.data.user)
        }
        
        return { success: true, user: response.data.user }
      }
      
      return { success: false, error: response.message || 'Registration failed' }
    } catch (error: any) {
      console.error('Register error:', error)
      return { 
        success: false, 
        error: error.data?.message || error.message || 'Registration failed' 
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
      if (process.client) {
        const authCookie = useCookie('auth-token')
        const userCookie = useCookie('auth-user')
        authCookie.value = null
        userCookie.value = null
        
        // 導向首頁
        await navigateTo('/')
      }
    }
  }

  // 檢查認證狀態
  const checkAuth = async () => {
    if (process.server) return false
    
    try {
      const authCookie = useCookie('auth-token')
      const userCookie = useCookie('auth-user')
      
      if (!authCookie.value || !userCookie.value) {
        return false
      }

      // 恢復使用者狀態
      token.value = authCookie.value as string
      user.value = JSON.parse(userCookie.value as string)
      
      // 這裡可以添加驗證 token 的 API 呼叫
      // const { data } = await $fetch('/api/auth/verify', {
      //   headers: { Authorization: `Bearer ${token.value}` }
      // })
      
      return true
    } catch (error) {
      console.error('Auth check error:', error)
      await logout()
      return false
    }
  }

  return {
    // 狀態
    user,
    token,
    isLoggedIn,
    
    // 方法
    login,
    register,
    logout,
    checkAuth
  }
})
