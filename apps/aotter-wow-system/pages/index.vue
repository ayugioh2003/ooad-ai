<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 導航欄 -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">
              Aotter <span class="text-purple-600">Wow</span>
            </h1>
          </div>

          <!-- 導航選單 -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <NuxtLink to="/" class="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                首頁
              </NuxtLink>
              <NuxtLink to="/ranking" class="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Wow 排行榜
              </NuxtLink>
              <NuxtLink to="/create" class="text-gray-500 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                發表貼文
              </NuxtLink>
            </div>
          </div>

          <!-- 使用者選單 -->
          <div class="flex items-center space-x-4">
            <template v-if="user">
              <span class="text-sm text-gray-700">歡迎，{{ user.username }}</span>
              <button
                @click="handleLogout"
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                登出
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/auth"
                class="wow-button"
              >
                登入 / 註冊
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要內容 -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- 歡迎區塊 -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">
          歡迎來到 Aotter Wow
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          分享美好事物，給予正向評價，讓世界更加美好！
        </p>
        
        <div v-if="!user" class="space-x-4">
          <NuxtLink to="/auth" class="wow-button">
            立即加入
          </NuxtLink>
          <button class="bg-white hover:bg-gray-50 text-purple-600 border border-purple-600 font-bold py-2 px-4 rounded-lg transition-all duration-200">
            了解更多
          </button>
        </div>
      </div>

      <!-- 功能介紹 -->
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div class="wow-card text-center">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">發表貼文</h3>
          <p class="text-gray-600">分享你的美好體驗，讓其他人也能發現好事物</p>
        </div>

        <div class="wow-card text-center">
          <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">給予 Wow</h3>
          <p class="text-gray-600">對喜歡的內容給予 Wow 評價，傳遞正向能量</p>
        </div>

        <div class="wow-card text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">查看排行</h3>
          <p class="text-gray-600">探索最受歡迎的內容，發現更多精彩</p>
        </div>
      </div>

      <!-- 最新貼文預覽 -->
      <div class="wow-card">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">最新貼文</h3>
        
        <div v-if="loading" class="text-center py-8">
          <div class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            載入中...
          </div>
        </div>

        <div v-else-if="posts.length === 0" class="text-center py-8 text-gray-500">
          還沒有任何貼文，成為第一個發文的人吧！
        </div>

        <div v-else class="space-y-4">
          <div v-for="post in posts" :key="post.id" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ post.title }}</h4>
                <p class="text-gray-600 mb-3">{{ post.content }}</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{{ post.author?.username }}</span>
                  <span>{{ post.category?.name }}</span>
                  <span>{{ formatDate(post.publishDate) }}</span>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button 
                  @click="handleWow(post.id, $event)"
                  class="flex items-center space-x-1 text-purple-600 hover:text-purple-700 heart-button"
                  :class="{ 'heart-pulse': wowingPostId === post.id }"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span>{{ post.wowCount }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-6">
          <NuxtLink to="/posts" class="text-purple-600 hover:text-purple-700 font-medium">
            查看更多貼文 →
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { UserPublic } from '~/types/user';
import type { Post } from '~/types/post';

// 頁面標題
useHead({
  title: 'Aotter Wow - 正向評價社群'
});

// 響應式資料
const user = ref<UserPublic | null>(null);
const posts = ref<Post[]>([]);
const loading = ref(true);
const wowingPostId = ref<number | null>(null);

// 格式化日期
const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString('zh-TW');
};

