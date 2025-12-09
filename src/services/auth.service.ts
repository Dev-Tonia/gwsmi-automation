import User from "../models/user.model";
import bcrypt from "bcrypt";
import { createAppError } from "../utils/error.util";
import { signJwt } from "../utils/token.util";

export const AuthService = {
  async login(username: string, password: string) {
    // 1. Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      throw createAppError("User not found", 404);
    }

    // 2. Validate password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw createAppError("Invalid credentials", 401);
    }

    // 3. Generate token
    const token = signJwt({ id: user._id });

    return { token, user };
  },
};
