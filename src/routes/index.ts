import adminRouter from "./admin.routes";
import { Router } from "express";
import authRouter from "./auth.routes";

const router = Router();
// auth routes
router.use("/auth", authRouter);

// admin routes
router.use("/admin", adminRouter);

export default router;
