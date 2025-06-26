import { d as defineEventHandler, c as createError, e as getCookie, r as readBody } from '../../nitro/nitro.mjs';
import { P as PostService } from '../../_/PostService.mjs';
import { d as verifyToken } from '../../_/database.mjs';
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
import '../../_/WowRepository.mjs';
import '../../_/CategoryRepository.mjs';
import 'bcryptjs';
import 'jsonwebtoken';

const index_post = defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const token = getCookie(event, "auth-token");
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized"
      });
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid token"
      });
    }
    const body = await readBody(event);
    if (!body.title || !body.content || !body.categoryId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields"
      });
    }
    const postCreate = {
      title: body.title,
      content: body.content,
      categoryId: body.categoryId
    };
    const postService = new PostService();
    const result = await postService.createPost(postCreate, payload.userId);
    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || "Failed to create post"
      });
    }
    return {
      success: true,
      data: result.data,
      message: result.message
    };
  } catch (error) {
    console.error("Create post API error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
