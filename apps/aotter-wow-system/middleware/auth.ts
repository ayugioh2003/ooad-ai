export default defineNuxtRouteMiddleware((to, from) => {
  // 這裡應該檢查使用者是否已登入
  // 暫時先允許所有訪問，之後會實作完整的認證檢查
  
  // TODO: 實作認證檢查邏輯
  // const token = useCookie('auth-token');
  // if (!token.value) {
  //   return navigateTo('/auth');
  // }
});
