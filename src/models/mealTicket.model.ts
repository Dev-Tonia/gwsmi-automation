import mongoose, { Schema, Types, Document } from "mongoose";
import { CreateMealTicketDTOType } from "../dtos/meal-ticket/create-meal-ticket.dto";

export interface IMealTicket extends CreateMealTicketDTOType, Document {
  status: "pending" | "active" | "cancelled" | "refunded";
  redeemedAt?: Date | null;
  redeemedBy?: Types.ObjectId;
  transactionId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MealTicketSchema = new Schema(
  {
    attendeeId: {
      type: Types.ObjectId,
      ref: "Attendee",
      required: true,
      index: true,
    },

    mealId: {
      type: Types.ObjectId,
      ref: "Meal",
      required: true,
      index: true,
    },

    mealTypeId: {
      type: Types.ObjectId,
      required: true,
    },

    mealMenuId: {
      type: Types.ObjectId,
      required: true,
    },

    numberOfPacks: {
      type: Number,
      required: true,
      min: 1,
    },

    // payment / validity status
    status: {
      type: String,
      enum: ["pending", "active", "cancelled", "refunded"],
      default: "pending",
      index: true,
    },

    redeemedAt: {
      type: Date,
      default: null,
    },

    redeemedBy: {
      type: Types.ObjectId,
      ref: "User", // staff / scanner device
    },

    // payment traceability
    transactionId: {
      type: Types.ObjectId,
      ref: "Transaction",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent double issuing for same option
MealTicketSchema.index(
  {
    attendeeId: 1,
    mealId: 1,
    mealTypeId: 1,
    mealMenuId: 1,
  },
  { unique: true },
);

const MealTicket = mongoose.model<IMealTicket>("MealTicket", MealTicketSchema);

export default MealTicket;
