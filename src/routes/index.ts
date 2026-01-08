import adminRouter from "./admin.routes";
import { Router } from "express";
import authRouter from "./auth.routes";
import eventRouter from "./event.routes";
import mealRouter from "./meal.route";

const router = Router();
// auth routes
router.use("/auth", authRouter);

// admin routes
router.use("/admin", adminRouter);

// event routes
router.use("/events", eventRouter);

// meal routes
router.use("/meals", mealRouter);

export default router;
