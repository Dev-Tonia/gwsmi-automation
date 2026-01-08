import { z } from "zod";
import { ObjectId } from "mongodb";
import { MealTypeDto } from "./meal-type.dto";

export const CreateMealDTO = z.object({
  eventId: z.string().refine((value) => ObjectId.isValid(value), {
    message: "Invalid event ID",
  }),
  dayNumber: z.number().min(1, "Day number must be at least 1"),
  mealTypes: z
    .array(MealTypeDto)
    .min(1, "At least one meal type is required")
    .refine(
      (types) => {
        const unique = new Set(types.map((t) => t.type));
        return unique.size === types.length;
      },
      {
        message: "Duplicate meal types are not allowed",
      }
    ),
});

export type CreateMealDTOType = z.infer<typeof CreateMealDTO>;
