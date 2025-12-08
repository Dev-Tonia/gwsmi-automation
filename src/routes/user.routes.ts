import { Router } from "express";
import { z } from "zod";
import { requirePermission } from "../middleware/permission.middleware";
import { createUserSchema } from "../schemas/createUser.schema";
import { UserController } from "../controller/user.controller";
import validateInput from "../middleware/validation.middleware";

const router = Router();

router.post(
  "/users",
  validateInput(z.object({ body: createUserSchema })),
  requirePermission("ADD_USERS"),
  UserController.createUser
);

export default router;