// 處理 Wow 點擊
const handleWow = async (postId: number, event: MouseEvent) => {
  // 設定正在處理的貼文 ID
  wowingPostId.value = postId;
  
  // 創建飄出的 "Wow" 文字動畫
  createWowAnimation(event);
  
  // 更新貼文的 Wow 數量
  const post = posts.value.find(p => p.id === postId);
  if (post) {
    post.wowCount += 1;
    
    // 為數字添加更新動畫
    const countElement = (event.currentTarget as HTMLButtonElement).querySelector('span');
    if (countElement) {
      countElement.style.animation = 'none';
      countElement.offsetHeight; // 觸發重排
      countElement.style.animation = 'countUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
  }
  
  // 這裡可以添加 API 呼叫來更新資料庫
  // try {
  //   await $fetch(`/api/posts/${postId}/wow`, { method: 'POST' });
  // } catch (error) {
  //   console.error('Wow API error:', error);
  // }
  
  // 重置狀態
  setTimeout(() => {
    wowingPostId.value = null;
  }, 600);
};

// 創建 Wow 飄出動畫
const createWowAnimation = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLButtonElement;
  const rect = button.getBoundingClientRect();
  
  // 創建多個動畫元素以增加效果
  const wowTexts = ['Wow!', '👍', '✨', '💫', '🎉'];
  // 隨機選擇 2-4 個元素顯示
  const numElements = Math.floor(Math.random() * 3) + 2;
  const selectedTexts = wowTexts.slice(0, numElements);
  
  selectedTexts.forEach((text, index) => {
    const wowElement = document.createElement('div');
    wowElement.textContent = text;
    wowElement.className = 'wow-float-animation';
    
    // 更大範圍的隨機位置偏移（大幅遠離愛心按鈕）
    const baseDistance = 120 + Math.random() * 200; // 120-320px 的基礎距離（大幅增加）
    const angle = (Math.random() * 360) * (Math.PI / 180); // 隨機角度（弧度）
    
    // 使用極坐標計算分散位置
    const randomOffsetX = Math.cos(angle) * baseDistance;
    const randomOffsetY = Math.sin(angle) * baseDistance;
    
    // 更大的額外隨機擾動
    const extraOffsetX = (Math.random() - 0.5) * 100; // ±50px
    const extraOffsetY = (Math.random() - 0.5) * 100; // ±50px
    
    const finalOffsetX = randomOffsetX + extraOffsetX;
    const finalOffsetY = randomOffsetY + extraOffsetY;
    
    // 確保不會超出視窗邊界
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementWidth = 120; // 增加估計元素寬度以給更多邊距
    
    let finalX = rect.left + rect.width / 2 + finalOffsetX;
    let finalY = rect.top + finalOffsetY;
    
    // 更寬鬆的邊界檢查
    if (finalX < elementWidth / 2) {
      finalX = elementWidth / 2 + 30;
    } else if (finalX > windowWidth - elementWidth / 2) {
      finalX = windowWidth - elementWidth / 2 - 30;
    }
    
    if (finalY < 80) { // 頂部留更多空間
      finalY = 80;
    } else if (finalY > windowHeight - 150) { // 底部留更多空間
      finalY = windowHeight - 150;
    }
    
    // 隨機大小（基於元素類型和隨機因子）
    const baseSizes = [24, 18, 16, 14, 20];
    const randomSizeMultiplier = 0.8 + Math.random() * 0.6;
    const finalSize = baseSizes[index % baseSizes.length] * randomSizeMultiplier;
    
    // 隨機顏色
    const colors = ['#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // 隨機旋轉角度
    const randomRotation = (Math.random() - 0.5) * 60; // -30 到 +30 度
    
    wowElement.style.position = 'fixed';
    wowElement.style.left = `${finalX}px`;
    wowElement.style.top = `${finalY}px`;
    wowElement.style.fontSize = `${finalSize}px`;
    wowElement.style.fontWeight = 'bold';
    wowElement.style.color = text === 'Wow!' ? randomColor : 'inherit';
    wowElement.style.pointerEvents = 'none';
    wowElement.style.zIndex = '9999';
    wowElement.style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg)`;
    wowElement.style.userSelect = 'none';
    wowElement.style.textShadow = '0 2px 4px rgba(0,0,0,0.2)';
    
    // 添加隨機的初始縮放
    const initialScale = 0.3 + Math.random() * 0.4;
    wowElement.style.setProperty('--initial-scale', initialScale.toString());
    wowElement.style.setProperty('--final-scale', (initialScale * 1.5).toString());
    wowElement.style.setProperty('--mid-scale', (initialScale * 2.2).toString());
    
    // 更大的隨機飄移距離和方向
    const floatDistance = 120 + Math.random() * 100; // 120-220px（增加飄移距離）
    const floatAngle = (Math.random() * 360) * (Math.PI / 180);
    const horizontalDrift = Math.cos(floatAngle) * (40 + Math.random() * 60); // 增加水平飄移
    const verticalDrift = Math.sin(floatAngle) * (40 + Math.random() * 60) - floatDistance; // 增加垂直飄移
    
    wowElement.style.setProperty('--horizontal-drift', `${horizontalDrift}px`);
    wowElement.style.setProperty('--vertical-drift', `${verticalDrift}px`);
    
    // 添加到 body
    document.body.appendChild(wowElement);
    
    // 延遲啟動動畫（隨機延遲）
    const randomDelay = Math.random() * 300;
    setTimeout(() => {
      wowElement.style.animation = `wowFloatScattered 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
    }, randomDelay);
    
    // 清理元素
    setTimeout(() => {
      if (document.body.contains(wowElement)) {
        document.body.removeChild(wowElement);
      }
    }, 2100 + randomDelay);
  });
};

