// API 回應格式
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

// 分頁資料
export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// 分頁查詢參數
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// 錯誤類型
export interface ApiError {
  statusCode: number;
  message: string;
  errors?: string[];
  timestamp?: string;
}

// 排行榜項目
export interface RankingItem {
  postId: string;
  title: string;
  authorId: string;
  authorName: string;
  categoryId: string;
  categoryName: string;
  wowCount: number;
  wowsByCategory: Record<string, number>;
  createdAt: string;
  rank: number;
}

// 搜尋結果
export interface SearchResult<T> {
  query: string;
  results: T[];
  total: number;
  searchTime: number;
}

// 認證回應
export interface AuthResponse {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    profile: {
      displayName?: string;
      avatar?: string;
    };
  };
  token: string;
  expiresAt: string;
}

// 檔案上傳回應
export interface UploadResponse {
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  url: string;
}
  wowCount: number;
  publishDate: Date;
}
