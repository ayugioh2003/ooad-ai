import { d as defineEventHandler, a as assertMethod, r as readBody, c as createError } from '../../nitro/nitro.mjs';
import { g as getDatabase } from '../../_/database.mjs';
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

const index_post = defineEventHandler(async (event) => {
  try {
    assertMethod(event, "POST");
    const body = await readBody(event);
    if (!body.postId || !body.category) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: postId and category"
      });
    }
    const userId = "user_test_1";
    const db = getDatabase();
    const post = await db.findById("posts", body.postId);
    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: "Post not found"
      });
    }
    const existingWow = await db.get(
      "wows",
      (wow) => wow.userId === userId && wow.postId === body.postId
    );
    if (existingWow) {
      await db.update("wows", existingWow.id, {
        category: body.category,
        updatedAt: /* @__PURE__ */ new Date()
      });
    } else {
      await db.insert("wows", {
        userId,
        postId: body.postId,
        category: body.category,
        createdAt: /* @__PURE__ */ new Date()
      });
      const currentWowCount = post.wowCount || 0;
      await db.update("posts", body.postId, {
        wowCount: currentWowCount + 1
      });
    }
    return {
      success: true,
      message: "Wow \u8A55\u50F9\u5DF2\u6210\u529F\u66F4\u65B0",
      data: {
        postId: body.postId,
        category: body.category,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }
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

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
