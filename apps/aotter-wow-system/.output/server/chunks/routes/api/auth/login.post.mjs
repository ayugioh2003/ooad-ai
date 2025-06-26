import { d as defineEventHandler, c as createError, r as readBody, s as setCookie } from '../../../nitro/nitro.mjs';
import { g as getDatabase, h as hashPassword, t as toUserPublic, a as generateToken, i as isValidEmail, v as verifyPassword, b as isValidPassword, c as isValidUsername } from '../../../_/database.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'chokidar';
import 'anymatch';
import 'node:crypto';
import 'node:url';
import 'bcryptjs';
import 'jsonwebtoken';

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, key + "" , value);
class UserRepository {
  constructor() {
    __publicField$1(this, "db", getDatabase());
  }
  // 根據 ID 查找使用者
  async findById(id) {
    const user = await this.db.get("users", (record) => record.id === id);
    if (!user) return null;
    return this.mapToUser(user);
  }
  // 根據 Email 查找使用者
  async findByEmail(email) {
    const user = await this.db.get("users", (record) => record.email === email);
    if (!user) return null;
    return this.mapToUser(user);
  }
  // 根據使用者名稱查找使用者
  async findByUsername(username) {
    const user = await this.db.get("users", (record) => record.username === username);
    if (!user) return null;
    return this.mapToUser(user);
  }
  // 創建新使用者
  async create(userRegistration) {
    const result = await this.db.insert("users", {
      username: userRegistration.username,
      email: userRegistration.email,
      password: userRegistration.password,
      join_date: (/* @__PURE__ */ new Date()).toISOString(),
      user_type: "regular"
    });
    const userId = result.lastID;
    const user = await this.findById(userId);
    if (!user) {
      throw new Error("Failed to retrieve created user");
    }
    return user;
  }
  // 更新使用者資料
  async update(id, updates) {
    const updateData = {};
    if (updates.username) updateData.username = updates.username;
    if (updates.email) updateData.email = updates.email;
    if (updates.password) updateData.password = updates.password;
    if (updates.userType) updateData.user_type = updates.userType;
    if (Object.keys(updateData).length === 0) {
      return this.findById(id);
    }
    const result = await this.db.update("users", id, updateData);
    if (result.changes === 0) {
      return null;
    }
    return this.findById(id);
  }
  // 刪除使用者
  async delete(id) {
    const result = await this.db.delete("users", id);
    return result.changes > 0;
  }
  // 獲取所有使用者（管理員功能）
  async findAll(limit = 50, offset = 0) {
    const allUsers = await this.db.all("users");
    const sortedUsers = allUsers.sort((a, b) => new Date(b.join_date).getTime() - new Date(a.join_date).getTime()).slice(offset, offset + limit);
    return sortedUsers.map((user) => this.mapToUserPublic(user));
  }
  // 統計使用者總數
  async countAll() {
    return await this.db.count("users");
  }
  // 檢查 Email 是否已存在
  async emailExists(email) {
    const user = await this.db.get("users", (record) => record.email === email);
    return !!user;
  }
  // 檢查使用者名稱是否已存在
  async usernameExists(username) {
    const user = await this.db.get("users", (record) => record.username === username);
    return !!user;
  }
  // 將資料庫記錄映射為 User 物件
  mapToUser(row) {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      password: row.password,
      joinDate: new Date(row.join_date),
      userType: row.user_type
    };
  }
  // 將資料庫記錄映射為 UserPublic 物件
  mapToUserPublic(row) {
    return {
      id: row.id,
      username: row.username,
      email: row.email,
      joinDate: new Date(row.join_date),
      userType: row.user_type
    };
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class UserService {
  constructor() {
    __publicField(this, "userRepository", new UserRepository());
  }
  // 使用者註冊
  async register(userRegistration) {
    try {
      const validation = this.validateRegistrationData(userRegistration);
      if (!validation.success) {
        return validation;
      }
      const emailExists = await this.userRepository.emailExists(userRegistration.email);
      if (emailExists) {
        return {
          success: false,
          error: "Email \u5DF2\u88AB\u4F7F\u7528"
        };
      }
      const usernameExists = await this.userRepository.usernameExists(userRegistration.username);
      if (usernameExists) {
        return {
          success: false,
          error: "\u4F7F\u7528\u8005\u540D\u7A31\u5DF2\u88AB\u4F7F\u7528"
        };
      }
      const hashedPassword = await hashPassword(userRegistration.password);
      const user = await this.userRepository.create({
        ...userRegistration,
        password: hashedPassword
      });
      const userPublic = toUserPublic(user);
      const token = generateToken(userPublic);
      return {
        success: true,
        data: {
          user: userPublic,
          token
        },
        message: "\u8A3B\u518A\u6210\u529F"
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: "\u8A3B\u518A\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66"
      };
    }
  }
  // 使用者登入
  async login(userLogin) {
    try {
      if (!userLogin.email || !userLogin.password) {
        return {
          success: false,
          error: "Email \u548C\u5BC6\u78BC\u70BA\u5FC5\u586B\u6B04\u4F4D"
        };
      }
      if (!isValidEmail(userLogin.email)) {
        return {
          success: false,
          error: "Email \u683C\u5F0F\u4E0D\u6B63\u78BA"
        };
      }
      const user = await this.userRepository.findByEmail(userLogin.email);
      if (!user) {
        return {
          success: false,
          error: "Email \u6216\u5BC6\u78BC\u932F\u8AA4"
        };
      }
      const isPasswordValid = await verifyPassword(userLogin.password, user.password);
      if (!isPasswordValid) {
        return {
          success: false,
          error: "Email \u6216\u5BC6\u78BC\u932F\u8AA4"
        };
      }
      const userPublic = toUserPublic(user);
      const token = generateToken(userPublic);
      return {
        success: true,
        data: {
          user: userPublic,
          token
        },
        message: "\u767B\u5165\u6210\u529F"
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: "\u767B\u5165\u5931\u6557\uFF0C\u8ACB\u7A0D\u5F8C\u518D\u8A66"
      };
    }
  }
  // 根據 ID 獲取使用者資料
  async getUserById(id) {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        return {
          success: false,
          error: "\u4F7F\u7528\u8005\u4E0D\u5B58\u5728"
        };
      }
      return {
        success: true,
        data: toUserPublic(user)
      };
    } catch (error) {
      console.error("Get user error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u4F7F\u7528\u8005\u8CC7\u6599\u5931\u6557"
      };
    }
  }
  // 更新使用者資料
  async updateUser(id, updates) {
    try {
      if (updates.password) {
        if (!isValidPassword(updates.password)) {
          return {
            success: false,
            error: "\u5BC6\u78BC\u81F3\u5C11\u9700\u8981 6 \u500B\u5B57\u5143"
          };
        }
        updates.password = await hashPassword(updates.password);
      }
      if (updates.email && !isValidEmail(updates.email)) {
        return {
          success: false,
          error: "Email \u683C\u5F0F\u4E0D\u6B63\u78BA"
        };
      }
      if (updates.username && !isValidUsername(updates.username)) {
        return {
          success: false,
          error: "\u4F7F\u7528\u8005\u540D\u7A31\u53EA\u80FD\u5305\u542B\u82F1\u6587\u3001\u6578\u5B57\u3001\u5E95\u7DDA\uFF0C\u9577\u5EA6 3-20 \u5B57\u5143"
        };
      }
      const user = await this.userRepository.update(id, updates);
      if (!user) {
        return {
          success: false,
          error: "\u4F7F\u7528\u8005\u4E0D\u5B58\u5728"
        };
      }
      return {
        success: true,
        data: toUserPublic(user),
        message: "\u66F4\u65B0\u6210\u529F"
      };
    } catch (error) {
      console.error("Update user error:", error);
      return {
        success: false,
        error: "\u66F4\u65B0\u5931\u6557"
      };
    }
  }
  // 刪除使用者（管理員功能）
  async deleteUser(id) {
    try {
      const success = await this.userRepository.delete(id);
      if (!success) {
        return {
          success: false,
          error: "\u4F7F\u7528\u8005\u4E0D\u5B58\u5728"
        };
      }
      return {
        success: true,
        message: "\u522A\u9664\u6210\u529F"
      };
    } catch (error) {
      console.error("Delete user error:", error);
      return {
        success: false,
        error: "\u522A\u9664\u5931\u6557"
      };
    }
  }
  // 驗證註冊資料
  validateRegistrationData(data) {
    const errors = [];
    if (!data.username) {
      errors.push("\u4F7F\u7528\u8005\u540D\u7A31\u70BA\u5FC5\u586B\u6B04\u4F4D");
    } else if (!isValidUsername(data.username)) {
      errors.push("\u4F7F\u7528\u8005\u540D\u7A31\u53EA\u80FD\u5305\u542B\u82F1\u6587\u3001\u6578\u5B57\u3001\u5E95\u7DDA\uFF0C\u9577\u5EA6 3-20 \u5B57\u5143");
    }
    if (!data.email) {
      errors.push("Email \u70BA\u5FC5\u586B\u6B04\u4F4D");
    } else if (!isValidEmail(data.email)) {
      errors.push("Email \u683C\u5F0F\u4E0D\u6B63\u78BA");
    }
    if (!data.password) {
      errors.push("\u5BC6\u78BC\u70BA\u5FC5\u586B\u6B04\u4F4D");
    } else if (!isValidPassword(data.password)) {
      errors.push("\u5BC6\u78BC\u81F3\u5C11\u9700\u8981 6 \u500B\u5B57\u5143");
    }
    if (errors.length > 0) {
      return {
        success: false,
        error: errors.join(", ")
      };
    }
    return {
      success: true
    };
  }
}

const login_post = defineEventHandler(async (event) => {
  var _a, _b;
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const body = await readBody(event);
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing email or password"
      });
    }
    const userLogin = {
      email: body.email,
      password: body.password
    };
    const userService = new UserService();
    const result = await userService.login(userLogin);
    if (!result.success) {
      throw createError({
        statusCode: 401,
        statusMessage: result.error || "Login failed"
      });
    }
    const token = (_a = result.data) == null ? void 0 : _a.token;
    if (token) {
      setCookie(event, "auth-token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7
        // 7 days
      });
    }
    return {
      success: true,
      data: {
        user: (_b = result.data) == null ? void 0 : _b.user
      },
      message: result.message
    };
  } catch (error) {
    console.error("Login API error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
