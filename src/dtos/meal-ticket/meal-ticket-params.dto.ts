import { z } from "zod";

export const MealTicketParamsDTO = z.object({
  id: z.string().min(1),
});

export type MealTicketParamsDTOType = z.infer<typeof MealTicketParamsDTO>;
