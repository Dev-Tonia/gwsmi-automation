import { CreateMealDTOType } from "../dtos/meal/create-meal.dto";
import { mapMealToResponse } from "../mappers/meal/meal-response.mapper";
import { mapCreateMeal } from "../mappers/meal/create-meal.mapper";
import Meal from "../models/meal.model";
import { MealParamsDTOType } from "../dtos/meal/meal-params.dto";
import { create } from "domain";
import { createAppError } from "../utils/error.util";
import { mapUpdateMeal } from "../mappers/meal/update-meal.mapper";

export const MealService = {
  // get all meals
  // CREATE MEAL
  async createMeal(data: CreateMealDTOType) {
    const { eventId, dayNumber } = data;

    // 1️⃣ Check if dayNumber already exists for this event
    const exists = await Meal.exists({
      eventId,
      dayNumber,
    });

    if (exists) {
      throw createAppError(
        `Meal for day  ${dayNumber} already exists for this event.`,
        400
      );
    }
    // Logic to create a meal
    const payload = mapCreateMeal(data);
    const [meal] = await Meal.create([payload]);

    return mapMealToResponse(meal);

    // return meal.toJSON();
  },

  // UPDATE MEAL
  async updateMeal(
    mealId: MealParamsDTOType["id"],
    data: Partial<CreateMealDTOType>
  ) {
    // get the meal by id
    const meal = await Meal.findById(mealId);

    if (!meal) throw createAppError("Meal not found", 404);

    // update the meal using mapper
    const updatePayload = mapUpdateMeal(data);

    meal.set(updatePayload);
    await meal.save();

    return mapMealToResponse(meal);
  },

  // get meal by id
  async getMeal(mealId: MealParamsDTOType["id"]) {
    const meal = await Meal.findById(mealId);

    if (!meal) throw createAppError("Meal not found", 404);

    return mapMealToResponse(meal);
  },

  // delete meal by id
  async deleteMeal(mealId: MealParamsDTOType["id"]) {
    const meal = await Meal.findById(mealId);

    if (!meal) throw createAppError("Meal not found", 404);

    await meal.deleteOne();
  },
};
