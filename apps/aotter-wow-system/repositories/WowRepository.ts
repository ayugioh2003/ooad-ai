import { getDatabase } from '~/utils/database';
import type { Wow } from '~/types/post';

export class WowRepository {
  private db = getDatabase();

  // 根據 ID 查找 Wow
  async findById(id: number): Promise<Wow | null> {
    const wow = await this.db.get('wows', (record) => record.id === id);
    if (!wow) return null;
    return this.mapToWow(wow);
  }

  // 檢查使用者是否已對貼文給過 Wow
  async findByUserAndPost(userId: number, postId: number): Promise<Wow | null> {
    const wow = await this.db.get('wows', (record) => 
      record.user_id === userId && record.post_id === postId
    );
    if (!wow) return null;
    return this.mapToWow(wow);
  }

  // 創建新的 Wow 評價
  async create(userId: number, postId: number): Promise<Wow> {
    // 檢查是否已經給過 Wow
    const existingWow = await this.findByUserAndPost(userId, postId);
    if (existingWow) {
      throw new Error('User has already given wow to this post');
    }

    const result = await this.db.insert('wows', {
      user_id: userId,
      post_id: postId,
      wow_date: new Date().toISOString()
    });

    const wowId = result.lastID;
    const wow = await this.findById(wowId);
    if (!wow) {
      throw new Error('Failed to retrieve created wow');
    }

    return wow;
  }

  // 刪除 Wow 評價
  async delete(id: number): Promise<boolean> {
    const result = await this.db.delete('wows', id);
    return result.changes > 0;
  }

  // 根據使用者和貼文刪除 Wow
  async deleteByUserAndPost(userId: number, postId: number): Promise<boolean> {
    const wow = await this.findByUserAndPost(userId, postId);
    if (!wow) return false;
    
    return await this.delete(wow.id);
  }

  // 獲取貼文的所有 Wow
  async findByPost(postId: number): Promise<Wow[]> {
    const wows = await this.db.all('wows', (record) => record.post_id === postId);
    return wows
      .sort((a, b) => new Date(b.wow_date).getTime() - new Date(a.wow_date).getTime())
      .map(wow => this.mapToWow(wow));
  }

  // 獲取使用者給過的所有 Wow
  async findByUser(userId: number): Promise<Wow[]> {
    const wows = await this.db.all('wows', (record) => record.user_id === userId);
    return wows
      .sort((a, b) => new Date(b.wow_date).getTime() - new Date(a.wow_date).getTime())
      .map(wow => this.mapToWow(wow));
  }

  // 統計貼文的 Wow 數量
  async countByPost(postId: number): Promise<number> {
    return await this.db.count('wows', (record) => record.post_id === postId);
  }

  // 統計使用者給過的 Wow 數量
  async countByUser(userId: number): Promise<number> {
    return await this.db.count('wows', (record) => record.user_id === userId);
  }

  // 統計總 Wow 數量
  async countAll(): Promise<number> {
    return await this.db.count('wows');
  }

  // 獲取最近的 Wow 活動
  async getRecentWows(limit: number = 10): Promise<Wow[]> {
    const wows = await this.db.all('wows');
    return wows
      .sort((a, b) => new Date(b.wow_date).getTime() - new Date(a.wow_date).getTime())
      .slice(0, limit)
      .map(wow => this.mapToWow(wow));
  }

  // 將資料庫記錄映射為 Wow 物件
  private mapToWow(row: any): Wow {
    return {
      id: row.id,
      userId: row.user_id,
      postId: row.post_id,
      wowDate: new Date(row.wow_date)
    };
  }
}
