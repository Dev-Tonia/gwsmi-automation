import { Router } from "express";
import { MealController } from "../controller/meal.controller";
import validateInput from "../middleware/validation.middleware";
import { MealParamsDTO } from "../dtos/meal/meal-params.dto";
import z from "zod";

const mealRouter = Router();

mealRouter.get(
  "/:id",
  validateInput(z.object({ params: MealParamsDTO })),
  MealController.getMeal
);
export default mealRouter;
