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
            <NuxtLink to="/create" class="wow-button">
              發表貼文
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要內容 -->
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <!-- 標題區域 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          🏆 Wow 排行榜
        </h1>
        <p class="text-xl text-gray-600">
          發現最受歡迎的精彩內容
        </p>
      </div>

      <!-- 篩選選項 -->
      <div class="wow-card mb-8">
        <div class="flex flex-wrap items-center gap-4">
          <div>
            <label for="category-filter" class="block text-sm font-medium text-gray-700 mb-1">
              類別篩選
            </label>
            <select
              id="category-filter"
              v-model="selectedCategory"
              class="wow-input w-48"
              @change="loadRanking"
            >
              <option value="">所有類別</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div>
            <label for="limit-filter" class="block text-sm font-medium text-gray-700 mb-1">
              顯示數量
            </label>
            <select
              id="limit-filter"
              v-model="limit"
              class="wow-input w-32"
              @change="loadRanking"
            >
              <option value="10">前 10 名</option>
              <option value="20">前 20 名</option>
              <option value="50">前 50 名</option>
            </select>
          </div>

          <div class="flex-1"></div>

          <button
            @click="loadRanking"
            class="bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            重新整理
          </button>
        </div>
      </div>

      <!-- 載入狀態 -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-lg text-gray-600">載入排行榜中...</span>
        </div>
      </div>

      <!-- 錯誤訊息 -->
      <div v-else-if="error" class="text-center py-12">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p class="text-red-600">{{ error }}</p>
          <button
            @click="loadRanking"
            class="mt-4 wow-button"
          >
            重試
          </button>
        </div>
      </div>

      <!-- 排行榜內容 -->
      <div v-else-if="posts.length === 0" class="text-center py-12">
        <div class="text-gray-500">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-lg">目前還沒有貼文</p>
          <p class="text-sm mt-2">成為第一個發文的人吧！</p>
          <NuxtLink to="/create" class="wow-button mt-4 inline-block">
            立即發文
          </NuxtLink>
        </div>
      </div>

      <!-- 排行榜列表 -->
      <div v-else class="space-y-4">
        <div
          v-for="(post, index) in posts"
          :key="post.id"
          class="wow-card hover:shadow-lg transition-all duration-200"
        >
          <div class="flex items-start space-x-4">
            <!-- 排名 -->
            <div class="flex-shrin-0">
              <div :class="[
                'w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg',
                index === 0 ? 'bg-yellow-100 text-yellow-800' :
                index === 1 ? 'bg-gray-100 text-gray-800' :
                index === 2 ? 'bg-orange-100 text-orange-800' :
                'bg-purple-100 text-purple-800'
              ]">
                {{ index + 1 }}
              </div>
            </div>

            <!-- 貼文內容 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">
                    {{ post.title }}
                  </h3>
                  <p class="text-gray-600 mb-3 line-clamp-2">
                    {{ post.content }}
                  </p>
                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      {{ post.author?.username }}
                    </span>
                    <span class="flex items-center">
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                      {{ post.category?.name }}
                    </span>
                    <span>{{ formatDate(post.publishDate) }}</span>
                  </div>
                </div>

                <!-- Wow 計數 -->
                <div class="flex items-center space-x-2 ml-4">
                  <div class="flex items-center space-x-1 bg-purple-50 text-purple-600 px-3 py-2 rounded-full">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span class="font-bold">{{ post.wowCount }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 載入更多按鈕 -->
      <div v-if="posts.length >= limit && !loading" class="text-center mt-8">
        <button
          @click="increaseLimit"
          class="bg-white hover:bg-gray-50 text-purple-600 border border-purple-600 font-bold py-2 px-6 rounded-lg transition-all duration-200"
        >
          顯示更多
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Post, Category } from '~/types/post';

// 頁面標題
useHead({
  title: 'Aotter Wow - Wow 排行榜'
});

