import { z } from "zod";
import { CreateMealDTO } from "./create-meal.dto";
export const updateMealDTO = CreateMealDTO.omit({
  eventId: true,
}).partial();

export type UpdateMealDtoType = z.infer<typeof updateMealDTO>;
