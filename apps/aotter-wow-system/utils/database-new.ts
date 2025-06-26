import { UserRole, WowCategory } from '~/types/user'
import type { User, Category, Post, Wow } from '~/types'

// 暫時使用記憶體儲存，避免 SQLite 依賴問題
// 在實際部署時可以換成真正的資料庫

interface DatabaseRecord {
  [key: string]: any;
}

interface DatabaseTable {
  [id: string]: DatabaseRecord;
}

interface DatabaseStorage {
  users: DatabaseTable;
  categories: DatabaseTable;
  posts: DatabaseTable;
  wows: DatabaseTable;
}

// 記憶體資料庫
class MemoryDatabase {
  private storage: DatabaseStorage = {
    users: {},
    categories: {},
    posts: {},
    wows: {}
  };
  private idCounters = {
    users: 1,
    categories: 1,
    posts: 1,
    wows: 1
  };

  // 生成 ID
  private generateId(table: keyof DatabaseStorage): string {
    const id = `${table.slice(0, -1)}_${this.idCounters[table]}`;
    this.idCounters[table]++;
    return id;
  }

  // 初始化資料庫表格
  async initTables(): Promise<void> {
    console.log('🗄️ 初始化記憶體資料庫...');
    
    // 初始化預設分類
    if (Object.keys(this.storage.categories).length === 0) {
      const categories = [
        { name: '動物', description: '可愛的動物相關內容', color: '#ef4444', icon: '🐾' },
        { name: '美食', description: '美味的食物和餐廳推薦', color: '#f97316', icon: '🍕' },
        { name: '旅遊', description: '旅遊景點和體驗分享', color: '#eab308', icon: '✈️' },
        { name: '服務', description: '各種服務體驗和評價', color: '#22c55e', icon: '🔧' },
        { name: '生活', description: '日常生活相關內容', color: '#3b82f6', icon: '🏠' },
        { name: '科技', description: '科技產品和趨勢討論', color: '#8b5cf6', icon: '💻' },
        { name: '娛樂', description: '電影、音樂、遊戲等娛樂內容', color: '#ec4899', icon: '🎮' },
        { name: '運動', description: '運動健身和比賽討論', color: '#06b6d4', icon: '⚽' }
      ];

      for (const category of categories) {
        const id = this.generateId('categories');
        this.storage.categories[id] = {
          id,
          name: category.name,
          description: category.description,
          color: category.color,
          icon: category.icon,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      }
      console.log(`✅ 已創建 ${categories.length} 個預設分類`);
    }

    // 創建預設管理員帳號
    if (Object.keys(this.storage.users).length === 0) {
      const adminId = this.generateId('users');
      this.storage.users[adminId] = {
        id: adminId,
        username: 'admin',
        email: 'admin@aotter-wow.com',
        passwordHash: '$2a$10$placeholder.hash.for.admin123', // 實際會被 bcrypt 替換
        role: UserRole.ADMIN,
        profile: {
          displayName: '系統管理員',
          bio: 'Aotter Wow 系統管理員',
          avatar: ''
        },
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      console.log('✅ 已創建預設管理員帳號 (admin@aotter-wow.com)');
    }

    console.log('🚀 記憶體資料庫初始化完成');
  }

  // 插入記錄
  async insert(table: keyof DatabaseStorage, data: DatabaseRecord): Promise<{ lastID: string }> {
    const id = this.generateId(table);
    this.storage[table][id] = {
      id,
      ...data,
      createdAt: data.createdAt || new Date(),
      updatedAt: new Date()
    };
    return { lastID: id };
  }

  // 查詢單一記錄 by ID
  async findById(table: keyof DatabaseStorage, id: string): Promise<any> {
    return this.storage[table][id] || null;
  }

  // 查詢單一記錄
  async get(table: keyof DatabaseStorage, condition: (record: any) => boolean): Promise<any> {
    const records = Object.values(this.storage[table]);
    return records.find(condition) || null;
  }

  // 查詢所有符合條件的記錄
  async all(table: keyof DatabaseStorage, condition?: (record: any) => boolean): Promise<any[]> {
    const records = Object.values(this.storage[table]);
    return condition ? records.filter(condition) : records;
  }

  // 更新記錄
  async update(table: keyof DatabaseStorage, id: string, data: Partial<DatabaseRecord>): Promise<boolean> {
    if (this.storage[table][id]) {
      this.storage[table][id] = {
        ...this.storage[table][id],
        ...data,
        updatedAt: new Date()
      };
      return true;
    }
    return false;
  }

  // 刪除記錄
  async delete(table: keyof DatabaseStorage, id: string): Promise<boolean> {
    if (this.storage[table][id]) {
      delete this.storage[table][id];
      return true;
    }
    return false;
  }

  // 計數
  async count(table: keyof DatabaseStorage, condition?: (record: any) => boolean): Promise<number> {
    const records = Object.values(this.storage[table]);
    return condition ? records.filter(condition).length : records.length;
  }

  // 獲取所有表格的統計資訊
  getStats(): Record<string, number> {
    return {
      users: Object.keys(this.storage.users).length,
      categories: Object.keys(this.storage.categories).length,
      posts: Object.keys(this.storage.posts).length,
      wows: Object.keys(this.storage.wows).length
    };
  }

  // 清空所有資料 (僅供測試使用)
  async clearAll(): Promise<void> {
    this.storage = {
      users: {},
      categories: {},
      posts: {},
      wows: {}
    };
    this.idCounters = {
      users: 1,
      categories: 1,
      posts: 1,
      wows: 1
    };
  }
}

// 單例模式
let dbInstance: MemoryDatabase | null = null;

export const getDatabase = (): MemoryDatabase => {
  if (!dbInstance) {
    dbInstance = new MemoryDatabase();
  }
  return dbInstance;
};