// 處理登出
const handleLogout = async () => {
  try {
    await $fetch('/api/auth/logout', {
      method: 'POST'
    });
    
    user.value = null;
    await navigateTo('/auth');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// 載入最新貼文
const loadPosts = async () => {
  try {
    loading.value = true;
    // 這裡先模擬資料，稍後會實作實際的 API
    posts.value = [
      {
        id: 1,
        title: '超可愛的小貓咪',
        content: '今天在公園遇到一隻超可愛的小貓，真的太療癒了！',
        publishDate: new Date(),
        authorId: 1,
        categoryId: 1,
        wowCount: 15,
        author: { id: 1, username: '愛貓人士' },
        category: { id: 1, name: '動物' }
      },
      {
        id: 2,
        title: '美味的拉麵店',
        content: '發現一家超好吃的拉麵店，湯頭濃郁，麵條Q彈，強烈推薦！',
        publishDate: new Date(Date.now() - 86400000),
        authorId: 2,
        categoryId: 2,
        wowCount: 23,
        author: { id: 2, username: '美食探險家' },
        category: { id: 2, name: '美食' }
      }
    ];
  } catch (error) {
    console.error('Load posts error:', error);
  } finally {
    loading.value = false;
  }
};

// 頁面載入時執行
onMounted(() => {
  loadPosts();
});
</script>

<style scoped>
/* 原有的 Wow 飄出動畫 */
@keyframes wowFloat {
  0% {
    transform: translate(-50%, 0) scale(0.5) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: translate(-50%, -30px) scale(1.2) rotate(5deg);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -60px) scale(1) rotate(-5deg);
    opacity: 0.8;
  }
  75% {
    transform: translate(-50%, -90px) scale(1.1) rotate(3deg);
    opacity: 0.4;
  }
  100% {
    transform: translate(-50%, -120px) scale(0.8) rotate(0deg);
    opacity: 0;
  }
}

/* 新的分散式飄出動畫 */
@keyframes wowFloatScattered {
  0% {
    transform: translate(-50%, -50%) scale(var(--initial-scale, 0.3)) rotate(0deg);
    opacity: 0;
    filter: blur(0px);
  }
  10% {
    transform: translate(-50%, -50%) scale(var(--mid-scale, 1.5)) rotate(5deg);
    opacity: 1;
    filter: blur(0px);
  }
  25% {
    transform: translate(calc(-50% + var(--horizontal-drift, 0px) * 0.2), calc(-50% + var(--vertical-drift, 0px) * 0.2)) scale(var(--final-scale, 1.2)) rotate(-8deg);
    opacity: 1;
    filter: blur(0px);
  }
  50% {
    transform: translate(calc(-50% + var(--horizontal-drift, 0px) * 0.6), calc(-50% + var(--vertical-drift, 0px) * 0.6)) scale(calc(var(--final-scale, 1.2) * 1.1)) rotate(10deg);
    opacity: 0.9;
    filter: blur(0.5px);
  }
  75% {
    transform: translate(calc(-50% + var(--horizontal-drift, 0px) * 0.85), calc(-50% + var(--vertical-drift, 0px) * 0.85)) scale(var(--final-scale, 1.2)) rotate(-5deg);
    opacity: 0.5;
    filter: blur(1px);
  }
  90% {
    transform: translate(calc(-50% + var(--horizontal-drift, 0px)), calc(-50% + var(--vertical-drift, 0px))) scale(calc(var(--final-scale, 1.2) * 0.7)) rotate(3deg);
    opacity: 0.2;
    filter: blur(1.5px);
  }
  100% {
    transform: translate(calc(-50% + var(--horizontal-drift, 0px)), calc(-50% + var(--vertical-drift, 0px))) scale(calc(var(--final-scale, 1.2) * 0.3)) rotate(0deg);
    opacity: 0;
    filter: blur(2px);
  }
}

.wow-float-animation {
  animation: wowFloatScattered 2.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  will-change: transform, opacity, filter;
}

/* 愛心按鈕懸停效果 */
.heart-button {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}

.heart-button:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 8px rgba(124, 58, 237, 0.3));
}

.heart-button:active {
  transform: scale(0.95);
}

/* 點擊時的脈衝效果 */
.heart-pulse {
  animation: heartPulse 0.6s ease-in-out;
}

@keyframes heartPulse {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2);
    filter: brightness(1.2) drop-shadow(0 0 10px rgba(124, 58, 237, 0.5));
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(1.15);
    filter: brightness(1.1) drop-shadow(0 0 8px rgba(124, 58, 237, 0.4));
  }
  100% {
    transform: scale(1);
  }
}

/* 貼文卡片懸停效果 */
.wow-card {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.wow-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
}

/* 添加一些微妙的光暈效果 */
.heart-button:hover svg {
  filter: drop-shadow(0 0 6px rgba(124, 58, 237, 0.4));
}

/* 數字更新動畫 */
@keyframes countUp {
  0% {
    transform: translateY(20px) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateY(-5px) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.count-animation {
  animation: countUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 響應式調整 */
@media (max-width: 768px) {
  @keyframes wowFloatRandom {
    0% {
      transform: translate(-50%, 0) scale(calc(var(--initial-scale, 0.5) * 0.8)) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translate(calc(-50% + var(--horizontal-drift, 0px) * 0.7), calc(var(--float-distance, -120px) * 0.8)) scale(calc(var(--final-scale, 1) * 0.4)) rotate(0deg);
      opacity: 0;
    }
  }
}
</style>
