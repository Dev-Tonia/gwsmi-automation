// src/routes/admin.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { z } from "zod";
import { requirePermission } from "../middleware/permission.middleware";
import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { UserController } from "../controller/user.controller";
import validateInput from "../middleware/validation.middleware";
import { uploadEventBanner } from "../middleware/upload.middleware";
import { EventController } from "../controller/event.controller";
import { CreateEventDTO } from "../dtos/event/create-event.dto";
import { UpdateEventDTO } from "../dtos/event/update-event.dto";
import { EventParamsDTO } from "../dtos/event/event-params.dto";
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
  validateInput(z.object({ body: CreateEventDTO })),
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
