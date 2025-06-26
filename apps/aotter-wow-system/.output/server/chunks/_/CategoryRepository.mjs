import { g as getDatabase } from './database.mjs';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class CategoryRepository {
  constructor() {
    __publicField(this, "db", getDatabase());
  }
  // 根據 ID 查找類別
  async findById(id) {
    const category = await this.db.get("categories", (record) => record.id === id);
    if (!category) return null;
    return this.mapToCategory(category);
  }
  // 根據名稱查找類別
  async findByName(name) {
    const category = await this.db.get("categories", (record) => record.name === name);
    if (!category) return null;
    return this.mapToCategory(category);
  }
  // 獲取所有類別
  async findAll() {
    const categories = await this.db.all("categories");
    return categories.sort((a, b) => a.name.localeCompare(b.name)).map((category) => this.mapToCategory(category));
  }
  // 創建新類別
  async create(name, description) {
    const result = await this.db.insert("categories", {
      name,
      description,
      created_date: (/* @__PURE__ */ new Date()).toISOString()
    });
    const categoryId = result.lastID;
    const category = await this.findById(categoryId);
    if (!category) {
      throw new Error("Failed to retrieve created category");
    }
    return category;
  }
  // 更新類別
  async update(id, updates) {
    const updateData = {};
    if (updates.name) updateData.name = updates.name;
    if (updates.description) updateData.description = updates.description;
    if (Object.keys(updateData).length === 0) {
      return this.findById(id);
    }
    const result = await this.db.update("categories", id, updateData);
    if (result.changes === 0) {
      return null;
    }
    return this.findById(id);
  }
  // 刪除類別
  async delete(id) {
    const result = await this.db.delete("categories", id);
    return result.changes > 0;
  }
  // 統計類別總數
  async countAll() {
    return await this.db.count("categories");
  }
  // 檢查類別名稱是否已存在
  async nameExists(name) {
    const category = await this.db.get("categories", (record) => record.name === name);
    return !!category;
  }
  // 將資料庫記錄映射為 Category 物件
  mapToCategory(row) {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      createdDate: new Date(row.created_date)
    };
  }
}

export { CategoryRepository as C };
//# sourceMappingURL=CategoryRepository.mjs.map
