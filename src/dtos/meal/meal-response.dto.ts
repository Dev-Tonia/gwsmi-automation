import { z } from "zod";
import { MealTypeDto } from "./meal-type.dto";

export const MealResponseDTO = z.object({
  id: z.string(),
  eventId: z.string(),
  dayNumber: z.number(),
  mealTypes: z.array(MealTypeDto),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type MealResponseDtoType = z.infer<typeof MealResponseDTO>;
