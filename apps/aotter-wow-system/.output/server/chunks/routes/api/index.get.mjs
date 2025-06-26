import { d as defineEventHandler, a as assertMethod, c as createError } from '../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  try {
    assertMethod(event, "GET");
    const db = getDatabase();
    const categories = await db.all("categories");
    return {
      success: true,
      data: categories
    };
  } catch (error) {
    console.error("Categories API error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
