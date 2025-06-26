// API 回應格式
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 分頁資料
export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 錯誤類型
export interface ApiError {
  statusCode: number;
  message: string;
  errors?: string[];
}

// 排行榜項目
export interface RankingItem {
  postId: number;
  title: string;
  authorName: string;
  categoryName: string;
  wowCount: number;
  publishDate: Date;
}
