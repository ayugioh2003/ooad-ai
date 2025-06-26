import { d as defineEventHandler, a as assertMethod, e as getCookie, f as getHeader, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import { W as WowRepository, P as PostRepository } from '../../../_/WowRepository.mjs';
import { d as verifyToken } from '../../../_/database.mjs';
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

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class WowService {
  constructor() {
    __publicField(this, "wowRepository", new WowRepository());
    __publicField(this, "postRepository", new PostRepository());
  }
  // 給貼文 Wow 評價
  async giveWow(userId, postId) {
    try {
      const post = await this.postRepository.findById(postId);
      if (!post) {
        return {
          success: false,
          error: "\u8CBC\u6587\u4E0D\u5B58\u5728"
        };
      }
      const existingWow = await this.wowRepository.findByUserAndPost(userId, postId);
      if (existingWow) {
        return {
          success: false,
          error: "\u60A8\u5DF2\u7D93\u5C0D\u6B64\u8CBC\u6587\u7D66\u904E Wow \u4E86"
        };
      }
      if (post.authorId === userId) {
        return {
          success: false,
          error: "\u4E0D\u80FD\u5C0D\u81EA\u5DF1\u7684\u8CBC\u6587\u7D66 Wow"
        };
      }
      const wow = await this.wowRepository.create(userId, postId);
      await this.postRepository.incrementWowCount(postId);
      return {
        success: true,
        data: wow,
        message: "Wow \u6210\u529F\uFF01"
      };
    } catch (error) {
      console.error("Give wow error:", error);
      return {
        success: false,
        error: "\u7D66 Wow \u5931\u6557"
      };
    }
  }
  // 取消 Wow 評價
  async removeWow(userId, postId) {
    try {
      const post = await this.postRepository.findById(postId);
      if (!post) {
        return {
          success: false,
          error: "\u8CBC\u6587\u4E0D\u5B58\u5728"
        };
      }
      const existingWow = await this.wowRepository.findByUserAndPost(userId, postId);
      if (!existingWow) {
        return {
          success: false,
          error: "\u60A8\u9084\u6C92\u6709\u5C0D\u6B64\u8CBC\u6587\u7D66\u904E Wow"
        };
      }
      const success = await this.wowRepository.deleteByUserAndPost(userId, postId);
      if (!success) {
        return {
          success: false,
          error: "\u53D6\u6D88 Wow \u5931\u6557"
        };
      }
      await this.postRepository.decrementWowCount(postId);
      return {
        success: true,
        message: "\u5DF2\u53D6\u6D88 Wow"
      };
    } catch (error) {
      console.error("Remove wow error:", error);
      return {
        success: false,
        error: "\u53D6\u6D88 Wow \u5931\u6557"
      };
    }
  }
  // 檢查使用者是否已對貼文給過 Wow
  async hasUserWowed(userId, postId) {
    try {
      const wow = await this.wowRepository.findByUserAndPost(userId, postId);
      return {
        success: true,
        data: !!wow
      };
    } catch (error) {
      console.error("Check wow status error:", error);
      return {
        success: false,
        error: "\u6AA2\u67E5 Wow \u72C0\u614B\u5931\u6557"
      };
    }
  }
  // 獲取貼文的 Wow 列表
  async getPostWows(postId) {
    try {
      const wows = await this.wowRepository.findByPost(postId);
      return {
        success: true,
        data: wows
      };
    } catch (error) {
      console.error("Get post wows error:", error);
      return {
        success: false,
        error: "\u7372\u53D6 Wow \u5217\u8868\u5931\u6557"
      };
    }
  }
  // 獲取使用者給過的 Wow 列表
  async getUserWows(userId) {
    try {
      const wows = await this.wowRepository.findByUser(userId);
      return {
        success: true,
        data: wows
      };
    } catch (error) {
      console.error("Get user wows error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u4F7F\u7528\u8005 Wow \u5217\u8868\u5931\u6557"
      };
    }
  }
  // 獲取統計資訊
  async getWowStats() {
    try {
      const totalWows = await this.wowRepository.countAll();
      const totalPosts = await this.postRepository.countAll();
      const avgWowsPerPost = totalPosts > 0 ? totalWows / totalPosts : 0;
      return {
        success: true,
        data: {
          totalWows,
          totalPosts,
          avgWowsPerPost: Math.round(avgWowsPerPost * 100) / 100
        }
      };
    } catch (error) {
      console.error("Get wow stats error:", error);
      return {
        success: false,
        error: "\u7372\u53D6\u7D71\u8A08\u8CC7\u8A0A\u5931\u6557"
      };
    }
  }
}

const create_post = defineEventHandler(async (event) => {
  var _a;
  try {
    assertMethod(event, "POST");
    const token = getCookie(event, "auth-token") || ((_a = getHeader(event, "authorization")) == null ? void 0 : _a.replace("Bearer ", ""));
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Missing authentication token"
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid or expired token"
      });
    }
    const body = await readBody(event);
    if (!body.postId || !body.category) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: postId and category"
      });
    }
    const wowData = {
      userId: payload.userId,
      postId: body.postId,
      category: body.category
    };
    const wowService = new WowService();
    const result = await wowService.createWow(wowData);
    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || "Failed to create wow"
      });
    }
    return {
      success: true,
      data: result.data,
      message: "Wow \u8A55\u50F9\u5DF2\u6210\u529F\u6DFB\u52A0"
    };
  } catch (error) {
    console.error("Wow API Error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
