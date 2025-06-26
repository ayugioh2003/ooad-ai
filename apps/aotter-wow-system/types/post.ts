// 類別介面
export interface Category {
  id: number;
  name: string;
  description: string;
  createdDate: Date;
}

// 貼文介面
export interface Post {
  id: number;
  title: string;
  content: string;
  publishDate: Date;
  authorId: number;
  categoryId: number;
  wowCount: number;
  author?: {
    id: number;
    username: string;
  };
  category?: {
    id: number;
    name: string;
  };
}

// 新增貼文資料
export interface PostCreate {
  title: string;
  content: string;
  categoryId: number;
}

// 貼文查詢選項
export interface PostQueryOptions {
  categoryId?: number;
  authorId?: number;
  search?: string;
  sortBy?: 'publishDate' | 'wowCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Wow 評價介面
export interface Wow {
  id: number;
  userId: number;
  postId: number;
  wowDate: Date;
}

// Wow 統計
export interface WowStats {
  postId: number;
  wowCount: number;
  lastWowDate?: Date;
}
