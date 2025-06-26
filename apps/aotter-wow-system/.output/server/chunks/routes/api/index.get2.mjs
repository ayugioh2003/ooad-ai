import { d as defineEventHandler, c as createError, g as getQuery } from '../../nitro/nitro.mjs';
import { P as PostService } from '../../_/PostService.mjs';
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
import '../../_/database.mjs';
import 'bcryptjs';
import 'jsonwebtoken';
import '../../_/CategoryRepository.mjs';

const index_get = defineEventHandler(async (event) => {
  if (event.node.req.method !== "GET") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    const query = getQuery(event);
    const options = {
      categoryId: query.categoryId ? Number(query.categoryId) : void 0,
      authorId: query.authorId ? Number(query.authorId) : void 0,
      search: query.search ? String(query.search) : void 0,
      sortBy: query.sortBy || "publishDate",
      sortOrder: query.sortOrder || "desc",
      limit: query.limit ? Number(query.limit) : 10,
      offset: query.offset ? Number(query.offset) : 0
    };
    const postService = new PostService();
    const result = await postService.getPosts(options);
    if (!result.success) {
      throw createError({
        statusCode: 400,
        statusMessage: result.error || "Failed to get posts"
      });
    }
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    console.error("Get posts API error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