// 響應式資料
const loading = ref(true);
const error = ref('');
const posts = ref<Post[]>([]);
const categories = ref<Category[]>([]);
const selectedCategory = ref('');
const limit = ref(10);

// 格式化日期
const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString('zh-TW');
};

// 增加顯示數量
const increaseLimit = () => {
  limit.value += 10;
  loadRanking();
};

// 載入類別
const loadCategories = async () => {
  try {
    const { data } = await $fetch('/api/categories');
    categories.value = data || [];
  } catch (err) {
    console.error('Load categories error:', err);
  }
};

// 載入排行榜
const loadRanking = async () => {
  try {
    loading.value = true;
    error.value = '';

    // 這裡暫時使用模擬資料，稍後會實作實際的 API
    await new Promise(resolve => setTimeout(resolve, 500)); // 模擬載入延遲

    // 模擬排行榜資料
    const mockPosts: Post[] = [
      {
        id: 1,
        title: '超可愛的小貓咪在公園玩耍',
        content: '今天在公園看到一隻超級可愛的小貓咪，牠在草地上翻滾玩耍，實在太療癒了！忍不住拍了好多照片和影片，希望大家也能感受到這份可愛。',
        publishDate: new Date('2024-01-15'),
        authorId: 1,
        categoryId: 1,
        wowCount: 156,
        author: { id: 1, username: '愛貓人士' },
        category: { id: 1, name: '動物' }
      },
      {
        id: 2,
        title: '隱藏版美食：巷弄裡的神級拉麵店',
        content: '發現一家超棒的拉麵店！湯頭濃郁但不油膩，麵條Q彈有嚼勁，叉燒肉更是入口即化。老闆人很親切，價格也很實惠。強烈推薦給所有拉麵愛好者！',
        publishDate: new Date('2024-01-14'),
        authorId: 2,
        categoryId: 2,
        wowCount: 142,
        author: { id: 2, username: '美食探險家' },
        category: { id: 2, name: '美食' }
      },
      {
        id: 3,
        title: '陽明山賞花秘境分享',
        content: '春天來了！陽明山的櫻花正盛開，今天去了一個比較少人知道的賞花點，景色絕美而且人少安靜。分享給大家這個賞花秘境的位置和最佳拍照時間。',
        publishDate: new Date('2024-01-13'),
        authorId: 3,
        categoryId: 3,
        wowCount: 128,
        author: { id: 3, username: '旅遊達人' },
        category: { id: 3, name: '旅遊' }
      },
      {
        id: 4,
        title: '超暖心的便利商店店員',
        content: '昨天在便利商店遇到一位超級暖心的店員，不僅服務態度很好，還主動幫我解決了很多問題。這種優質的服務真的讓人印象深刻，必須要推薦一下！',
        publishDate: new Date('2024-01-12'),
        authorId: 4,
        categoryId: 4,
        wowCount: 95,
        author: { id: 4, username: '暖心市民' },
        category: { id: 4, name: '服務' }
      },
      {
        id: 5,
        title: '生活小技巧：超好用的收納方法',
        content: '分享一個超實用的收納小技巧！用這個方法整理衣櫃，不僅空間利用率提高了，找衣服也變得超方便。希望對大家的日常生活有幫助。',
        publishDate: new Date('2024-01-11'),
        authorId: 5,
        categoryId: 5,
        wowCount: 87,
        author: { id: 5, username: '生活達人' },
        category: { id: 5, name: '生活' }
      }
    ];

    // 根據類別篩選
    let filteredPosts = mockPosts;
    if (selectedCategory.value) {
      filteredPosts = mockPosts.filter(post => post.categoryId === Number(selectedCategory.value));
    }

    // 根據數量限制
    posts.value = filteredPosts.slice(0, limit.value);

  } catch (err: any) {
    console.error('Load ranking error:', err);
    error.value = '載入排行榜失敗，請稍後再試';
  } finally {
    loading.value = false;
  }
};

// 頁面載入時執行
onMounted(async () => {
  await loadCategories();
  await loadRanking();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
