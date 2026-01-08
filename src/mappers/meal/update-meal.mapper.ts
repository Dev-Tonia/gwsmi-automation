import { UpdateMealDtoType } from "../../dtos/meal/update-meal.dto";

export const mapUpdateMeal = (payload: UpdateMealDtoType) => {
  const update: Partial<UpdateMealDtoType> = {};

  if (payload.dayNumber !== undefined) {
    update.dayNumber = payload.dayNumber;
  }

  if (payload.mealTypes !== undefined) {
    update.mealTypes = payload.mealTypes;
  }

  return update;
};
