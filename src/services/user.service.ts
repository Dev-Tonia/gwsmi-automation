// src/services/user.service.ts
import User from "../models/user.model";
import { ICreateUserInput } from "../dtos/user/createUser.dto";
import bcrypt from "bcrypt";
import { config } from "../config";
import mongoose from "mongoose";
import { createAppError } from "../utils/error.util";

export const UserService = {
  async createUser(data: ICreateUserInput, session?: mongoose.ClientSession) {
    const existing = await User.findOne({ username: data.username }).session(
      session ?? null
    );
    if (existing) {
      throw createAppError("Username already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      Number(config.jwt.bcryptSaltRounds)
    );

    const [user] = await User.create(
      [
        {
          fullName: data.fullName,
          username: data.username,
          password: hashedPassword,
          role: data.role ?? "user",
          permissions: data.permissions ?? [],
        },
      ],
      { session }
    );

    return user.toJSON();
  },
};
