import bcrypt from 'bcryptjs';

var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["USER"] = "user";
  UserRole2["ADMIN"] = "admin";
  UserRole2["MODERATOR"] = "moderator";
  return UserRole2;
})(UserRole || {});
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
class MemoryDatabase {
  constructor() {
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
  // 生成 ID
  generateId(table) {
    const id = `${table.slice(0, -1)}_${this.idCounters[table]}`;
    this.idCounters[table]++;
    return id;
  }
  // 初始化資料庫表格
  async initTables() {
    console.log("\u{1F5C4}\uFE0F \u521D\u59CB\u5316\u8A18\u61B6\u9AD4\u8CC7\u6599\u5EAB...");
    if (Object.keys(this.storage.categories).length === 0) {
      const categories = [
        { name: "\u52D5\u7269", description: "\u53EF\u611B\u7684\u52D5\u7269\u76F8\u95DC\u5167\u5BB9", color: "#ef4444", icon: "\u{1F43E}" },
        { name: "\u7F8E\u98DF", description: "\u7F8E\u5473\u7684\u98DF\u7269\u548C\u9910\u5EF3\u63A8\u85A6", color: "#f97316", icon: "\u{1F355}" },
        { name: "\u65C5\u904A", description: "\u65C5\u904A\u666F\u9EDE\u548C\u9AD4\u9A57\u5206\u4EAB", color: "#eab308", icon: "\u2708\uFE0F" },
        { name: "\u670D\u52D9", description: "\u5404\u7A2E\u670D\u52D9\u9AD4\u9A57\u548C\u8A55\u50F9", color: "#22c55e", icon: "\u{1F527}" },
        { name: "\u751F\u6D3B", description: "\u65E5\u5E38\u751F\u6D3B\u76F8\u95DC\u5167\u5BB9", color: "#3b82f6", icon: "\u{1F3E0}" },
        { name: "\u79D1\u6280", description: "\u79D1\u6280\u7522\u54C1\u548C\u8DA8\u52E2\u8A0E\u8AD6", color: "#8b5cf6", icon: "\u{1F4BB}" },
        { name: "\u5A1B\u6A02", description: "\u96FB\u5F71\u3001\u97F3\u6A02\u3001\u904A\u6232\u7B49\u5A1B\u6A02\u5167\u5BB9", color: "#ec4899", icon: "\u{1F3AE}" },
        { name: "\u904B\u52D5", description: "\u904B\u52D5\u5065\u8EAB\u548C\u6BD4\u8CFD\u8A0E\u8AD6", color: "#06b6d4", icon: "\u26BD" }
      ];
      for (const category of categories) {
        const id = this.generateId("categories");
        this.storage.categories[id] = {
          id,
          name: category.name,
          description: category.description,
          color: category.color,
          icon: category.icon,
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date()
        };
      }
      console.log(`\u2705 \u5DF2\u5275\u5EFA ${categories.length} \u500B\u9810\u8A2D\u5206\u985E`);
    }
    if (Object.keys(this.storage.users).length === 0) {
      const adminId = this.generateId("users");
      const adminPasswordHash = await hashPassword("admin123");
      this.storage.users[adminId] = {
        id: adminId,
        username: "admin",
        email: "admin@aotter-wow.com",
        passwordHash: adminPasswordHash,
        role: UserRole.ADMIN,
        profile: {
          displayName: "\u7CFB\u7D71\u7BA1\u7406\u54E1",
          bio: "Aotter Wow \u7CFB\u7D71\u7BA1\u7406\u54E1",
          avatar: ""
        },
        isActive: true,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      };
      console.log("\u2705 \u5DF2\u5275\u5EFA\u9810\u8A2D\u7BA1\u7406\u54E1\u5E33\u865F (admin@aotter-wow.com / admin123)");
    }
    console.log("\u{1F680} \u8A18\u61B6\u9AD4\u8CC7\u6599\u5EAB\u521D\u59CB\u5316\u5B8C\u6210");
  }
  // 插入記錄
  async insert(table, data) {
    const id = this.generateId(table);
    this.storage[table][id] = {
      id,
      ...data,
      createdAt: data.createdAt || /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    return { lastID: id };
  }
  // 查詢單一記錄 by ID
  async findById(table, id) {
    return this.storage[table][id] || null;
  }
  // 查詢單一記錄
  async get(table, condition) {
    const records = Object.values(this.storage[table]);
    return records.find(condition) || null;
  }
  // 查詢所有符合條件的記錄
  async all(table, condition) {
    const records = Object.values(this.storage[table]);
    return condition ? records.filter(condition) : records;
  }
  // 更新記錄
  async update(table, id, data) {
    if (this.storage[table][id]) {
      this.storage[table][id] = {
        ...this.storage[table][id],
        ...data,
        updatedAt: /* @__PURE__ */ new Date()
      };
      return true;
    }
    return false;
  }
  // 刪除記錄
  async delete(table, id) {
    if (this.storage[table][id]) {
      delete this.storage[table][id];
      return true;
    }
    return false;
  }
  // 計數
  async count(table, condition) {
    const records = Object.values(this.storage[table]);
    return condition ? records.filter(condition).length : records.length;
  }
  // 獲取所有表格的統計資訊
  getStats() {
    return {
      users: Object.keys(this.storage.users).length,
      categories: Object.keys(this.storage.categories).length,
      posts: Object.keys(this.storage.posts).length,
      wows: Object.keys(this.storage.wows).length
    };
  }
  // 清空所有資料 (僅供測試使用)
  async clearAll() {
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
let dbInstance = null;
const getDatabase = () => {
  if (!dbInstance) {
    dbInstance = new MemoryDatabase();
  }
  return dbInstance;
};

export { getDatabase };
//# sourceMappingURL=database-CLXBLKqF.mjs.map
