// dtos/meal-ticket/meal-ticket-response.dto.ts
import { z } from "zod";

export const MealTicketResponseDTO = z.object({
  id: z.string(),
  attendeeId: z.string(),
  mealId: z.string(),
  mealTypeId: z.string(),
  mealMenuId: z.string(),
  numberOfPacks: z.number(),
  status: z.enum(["pending", "active", "cancelled", "refunded"]),
  redeemedAt: z.date().nullable(),
  redeemedBy: z.string().nullable(),
  transactionId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type MealTicketResponseDTOType = z.infer<typeof MealTicketResponseDTO>;
