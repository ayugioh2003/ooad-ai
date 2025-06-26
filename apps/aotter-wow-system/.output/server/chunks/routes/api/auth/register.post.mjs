import { d as defineEventHandler, a as assertMethod, r as readBody, c as createError, s as setCookie } from '../../../nitro/nitro.mjs';
import { i as isValidEmail, b as isValidPassword, g as getDatabase, h as hashPassword, U as UserRole, a as generateToken } from '../../../_/database.mjs';
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

const register_post = defineEventHandler(async (event) => {
  try {
    assertMethod(event, "POST");
    const body = await readBody(event);
    if (!body.username || !body.email || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields: username, email, password"
      });
    }
    if (!isValidEmail(body.email)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid email format"
      });
    }
    if (!isValidPassword(body.password)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Password must be at least 6 characters long"
      });
    }
    const db = getDatabase();
    const existingUserByEmail = await db.get("users", (user) => user.email === body.email);
    if (existingUserByEmail) {
      throw createError({
        statusCode: 409,
        statusMessage: "Email already exists"
      });
    }
    const existingUserByUsername = await db.get("users", (user) => user.username === body.username);
    if (existingUserByUsername) {
      throw createError({
        statusCode: 409,
        statusMessage: "Username already exists"
      });
    }
    const passwordHash = await hashPassword(body.password);
    const result = await db.insert("users", {
      username: body.username,
      email: body.email,
      passwordHash,
      role: UserRole.USER,
      profile: {
        displayName: body.displayName || body.username,
        bio: "",
        avatar: ""
      },
      isActive: true,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    const newUser = await db.findById("users", result.lastID);
    const token = generateToken({
      userId: newUser.id,
      username: newUser.username,
      role: newUser.role
    });
    setCookie(event, "auth-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7
      // 7 days
    });
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: "Registration successful"
    };
  } catch (error) {
    console.error("Register API Error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
