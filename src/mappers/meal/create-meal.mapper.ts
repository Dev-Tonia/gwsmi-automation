import { CreateMealDTOType } from "../../dtos/meal/create-meal.dto";

export function mapCreateMeal(payload: Partial<CreateMealDTOType>) {
  return {
    eventId: payload.eventId,
    dayNumber: payload.dayNumber,
    mealTypes: payload.mealTypes,
  };
}
