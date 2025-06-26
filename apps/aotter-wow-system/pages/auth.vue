<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo 和標題 -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          Aotter <span class="text-purple-600">Wow</span>
        </h1>
        <p class="text-gray-600">歡迎加入正向評價社群</p>
      </div>

      <!-- 切換按鈕 -->
      <div class="flex bg-gray-100 rounded-lg p-1">
        <button
          @click="isLogin = true"
          :class="[
            'flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all',
            isLogin
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          ]"
        >
          登入
        </button>
        <button
          @click="isLogin = false"
          :class="[
            'flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all',
            !isLogin
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          ]"
        >
          註冊
        </button>
      </div>

      <!-- 表單 -->
      <div class="wow-card">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- 使用者名稱（僅註冊時顯示） -->
          <div v-if="!isLogin">
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
              使用者名稱
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              required
              class="wow-input"
              placeholder="請輸入使用者名稱"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="wow-input"
              placeholder="請輸入 Email"
            />
          </div>

          <!-- 密碼 -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              密碼
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="wow-input"
              placeholder="請輸入密碼"
            />
          </div>

          <!-- 錯誤訊息 -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <!-- 成功訊息 -->
          <div v-if="success" class="bg-green-50 border border-green-200 rounded-md p-3">
            <p class="text-sm text-green-600">{{ success }}</p>
          </div>

          <!-- 提交按鈕 -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full wow-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              處理中...
            </span>
            <span v-else>{{ isLogin ? '登入' : '註冊' }}</span>
          </button>
        </form>
      </div>

      <!-- 底部說明 -->
      <div class="text-center">
        <p class="text-sm text-gray-600">
          {{ isLogin ? '還沒有帳號？' : '已經有帳號了？' }}
          <button
            @click="isLogin = !isLogin"
            class="text-purple-600 hover:text-purple-700 font-medium"
          >
            {{ isLogin ? '立即註冊' : '立即登入' }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserRegistration, UserLogin } from '~/types/user';

// 頁面標題
useHead({
  title: 'Aotter Wow - 登入 / 註冊'
});

// 響應式資料
const isLogin = ref(true);
const loading = ref(false);
const error = ref('');
const success = ref('');

const form = reactive({
  username: '',
  email: '',
  password: ''
});

// 清除訊息
watch([isLogin, form], () => {
  error.value = '';
  success.value = '';
});

// 處理表單提交
const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    if (isLogin.value) {
      // 登入
      const loginData: UserLogin = {
        email: form.email,
        password: form.password
      };

      const { data } = await $fetch('/api/auth/login', {
        method: 'POST',
        body: loginData
      });

      success.value = '登入成功！';
      
      // 延遲跳轉到首頁
      setTimeout(() => {
        navigateTo('/');
      }, 1000);

    } else {
      // 註冊
      const registrationData: UserRegistration = {
        username: form.username,
        email: form.email,
        password: form.password
      };

      const { data } = await $fetch('/api/auth/register', {
        method: 'POST',
        body: registrationData
      });

      success.value = '註冊成功！';
      
      // 延遲跳轉到首頁
      setTimeout(() => {
        navigateTo('/');
      }, 1000);
    }

  } catch (err: any) {
    console.error('Auth error:', err);
    error.value = err.data?.message || err.message || '操作失敗，請稍後再試';
  } finally {
    loading.value = false;
  }
};

// 清空表單
const clearForm = () => {
  form.username = '';
  form.email = '';
  form.password = '';
};

// 切換模式時清空表單
watch(isLogin, () => {
  clearForm();
});
</script>
