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
import { MealController } from "../controller/meal.controller";
import { CreateMealDTO } from "../dtos/meal/create-meal.dto";
import { updateMealDTO } from "../dtos/meal/update-meal.dto";
import { MealParamsDTO } from "../dtos/meal/meal-params.dto";
const adminRouter = Router();

// require authentication and admin role
adminRouter.use(authenticate);

//  create a new user
adminRouter.post(
  "/users",
  validateInput(z.object({ body: CreateUserDTO })),
  requirePermission("ADD_USERS"),
  UserController.createUser
);

//  create events
adminRouter.post(
  "/events",
  requirePermission("CREATE_TICKETS"),
  uploadEventBanner.single("eventBanner"),
  validateInput(z.object({ body: CreateEventDTO })),
  EventController.createEvent
);

// update event

adminRouter.patch(
  "/events/:id",
  requirePermission("CREATE_TICKETS"),
  uploadEventBanner.single("eventBanner"),
  validateInput(z.object({ body: UpdateEventDTO, params: EventParamsDTO })),
  EventController.updateEvent
);

// delete event
adminRouter.delete(
  "/events/:id",
  requirePermission("CREATE_TICKETS"),
  validateInput(z.object({ params: EventParamsDTO })),
  EventController.deleteEvent
);

// create meals
adminRouter.post(
  "/meals",
  requirePermission("CREATE_TICKETS"),
  validateInput(z.object({ body: CreateMealDTO })),
  MealController.createMeal
);

// update meals
adminRouter.patch(
  "/meals/:id",
  requirePermission("CREATE_TICKETS"),
  validateInput(z.object({ body: updateMealDTO, params: MealParamsDTO })),
  MealController.updateMeal
);

// delete meals
adminRouter.delete(
  "/meals/:id",
  requirePermission("CREATE_TICKETS"),
  validateInput(z.object({ params: MealParamsDTO })),
  MealController.deleteMeal
);

export default adminRouter;
