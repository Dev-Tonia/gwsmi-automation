import { Types } from "mongoose";
import { CreateMealTicketDTOType } from "../../dtos/meal-ticket/create-meal-ticket.dto";

export const mapCreateMealTicketDTOToModel = (
  dto: CreateMealTicketDTOType,
  transactionId?: string,
) => ({
  attendeeId: dto.attendeeId,
  mealId: dto.mealId,
  mealTypeId: dto.mealTypeId,
  mealMenuId: dto.mealMenuId,
  numberOfPacks: dto.numberOfPacks,
  transactionId: transactionId ? transactionId : undefined,
});
