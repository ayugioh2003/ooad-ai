<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 導航欄 -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-gray-900">
              Aotter <span class="text-purple-600">Wow</span>
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="text-gray-600 hover:text-purple-600">
              回到首頁
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要內容 -->
    <main class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="wow-card">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">發表新貼文</h1>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- 標題 -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              標題 *
            </label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              maxlength="200"
              class="wow-input"
              placeholder="請輸入貼文標題"
            />
            <p class="mt-1 text-sm text-gray-500">{{ form.title.length }}/200 字元</p>
          </div>

          <!-- 類別 -->
          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
              類別 *
            </label>
            <select
              id="category"
              v-model="form.categoryId"
              required
              class="wow-input"
            >
              <option value="">請選擇類別</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- 內容 -->
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
              內容 *
            </label>
            <textarea
              id="content"
              v-model="form.content"
              required
              rows="8"
              maxlength="5000"
              class="wow-input resize-none"
              placeholder="分享你的美好體驗..."
            ></textarea>
            <p class="mt-1 text-sm text-gray-500">{{ form.content.length }}/5000 字元</p>
          </div>

          <!-- 錯誤訊息 -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-3">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <!-- 成功訊息 -->
          <div v-if="success" class="bg-green-50 border border-green-200 rounded-md p-3">
            <p class="text-sm text-green-600">{{ success }}</p>
          </div>

          <!-- 按鈕組 -->
          <div class="flex items-center justify-between">
            <button
              type="button"
              @click="clearForm"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors"
            >
              清空內容
            </button>

            <div class="space-x-4">
              <NuxtLink
                to="/"
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors"
              >
                取消
              </NuxtLink>
              
              <button
                type="submit"
                :disabled="loading"
                class="wow-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="inline-flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  發表中...
                </span>
                <span v-else>發表貼文</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- 貼文預覽 -->
      <div v-if="form.title || form.content" class="wow-card mt-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4">預覽</h2>
        <div class="border border-gray-200 rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ form.title || '標題預覽' }}
          </h3>
          <p class="text-gray-600 mb-3 whitespace-pre-wrap">
            {{ form.content || '內容預覽' }}
          </p>
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <span>您的名稱</span>
            <span>{{ selectedCategoryName || '未選擇類別' }}</span>
            <span>{{ new Date().toLocaleDateString('zh-TW') }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Category, PostCreate } from '~/types/post';

// 頁面標題和 meta
useHead({
  title: 'Aotter Wow - 發表貼文'
});

// 檢查登入狀態
definePageMeta({
  middleware: 'auth'
});

// 響應式資料
const loading = ref(false);
const error = ref('');
const success = ref('');
const categories = ref<Category[]>([]);

const form = reactive({
  title: '',
  content: '',
  categoryId: ''
});

// 計算屬性
const selectedCategoryName = computed(() => {
  if (!form.categoryId) return '';
  const category = categories.value.find(c => c.id === Number(form.categoryId));
  return category?.name || '';
});

// 載入類別
const loadCategories = async () => {
  try {
    const { data } = await $fetch('/api/categories');
    categories.value = data || [];
  } catch (err) {
    console.error('Load categories error:', err);
    error.value = '載入類別失敗';
  }
};

// 清空表單
const clearForm = () => {
  form.title = '';
  form.content = '';
  form.categoryId = '';
  error.value = '';
  success.value = '';
};

// 處理表單提交
const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    // 驗證表單
    if (!form.title.trim()) {
      error.value = '請輸入標題';
      return;
    }

    if (!form.content.trim()) {
      error.value = '請輸入內容';
      return;
    }

    if (!form.categoryId) {
      error.value = '請選擇類別';
      return;
    }

    const postData: PostCreate = {
      title: form.title.trim(),
      content: form.content.trim(),
      categoryId: Number(form.categoryId)
    };

    const { data } = await $fetch('/api/posts', {
      method: 'POST',
      body: postData
    });

    success.value = '貼文發表成功！';
    
    // 延遲跳轉到首頁
    setTimeout(() => {
      navigateTo('/');
    }, 1500);

  } catch (err: any) {
    console.error('Submit post error:', err);
    error.value = err.data?.message || err.message || '發表失敗，請稍後再試';
  } finally {
    loading.value = false;
  }
};

// 頁面載入時執行
onMounted(() => {
  loadCategories();
});

// 監聽表單變化，清除錯誤訊息
watch([() => form.title, () => form.content, () => form.categoryId], () => {
  if (error.value) {
    error.value = '';
  }
});
</script>
