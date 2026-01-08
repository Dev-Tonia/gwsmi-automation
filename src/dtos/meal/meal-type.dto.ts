import { z } from "zod";
import { MealMenuDTO } from "./meal-menu.dto";

export const MealTypeDto = z.object({
  type: z.enum(["breakfast", "lunch", "dinner"]),
  menu: z
    .array(MealMenuDTO)
    .min(1, "Each meal type must have at least one option"),
});
