// src/routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import validateInput from "../middleware/validation.middleware";
import { LoginSchema } from "../database/schemas/login.schema";
const authRouter = Router();

authRouter.post("/login", validateInput(LoginSchema), AuthController.login);

export default authRouter;
