// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { AuthenticatedRequest } from "../types/authenticated-request";

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await User.findOne({
      _id: decoded.id,
    });

    console.log(user);

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    req.user = user; // TypeScript should now recognize this property
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};
