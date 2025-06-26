// Wow 評價類型
export enum WowCategory {
  LIKE = 'like',
  LOVE = 'love',
  WOW = 'wow',
  HAHA = 'haha',
  SAD = 'sad',
  ANGRY = 'angry'
}

// 分類介面
export interface Category {
  id: string;
  name: string;
  description: string;
  color?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 貼文介面
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
  wowCount: number;
  wowsByCategory: Record<WowCategory, number>;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  // 關聯資料 (可選)
  author?: {
    id: string;
    username: string;
    profile: {
      displayName?: string;
      avatar?: string;
    };
  };
  category?: {
    id: string;
    name: string;
    color?: string;
  };
}

// 新增貼文資料
export interface PostCreate {
  title: string;
  content: string;
  categoryId: string;
  isPublished?: boolean;
}

// 更新貼文資料
export interface PostUpdate {
  title?: string;
  content?: string;
  categoryId?: string;
  isPublished?: boolean;
}

// 貼文查詢選項
export interface PostQueryOptions {
  categoryId?: string;
  authorId?: string;
  search?: string;
  isPublished?: boolean;
  sortBy?: 'createdAt' | 'updatedAt' | 'wowCount' | 'title';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Wow 評價介面
export interface Wow {
  id: string;
  userId: string;
  postId: string;
  category: WowCategory;
  createdAt: Date;
}

// 新增 Wow 評價資料
export interface WowCreate {
  userId: string;
  postId: string;
  category: WowCategory;
}

// 貼文統計
export interface PostStats {
  totalPosts: number;
  totalWows: number;
  wowsByCategory: Record<WowCategory, number>;
  topCategories: Array<{
    id: string;
    name: string;
    postCount: number;
  }>;
}

// 創建分類資料
export interface CategoryCreate {
  name: string;
  description: string;
  color?: string;
  icon?: string;
}
  wowDate: Date;
}

// Wow 統計
export interface WowStats {
  postId: number;
  wowCount: number;
  lastWowDate?: Date;
}
