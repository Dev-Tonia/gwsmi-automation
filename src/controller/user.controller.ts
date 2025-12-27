import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { UserService } from "../services/user.service";
import { config } from "../config";

export const UserController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const session = await mongoose.startSession();
    let user;

    try {
      if (config.nodeEnv === "production") {
        session.startTransaction();
        user = await UserService.createUser(req.body, session);
        await session.commitTransaction();
      } else {
        user = await UserService.createUser(req.body);
      }

      return res.status(201).send({
        success: true,
        message: "User created",
        data: { user },
      });
    } catch (error) {
      if (config.nodeEnv === "production") {
        await session.abortTransaction();
      }
      next(error);
    } finally {
      session.endSession();
    }
  },
};
