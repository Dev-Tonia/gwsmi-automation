// dtos/meal-ticket/update-meal-ticket.dto.ts
import { z } from "zod";

export const UpdateMealTicketDTO = z.object({
  // payment / validity state
  status: z.enum(["pending", "active", "cancelled", "refunded"]).optional(),

  redeemedAt: z.date().optional().nullable(),

  redeemedBy: z.string().optional().nullable(),
});

export type UpdateMealTicketDTOType = z.infer<typeof UpdateMealTicketDTO>;
