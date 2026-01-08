import { MealResponseDtoType } from "../../dtos/meal/meal-response.dto";

export const mapMealToResponse = (meal: any): MealResponseDtoType => {
  return {
    id: meal._id.toString(),
    eventId: meal.eventId,
    dayNumber: meal.dayNumber,
    mealTypes: meal.mealTypes,
    createdAt: meal.createdAt,
    updatedAt: meal.updatedAt,
  };
};
