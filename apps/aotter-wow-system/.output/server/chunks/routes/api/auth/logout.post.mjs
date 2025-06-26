import { d as defineEventHandler, c as createError, b as deleteCookie } from '../../../nitro/nitro.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
  try {
    deleteCookie(event, "auth-token");
    return {
      success: true,
      message: "\u767B\u51FA\u6210\u529F"
    };
  } catch (error) {
    console.error("Logout API error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
