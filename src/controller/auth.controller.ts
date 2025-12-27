import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { AuthenticatedRequest } from "../types/authenticated-request";
import { createAppError } from "../utils/error.util";

export const AuthController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const result = await AuthService.login(username, password);

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const token = req.token;

      if (!token) {
        return next(createAppError("Token missing", 401));
      }

      const result = await AuthService.logout(token);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};
