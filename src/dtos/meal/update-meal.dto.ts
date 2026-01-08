import { z } from "zod";
import { CreateMealDTO } from "./create-meal.dto";
export const updateMealDTO = CreateMealDTO.partial();

export type UpdateMealDtoType = z.infer<typeof updateMealDTO>;
