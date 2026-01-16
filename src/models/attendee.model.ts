import { Schema, model, Document, Types } from "mongoose";
import { CreateAttendeeDTOType } from "../dtos/attendee/create-attendee.dto";

export interface IAttendee extends CreateAttendeeDTOType, Document {
  createdAt: Date;
  updatedAt: Date;
}

const AttendeeSchema = new Schema(
  {
    eventId: {
      type: Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    /**
     * Dynamic fields coming from form builder
     * Example:
     * {
     *   gender: "Male",
     *   company: "Acme Ltd",
     *   dietaryPreference: "Vegan"
     * }
     */
    other: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const Attendee = model<IAttendee>("Attendee", AttendeeSchema);
