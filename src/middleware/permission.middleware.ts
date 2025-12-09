// src/middleware/permission.middleware.ts
import { Request, Response, NextFunction } from "express";
import { Permission } from "../utils/constants/permissions";
import { AuthenticatedRequest } from "../types/authenticated-request";

export const requirePermission =
  (permission: Permission) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user; // typed as IUser | undefined thanks to declaration merging

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!user.permissions?.includes(permission)) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }

    next();
  };
