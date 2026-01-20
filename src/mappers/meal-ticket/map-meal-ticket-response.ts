// mappers/meal-ticket/map-meal-ticket-response.ts

import { IMealTicket } from "../../models/mealTicket.model";

export const mapMealTicketToResponse = (ticket: IMealTicket) => ({
  id: ticket._id.toString(),
  attendeeId: ticket.attendeeId.toString(),
  mealId: ticket.mealId.toString(),
  mealTypeId: ticket.mealTypeId.toString(),
  mealMenuId: ticket.mealMenuId.toString(),
  numberOfPacks: ticket.numberOfPacks,
  status: ticket.status,
  redeemedAt: ticket.redeemedAt ?? null,
  redeemedBy: ticket.redeemedBy?.toString() ?? null,
  transactionId: ticket.transactionId?.toString() ?? null,
  createdAt: ticket.createdAt,
  updatedAt: ticket.updatedAt,
});
