import { Router } from "express";
import adminFormBuilderRouter from "./form-builder.routes";
import { authenticate } from "../../middleware/auth.middleware";

const adminIndexRouter = Router();

// require authentication and admin role
adminIndexRouter.use(authenticate);

adminIndexRouter.use("/form-builder", adminFormBuilderRouter);

export default adminIndexRouter;
