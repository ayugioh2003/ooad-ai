import { getDatabase } from '~/utils/database';
import type { Category } from '~/types/post';

export class CategoryRepository {
  private db = getDatabase();

  // 根據 ID 查找類別
  async findById(id: number): Promise<Category | null> {
    const category = await this.db.get('categories', (record) => record.id === id);
    if (!category) return null;
    return this.mapToCategory(category);
  }

  // 根據名稱查找類別
  async findByName(name: string): Promise<Category | null> {
    const category = await this.db.get('categories', (record) => record.name === name);
    if (!category) return null;
    return this.mapToCategory(category);
  }

  // 獲取所有類別
  async findAll(): Promise<Category[]> {
    const categories = await this.db.all('categories');
    return categories
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(category => this.mapToCategory(category));
  }

  // 創建新類別
  async create(name: string, description: string): Promise<Category> {
    const result = await this.db.insert('categories', {
      name,
      description,
      created_date: new Date().toISOString()
    });

    const categoryId = result.lastID;
    const category = await this.findById(categoryId);
    if (!category) {
      throw new Error('Failed to retrieve created category');
    }

    return category;
  }

  // 更新類別
  async update(id: number, updates: Partial<Category>): Promise<Category | null> {
    const updateData: any = {};

    if (updates.name) updateData.name = updates.name;
    if (updates.description) updateData.description = updates.description;

    if (Object.keys(updateData).length === 0) {
      return this.findById(id);
    }

    const result = await this.db.update('categories', id, updateData);
    if (result.changes === 0) {
      return null;
    }

    return this.findById(id);
  }

  // 刪除類別
  async delete(id: number): Promise<boolean> {
    const result = await this.db.delete('categories', id);
    return result.changes > 0;
  }

  // 統計類別總數
  async countAll(): Promise<number> {
    return await this.db.count('categories');
  }

  // 檢查類別名稱是否已存在
  async nameExists(name: string): Promise<boolean> {
    const category = await this.db.get('categories', (record) => record.name === name);
    return !!category;
  }

  // 將資料庫記錄映射為 Category 物件
  private mapToCategory(row: any): Category {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      createdDate: new Date(row.created_date)
    };
  }
}
