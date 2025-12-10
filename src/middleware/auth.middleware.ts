// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import TokenBlacklist from "../models/tokenBlacklist.model";
import { verifyJwt } from "../utils/token.util";
import { createAppError } from "../utils/error.util";
import { AuthenticatedRequest } from "../types/authenticated-request";

type JwtUserPayload = { id: string; iat?: number; exp?: number };

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Extract token
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(createAppError("Authentication required", 401));
    }

    // 2. Check blacklist
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      return next(
        createAppError("Token has been revoked. Please login again.", 401)
      );
    }

    // 3. Verify token
    const decoded = verifyJwt<JwtUserPayload>(token);

    // 4. Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(createAppError("User not found", 401));
    }

    // 5. Attach user
    req.user = user;
    req.token = token;
    return next();
  } catch (error: any) {
    // JWT-specific errors
    if (error instanceof jwt.JsonWebTokenError) {
      return next(createAppError("Invalid token", 401));
    }

    if (error instanceof jwt.TokenExpiredError) {
      return next(createAppError("Token expired", 401));
    }

    return next(createAppError("Authentication failed", 401));
  }
};
