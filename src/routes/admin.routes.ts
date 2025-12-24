// src/routes/admin.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { z } from "zod";
import { requirePermission } from "../middleware/permission.middleware";
import { createUserSchema } from "../database/schemas/createUser.schema";
import { UserController } from "../controller/user.controller";
import validateInput from "../middleware/validation.middleware";
import { uploadEventBanner } from "../middleware/upload.middleware";
import { EventController } from "../controller/event.controller";
import { eventSchema } from "../database/schemas/event.schema";
const adminRouter = Router();

// require authentication and admin role
adminRouter.use(authenticate);

// Route to create a new user
adminRouter.post(
  "/users",
  validateInput(z.object({ body: createUserSchema })),
  requirePermission("ADD_USERS"),
  UserController.createUser
);

// route to create events
adminRouter.post(
  "/events",
  requirePermission("CREATE_TICKETS"),
  uploadEventBanner.single("eventBanner"),
  validateInput(z.object({ body: eventSchema })),
  EventController.createEvent
);

export default adminRouter;
