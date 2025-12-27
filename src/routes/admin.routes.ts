// src/routes/admin.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { z } from "zod";
import { requirePermission } from "../middleware/permission.middleware";
import { CreateUserDTO } from "../dtos/user/createUser.dto";
import { UserController } from "../controller/user.controller";
import validateInput from "../middleware/validation.middleware";
import { uploadEventBanner } from "../middleware/upload.middleware";
import { EventController } from "../controller/event.controller";
import { eventSchema } from "../database/schemas/event.schema";
import { UpdateEventDTO } from "../dtos/event/updateEvent.dto";
import { EventParamsDTO } from "../dtos/event/eventParams.dto";
const adminRouter = Router();

// require authentication and admin role
adminRouter.use(authenticate);

// Route to create a new user
adminRouter.post(
  "/users",
  validateInput(z.object({ body: CreateUserDTO })),
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

// update event route

adminRouter.patch(
  "/events/:id",
  requirePermission("CREATE_TICKETS"),
  uploadEventBanner.single("eventBanner"),
  validateInput(z.object({ body: UpdateEventDTO, params: EventParamsDTO })),
  EventController.updateEvent
);

adminRouter.delete(
  "/events/:id",
  requirePermission("CREATE_TICKETS"),
  validateInput(z.object({ params: EventParamsDTO })),
  EventController.deleteEvent
);

export default adminRouter;
