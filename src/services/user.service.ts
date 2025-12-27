// src/services/user.service.ts
import User from "../models/user.model";
import { CreateUserDTOType } from "../dtos/user/create-user.dto";
import bcrypt from "bcrypt";
import { config } from "../config";
import mongoose from "mongoose";
import { createAppError } from "../utils/error.util";
import { mapCreateUser } from "../mappers/user/create-user.mapper";

export const UserService = {
  async createUser(data: CreateUserDTOType, session?: mongoose.ClientSession) {
    // Step 1: map and clean input
    const payload = mapCreateUser(data);

    // Step 2: check if username exists
    const existing = await User.findOne({ username: payload.username }).session(
      session ?? null
    );
    if (existing) {
      throw createAppError("Username already exists", 409);
    }

    // Step 3: hash password
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.jwt.bcryptSaltRounds)
    );

    // Step 4: create user directly from payload
    const [user] = await User.create([payload], { session });

    return user.toJSON();
  },
};
