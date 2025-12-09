// src/routes/admin.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { z } from "zod";
import { requirePermission } from "../middleware/permission.middleware";
import { createUserSchema } from "../database/schemas/createUser.schema";
import { UserController } from "../controller/user.controller";
import validateInput from "../middleware/validation.middleware";
const adminRouter = Router();

// All routes in this router require authentication and admin role
adminRouter.use(authenticate);

adminRouter.post(
  "/users",
  validateInput(z.object({ body: createUserSchema })),
  requirePermission("ADD_USERS"),
  UserController.createUser
);

export default adminRouter;
