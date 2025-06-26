import { getDatabase } from '~/utils/database';
import type { Post, PostCreate, PostQueryOptions } from '~/types/post';
import type { UserPublic } from '~/types/user';

export class PostRepository {
  private db = getDatabase();

  // 根據 ID 查找貼文
  async findById(id: number): Promise<Post | null> {
    const post = await this.db.get('posts', (record) => record.id === id);
    if (!post) return null;

    // 獲取作者資訊
    const author = await this.db.get('users', (record) => record.id === post.author_id);
    
    // 獲取類別資訊
    const category = await this.db.get('categories', (record) => record.id === post.category_id);

    return this.mapToPost(post, author, category);
  }

  // 創建新貼文
  async create(postCreate: PostCreate, authorId: number): Promise<Post> {
    const result = await this.db.insert('posts', {
      title: postCreate.title,
      content: postCreate.content,
      category_id: postCreate.categoryId,
      author_id: authorId,
      publish_date: new Date().toISOString(),
      wow_count: 0
    });

    const postId = result.lastID;
    const post = await this.findById(postId);
    if (!post) {
      throw new Error('Failed to retrieve created post');
    }

    return post;
  }

  // 查詢貼文（支援篩選和排序）
  async findPosts(options: PostQueryOptions = {}): Promise<Post[]> {
    let posts = await this.db.all('posts');

    // 篩選條件
    if (options.categoryId) {
      posts = posts.filter(post => post.category_id === options.categoryId);
    }

    if (options.authorId) {
      posts = posts.filter(post => post.author_id === options.authorId);
    }

    if (options.search) {
      const searchLower = options.search.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower)
      );
    }

    // 排序
    const sortBy = options.sortBy || 'publishDate';
    const sortOrder = options.sortOrder || 'desc';

    posts.sort((a, b) => {
      let compareValue = 0;
      
      if (sortBy === 'publishDate') {
        compareValue = new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime();
      } else if (sortBy === 'wowCount') {
        compareValue = a.wow_count - b.wow_count;
      }

      return sortOrder === 'desc' ? -compareValue : compareValue;
    });

    // 分頁
    if (options.offset) {
      posts = posts.slice(options.offset);
    }
    if (options.limit) {
      posts = posts.slice(0, options.limit);
    }

    // 載入相關資料
    const result: Post[] = [];
    for (const post of posts) {
      const author = await this.db.get('users', (record) => record.id === post.author_id);
      const category = await this.db.get('categories', (record) => record.id === post.category_id);
      result.push(this.mapToPost(post, author, category));
    }

    return result;
  }

  // 更新貼文
  async update(id: number, updates: Partial<Post>): Promise<Post | null> {
    const updateData: any = {};

    if (updates.title) updateData.title = updates.title;
    if (updates.content) updateData.content = updates.content;
    if (updates.categoryId) updateData.category_id = updates.categoryId;

    if (Object.keys(updateData).length === 0) {
      return this.findById(id);
    }

    const result = await this.db.update('posts', id, updateData);
    if (result.changes === 0) {
      return null;
    }

    return this.findById(id);
  }

  // 刪除貼文
  async delete(id: number): Promise<boolean> {
    const result = await this.db.delete('posts', id);
    return result.changes > 0;
  }

  // 增加 Wow 計數
  async incrementWowCount(id: number): Promise<boolean> {
    const post = await this.db.get('posts', (record) => record.id === id);
    if (!post) return false;

    const result = await this.db.update('posts', id, {
      wow_count: post.wow_count + 1
    });

    return result.changes > 0;
  }

  // 減少 Wow 計數
  async decrementWowCount(id: number): Promise<boolean> {
    const post = await this.db.get('posts', (record) => record.id === id);
    if (!post) return false;

    const newCount = Math.max(0, post.wow_count - 1);
    const result = await this.db.update('posts', id, {
      wow_count: newCount
    });

    return result.changes > 0;
  }

  // 統計貼文總數
  async countAll(): Promise<number> {
    return await this.db.count('posts');
  }

  // 根據作者統計貼文數量
  async countByAuthor(authorId: number): Promise<number> {
    return await this.db.count('posts', (record) => record.author_id === authorId);
  }

  // 根據類別統計貼文數量
  async countByCategory(categoryId: number): Promise<number> {
    return await this.db.count('posts', (record) => record.category_id === categoryId);
  }

  // 獲取 Wow 排行榜
  async getWowRanking(limit: number = 10): Promise<Post[]> {
    const posts = await this.db.all('posts');
    
    // 按 Wow 數量排序
    const sortedPosts = posts
      .sort((a, b) => b.wow_count - a.wow_count)
      .slice(0, limit);

    // 載入相關資料
    const result: Post[] = [];
    for (const post of sortedPosts) {
      const author = await this.db.get('users', (record) => record.id === post.author_id);
      const category = await this.db.get('categories', (record) => record.id === post.category_id);
      result.push(this.mapToPost(post, author, category));
    }

    return result;
  }

  // 將資料庫記錄映射為 Post 物件
  private mapToPost(post: any, author?: any, category?: any): Post {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      publishDate: new Date(post.publish_date),
      authorId: post.author_id,
      categoryId: post.category_id,
      wowCount: post.wow_count,
      author: author ? {
        id: author.id,
        username: author.username
      } : undefined,
      category: category ? {
        id: category.id,
        name: category.name
      } : undefined
    };
  }
}
