import adminRouter from "./admin.routes";
import { Router } from "express";
import authRouter from "./auth.routes";
import eventRouter from "./event.routes";

const router = Router();
// auth routes
router.use("/auth", authRouter);

// admin routes
router.use("/admin", adminRouter);

// event routes
router.use("/events", eventRouter);

export default router;
