import { Types } from "mongoose";
import { CreateMealTicketDTOType } from "../../dtos/meal-ticket/create-meal-ticket.dto";
import { UpdateMealTicketDTOType } from "../../dtos/meal-ticket/update-meal-ticket.dto";
import { mapCreateMealTicketDTOToModel } from "../../mappers/meal-ticket/map-create-meal-ticket";
import MealTicket from "../../models/mealTicket.model";
import { createAppError } from "../../utils/error.util";

export const MealTicketService = {
  async create(payload: CreateMealTicketDTOType, transactionId?: string) {
    return MealTicket.create(
      mapCreateMealTicketDTOToModel(payload, transactionId),
    );
  },

  async getById(id: string) {
    return MealTicket.findById(id);
  },

  async getAll(filter: Partial<{ attendeeId: string; transactionId: string }>) {
    const query: any = {};

    if (filter.attendeeId) {
      query.attendeeId = new Types.ObjectId(filter.attendeeId);
    }

    if (filter.transactionId) {
      query.transactionId = new Types.ObjectId(filter.transactionId);
    }

    return MealTicket.find(query).sort({ createdAt: -1 });
  },

  async update(id: string, payload: UpdateMealTicketDTOType) {
    const updatePayload: any = { ...payload };

    return MealTicket.findByIdAndUpdate(id, updatePayload, { new: true });
  },

  async redeemMealTicket(ticketId: string, staffId: string) {
    const ticket = await MealTicket.findById(ticketId);

    if (!ticket) {
      throw createAppError("Meal ticket not found", 404);
    }

    if (ticket.status !== "active") {
      throw createAppError(
        `Ticket cannot be redeemed while status is '${ticket.status}'`,
        400,
      );
    }

    // ✅ single source of truth
    if (ticket.redeemedAt) {
      throw createAppError("Meal ticket has already been redeemed", 400);
    }

    ticket.redeemedAt = new Date();
    ticket.redeemedBy = new Types.ObjectId(staffId);

    await ticket.save();
    return ticket;
  },
  async delete(id: string) {
    return MealTicket.findByIdAndDelete(id);
  },
};
