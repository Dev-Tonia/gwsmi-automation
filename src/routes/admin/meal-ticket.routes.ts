import { Router } from "express";
import { MealTicketController } from "../../controller/meal-ticket.controller";
import { requirePermission } from "../../middleware/permission.middleware";
import validateInput from "../../middleware/validation.middleware";
import { MealTicketParamsDTO } from "../../dtos/meal-ticket/meal-ticket-params.dto";
import z from "zod";

const adminMealTicketRouter = Router();

// adminMealTicketRouter.post("/",  MealTicketController.create);
adminMealTicketRouter.get("/", MealTicketController.getAll);
adminMealTicketRouter.get(
  "/:id",
  validateInput(z.object({ params: MealTicketParamsDTO })),
  MealTicketController.getById,
);
adminMealTicketRouter.patch(
  "/:id",
  validateInput(z.object({ params: MealTicketParamsDTO })),
  MealTicketController.update,
);
adminMealTicketRouter.post(
  "/:id/redeem",
  requirePermission("SCAN_TICKETS"),
  validateInput(z.object({ params: MealTicketParamsDTO })),
  MealTicketController.redeemMealTicket,
);
adminMealTicketRouter.delete(
  "/:id",
  validateInput(z.object({ params: MealTicketParamsDTO })),
  MealTicketController.delete,
);

export default adminMealTicketRouter;
