// services/auth.service.ts
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { createAppError } from "../utils/error.util";
import { signJwt } from "../utils/token.util";
import TokenBlacklist from "../models/tokenBlacklist.model";
import jwt from "jsonwebtoken";

export const AuthService = {
  async login(username: string, password: string) {
    const user = await User.findOne({ username });
    if (!user) {
      throw createAppError("User not found", 404);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw createAppError("Invalid credentials", 401);
    }

    const token = signJwt({ id: user._id });

    return { token, user };
  },

  async logout(token: string) {
    try {
      const decoded = jwt.decode(token) as { exp?: number };

      if (!decoded?.exp) {
        throw createAppError("Invalid token", 400);
      }

      const expiresAt = new Date(decoded.exp * 1000);

      await TokenBlacklist.create({
        token,
        expiresAt,
      });

      return { message: "Logout successful" };
    } catch (error) {
      throw createAppError("Failed to logout", 500);
    }
  },
};
