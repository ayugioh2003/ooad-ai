import { d as defineEventHandler, a as assertMethod, r as readBody, c as createError, s as setCookie } from '../../../nitro/nitro.mjs';
import { i as isValidEmail, g as getDatabase, v as verifyPassword, a as generateToken } from '../../../_/database.mjs';
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

const loginNew_post = defineEventHandler(async (event) => {
  try {
    assertMethod(event, "POST");
    const body = await readBody(event);
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: email, password"
      });
    }
    if (!isValidEmail(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid email format"
      });
    }
    const db = getDatabase();
    const user = await db.get("users", (u) => u.email === body.email);
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password"
      });
    }
    if (!user.isActive) {
      throw createError({
        statusCode: 401,
        statusMessage: "Account is disabled"
      });
    }
    const isPasswordValid = await verifyPassword(body.password, user.passwordHash);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password"
      });
    }
    const tokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role
    };
    const token = generateToken(tokenPayload);
    setCookie(event, "auth-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7
      // 7 days
    });
    const { passwordHash: _, ...userWithoutPassword } = user;
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: "Login successful"
    };
  } catch (error) {
    console.error("Login API Error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

export { loginNew_post as default };
//# sourceMappingURL=login-new.post.mjs.map
