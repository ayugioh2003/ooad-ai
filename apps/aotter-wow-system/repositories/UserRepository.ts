import { getDatabase } from '~/utils/database';
import type { User, UserRegistration, UserPublic } from '~/types/user';
import { UserType } from '~/types/user';

export class UserRepository {
  private db = getDatabase();

  // 根據 ID 查找使用者
  async findById(id: number): Promise<User | null> {
    const user = await this.db.get('users', (record) => record.id === id);
    if (!user) return null;
    return this.mapToUser(user);
  }

  // 根據 Email 查找使用者
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.get('users', (record) => record.email === email);
    if (!user) return null;
    return this.mapToUser(user);
  }

  // 根據使用者名稱查找使用者
  async findByUsername(username: string): Promise<User | null> {
    const user = await this.db.get('users', (record) => record.username === username);
    if (!user) return null;
    return this.mapToUser(user);
  }

  // 創建新使用者
  async create(userRegistration: UserRegistration): Promise<User> {
    const result = await this.db.insert('users', {
      username: userRegistration.username,
      email: userRegistration.email,
      password: userRegistration.password,
      join_date: new Date().toISOString(),
      user_type: 'regular'
    });

    const userId = result.lastID;
    const user = await this.findById(userId);
    if (!user) {
      throw new Error('Failed to retrieve created user');
    }

    return user;
  }

  // 更新使用者資料
  async update(id: number, updates: Partial<User>): Promise<User | null> {
    const updateData: any = {};

    if (updates.username) updateData.username = updates.username;
    if (updates.email) updateData.email = updates.email;
    if (updates.password) updateData.password = updates.password;
    if (updates.userType) updateData.user_type = updates.userType;

    if (Object.keys(updateData).length === 0) {
      return this.findById(id);
    }

    const result = await this.db.update('users', id, updateData);
    if (result.changes === 0) {
      return null;
    }

    return this.findById(id);
  }

  // 刪除使用者
  async delete(id: number): Promise<boolean> {
    const result = await this.db.delete('users', id);
    return result.changes > 0;
  }

  // 獲取所有使用者（管理員功能）
  async findAll(limit: number = 50, offset: number = 0): Promise<UserPublic[]> {
    const allUsers = await this.db.all('users');
    
    // 排序並分頁
    const sortedUsers = allUsers
      .sort((a, b) => new Date(b.join_date).getTime() - new Date(a.join_date).getTime())
      .slice(offset, offset + limit);

    return sortedUsers.map(user => this.mapToUserPublic(user));
  }

  // 統計使用者總數
  async countAll(): Promise<number> {
    return await this.db.count('users');
  }

  // 檢查 Email 是否已存在
  async emailExists(email: string): Promise<boolean> {
    const user = await this.db.get('users', (record) => record.email === email);
    return !!user;
  }

  // 檢查使用者名稱是否已存在
  async usernameExists(username: string): Promise<boolean> {
    const user = await this.db.get('users', (record) => record.username === username);
    return !!user;
  }

  // 將資料庫記錄映射為 User 物件
  private mapToUser(row: any): User {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      password: row.password,
      joinDate: new Date(row.join_date),
      userType: row.user_type as UserType
    };
  }

  // 將資料庫記錄映射為 UserPublic 物件
  private mapToUserPublic(row: any): UserPublic {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      joinDate: new Date(row.join_date),
      userType: row.user_type as UserType
    };
  }
}
