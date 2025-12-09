import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

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
};
