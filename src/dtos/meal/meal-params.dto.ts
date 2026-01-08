import { z } from "zod";

export const MealParamsDTO = z.object({
  id: z.string().min(1, "Meal id is required"),
});

export type MealParamsDTOType = z.infer<typeof MealParamsDTO>;
