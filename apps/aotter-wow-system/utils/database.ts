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
  private nextId = 1;

  // 初始化資料庫表格
  async initTables(): Promise<void> {
    // 初始化預設分類
    if (Object.keys(this.storage.categories).length === 0) {
      const categories = [
        { name: '動物', description: '可愛的動物相關內容' },
        { name: '美食', description: '美味的食物和餐廳推薦' },
        { name: '旅遊', description: '旅遊景點和體驗分享' },
        { name: '服務', description: '各種服務體驗和評價' },
        { name: '生活', description: '日常生活相關內容' },
        { name: '科技', description: '科技產品和趨勢討論' }
      ];

      for (const category of categories) {
        await this.insert('categories', {
          name: category.name,
          description: category.description,
          created_date: new Date().toISOString()
        });
      }
    }
  }

  // 插入記錄
  async insert(table: keyof DatabaseStorage, data: DatabaseRecord): Promise<{ lastID: number }> {
    const id = this.nextId++;
    this.storage[table][id] = {
      id,
      ...data
    };
    return { lastID: id };
  }

  // 查詢單一記錄
  async get(table: keyof DatabaseStorage, condition: (record: any) => boolean): Promise<any> {
    const records = Object.values(this.storage[table]);
    return records.find(condition) || null;
  }

  // 查詢所有符合條件的記錄
  async all(table: keyof DatabaseStorage, condition?: (record: any) => boolean): Promise<any[]> {
    const records = Object.values(this.storage[table]);
    if (condition) {
      return records.filter(condition);
    }
    return records;
  }

  // 更新記錄
  async update(table: keyof DatabaseStorage, id: number, updates: DatabaseRecord): Promise<{ changes: number }> {
    if (this.storage[table][id]) {
      this.storage[table][id] = {
        ...this.storage[table][id],
        ...updates
      };
      return { changes: 1 };
    }
    return { changes: 0 };
  }

  // 刪除記錄
  async delete(table: keyof DatabaseStorage, id: number): Promise<{ changes: number }> {
    if (this.storage[table][id]) {
      delete this.storage[table][id];
      return { changes: 1 };
    }
    return { changes: 0 };
  }

  // 統計記錄數量
  async count(table: keyof DatabaseStorage, condition?: (record: any) => boolean): Promise<number> {
    const records = Object.values(this.storage[table]);
    if (condition) {
      return records.filter(condition).length;
    }
    return records.length;
  }
}

// 單例模式的資料庫實例
let dbInstance: MemoryDatabase | null = null;

export const getDatabase = () => {
  if (!dbInstance) {
    dbInstance = new MemoryDatabase();
  }
  return dbInstance;
};
