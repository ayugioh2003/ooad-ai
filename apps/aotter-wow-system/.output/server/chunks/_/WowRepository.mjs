import { g as getDatabase } from './database.mjs';

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, key + "" , value);
class PostRepository {
  constructor() {
    __publicField$1(this, "db", getDatabase());
  }
  // 根據 ID 查找貼文
  async findById(id) {
    const post = await this.db.get("posts", (record) => record.id === id);
    if (!post) return null;
    const author = await this.db.get("users", (record) => record.id === post.author_id);
    const category = await this.db.get("categories", (record) => record.id === post.category_id);
    return this.mapToPost(post, author, category);
  }
  // 創建新貼文
  async create(postCreate, authorId) {
    const result = await this.db.insert("posts", {
      title: postCreate.title,
      content: postCreate.content,
      category_id: postCreate.categoryId,
      author_id: authorId,
      publish_date: (/* @__PURE__ */ new Date()).toISOString(),
      wow_count: 0
    });
    const postId = result.lastID;
    const post = await this.findById(postId);
    if (!post) {
      throw new Error("Failed to retrieve created post");
    }
    return post;
  }
  // 查詢貼文（支援篩選和排序）
  async findPosts(options = {}) {
    let posts = await this.db.all("posts");
    if (options.categoryId) {
      posts = posts.filter((post) => post.category_id === options.categoryId);
    }
    if (options.authorId) {
      posts = posts.filter((post) => post.author_id === options.authorId);
    }
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      posts = posts.filter(
        (post) => post.title.toLowerCase().includes(searchLower) || post.content.toLowerCase().includes(searchLower)
      );
    }
    const sortBy = options.sortBy || "publishDate";
    const sortOrder = options.sortOrder || "desc";
    posts.sort((a, b) => {
      let compareValue = 0;
      if (sortBy === "publishDate") {
        compareValue = new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime();
      } else if (sortBy === "wowCount") {
        compareValue = a.wow_count - b.wow_count;
      }
      return sortOrder === "desc" ? -compareValue : compareValue;
    });
    if (options.offset) {
      posts = posts.slice(options.offset);
    }
    if (options.limit) {
      posts = posts.slice(0, options.limit);
    }
    const result = [];
    for (const post of posts) {
      const author = await this.db.get("users", (record) => record.id === post.author_id);
      const category = await this.db.get("categories", (record) => record.id === post.category_id);
      result.push(this.mapToPost(post, author, category));
    }
    return result;
  }
  // 更新貼文
  async update(id, updates) {
    const updateData = {};
    if (updates.title) updateData.title = updates.title;
    if (updates.content) updateData.content = updates.content;
    if (updates.categoryId) updateData.category_id = updates.categoryId;
    if (Object.keys(updateData).length === 0) {
      return this.findById(id);
    }
    const result = await this.db.update("posts", id, updateData);
    if (result.changes === 0) {
      return null;
    }
    return this.findById(id);
  }
  // 刪除貼文
  async delete(id) {
    const result = await this.db.delete("posts", id);
    return result.changes > 0;
  }
  // 增加 Wow 計數
  async incrementWowCount(id) {
    const post = await this.db.get("posts", (record) => record.id === id);
    if (!post) return false;
    const result = await this.db.update("posts", id, {
      wow_count: post.wow_count + 1
    });
    return result.changes > 0;
  }
  // 減少 Wow 計數
  async decrementWowCount(id) {
    const post = await this.db.get("posts", (record) => record.id === id);
    if (!post) return false;
    const newCount = Math.max(0, post.wow_count - 1);
    const result = await this.db.update("posts", id, {
      wow_count: newCount
    });
    return result.changes > 0;
  }
  // 統計貼文總數
  async countAll() {
    return await this.db.count("posts");
  }
  // 根據作者統計貼文數量
  async countByAuthor(authorId) {
    return await this.db.count("posts", (record) => record.author_id === authorId);
  }
  // 根據類別統計貼文數量
  async countByCategory(categoryId) {
    return await this.db.count("posts", (record) => record.category_id === categoryId);
  }
  // 獲取 Wow 排行榜
  async getWowRanking(limit = 10) {
    const posts = await this.db.all("posts");
    const sortedPosts = posts.sort((a, b) => b.wow_count - a.wow_count).slice(0, limit);
    const result = [];
    for (const post of sortedPosts) {
      const author = await this.db.get("users", (record) => record.id === post.author_id);
      const category = await this.db.get("categories", (record) => record.id === post.category_id);
      result.push(this.mapToPost(post, author, category));
    }
    return result;
  }
  // 將資料庫記錄映射為 Post 物件
  mapToPost(post, author, category) {
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
      } : void 0,
      category: category ? {
        id: category.id,
        name: category.name
      } : void 0
    };
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class WowRepository {
  constructor() {
    __publicField(this, "db", getDatabase());
  }
  // 根據 ID 查找 Wow
  async findById(id) {
    const wow = await this.db.get("wows", (record) => record.id === id);
    if (!wow) return null;
    return this.mapToWow(wow);
  }
  // 檢查使用者是否已對貼文給過 Wow
  async findByUserAndPost(userId, postId) {
    const wow = await this.db.get(
      "wows",
      (record) => record.user_id === userId && record.post_id === postId
    );
    if (!wow) return null;
    return this.mapToWow(wow);
  }
  // 創建新的 Wow 評價
  async create(userId, postId) {
    const existingWow = await this.findByUserAndPost(userId, postId);
    if (existingWow) {
      throw new Error("User has already given wow to this post");
    }
    const result = await this.db.insert("wows", {
      user_id: userId,
      post_id: postId,
      wow_date: (/* @__PURE__ */ new Date()).toISOString()
    });
    const wowId = result.lastID;
    const wow = await this.findById(wowId);
    if (!wow) {
      throw new Error("Failed to retrieve created wow");
    }
    return wow;
  }
  // 刪除 Wow 評價
  async delete(id) {
    const result = await this.db.delete("wows", id);
    return result.changes > 0;
  }
  // 根據使用者和貼文刪除 Wow
  async deleteByUserAndPost(userId, postId) {
    const wow = await this.findByUserAndPost(userId, postId);
    if (!wow) return false;
    return await this.delete(wow.id);
  }
  // 獲取貼文的所有 Wow
  async findByPost(postId) {
    const wows = await this.db.all("wows", (record) => record.post_id === postId);
    return wows.sort((a, b) => new Date(b.wow_date).getTime() - new Date(a.wow_date).getTime()).map((wow) => this.mapToWow(wow));
  }
  // 獲取使用者給過的所有 Wow
  async findByUser(userId) {
    const wows = await this.db.all("wows", (record) => record.user_id === userId);
    return wows.sort((a, b) => new Date(b.wow_date).getTime() - new Date(a.wow_date).getTime()).map((wow) => this.mapToWow(wow));
  }
  // 統計貼文的 Wow 數量
  async countByPost(postId) {
    return await this.db.count("wows", (record) => record.post_id === postId);
  }
  // 統計使用者給過的 Wow 數量
  async countByUser(userId) {
    return await this.db.count("wows", (record) => record.user_id === userId);
  }
  // 統計總 Wow 數量
  async countAll() {
    return await this.db.count("wows");
  }
  // 獲取最近的 Wow 活動
  async getRecentWows(limit = 10) {
    const wows = await this.db.all("wows");
    return wows.sort((a, b) => new Date(b.wow_date).getTime() - new Date(a.wow_date).getTime()).slice(0, limit).map((wow) => this.mapToWow(wow));
  }
  // 將資料庫記錄映射為 Wow 物件
  mapToWow(row) {
    return {
      id: row.id,
      userId: row.user_id,
      postId: row.post_id,
      wowDate: new Date(row.wow_date)
    };
  }
}

export { PostRepository as P, WowRepository as W };
//# sourceMappingURL=WowRepository.mjs.map
