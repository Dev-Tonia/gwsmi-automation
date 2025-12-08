import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { UserService } from "../services/user.service";

export const UserController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const user = await UserService.createUser(req.body, session);

      await session.commitTransaction();
      session.endSession();

      return res.status(201).send({
        success: true,
        message: "User created Successfully",
        data: {
          user,
        },
      });
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      await session.endSession();
    }
  },
};
