import { z } from "zod";

export const CreateMealTicketDTO = z.object({
  attendeeId: z.string().min(1, "Attendee id is required"),
  mealId: z.string().min(1, "Meal id is required"),
  mealTypeId: z.string().min(1, "Meal type id is required"),
  mealMenuId: z.string().min(1, "Meal menu id is required"),
  numberOfPacks: z.number().int().min(1),
});

export type CreateMealTicketDTOType = z.infer<typeof CreateMealTicketDTO>;
