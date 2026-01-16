// import adminRouter from "./admin.routes";
import { Router } from "express";
import authRouter from "./auth.routes";
import eventRouter from "./event.routes";
import mealRouter from "./meal.route";
import adminIndexRouter from "./admin";
import formBuilderRouter from "./formBuilder.routes";
import attendeeRouter from "./attendee.routes";

const router = Router();
// auth routes
router.use("/auth", authRouter);

// admin routes
// router.use("/admin", adminRouter);
router.use("/admin", adminIndexRouter);

// event routes
router.use("/events", eventRouter);

// meal routes
router.use("/meals", mealRouter);

// form builder routes
router.use("/form-builder", formBuilderRouter);

// attendee routes
router.use("/attendees", attendeeRouter);

export default router;
