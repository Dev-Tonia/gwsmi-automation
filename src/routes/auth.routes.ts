// src/routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import validateInput from "../middleware/validation.middleware";
import { AuthUserDTO } from "../dtos/user/auth-user.dto";
import { authenticate } from "../middleware/auth.middleware";
const authRouter = Router();

authRouter.post("/login", validateInput(AuthUserDTO), AuthController.login);
authRouter.post("/logout", authenticate, AuthController.logout);

export default authRouter;
