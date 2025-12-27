import mongoose, { Schema, Document } from "mongoose";
import { CreateEventDTOType } from "../dtos/event/create-event.dto";

export interface IEvent extends CreateEventDTOType, Document {}

const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    eventBanner: {
      type: String,
      default: null,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: (value: Date) =>
          value instanceof Date && !isNaN(value.getTime()),
        message: "Start date must be a valid date",
      },
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: (value: Date) =>
          value instanceof Date && !isNaN(value.getTime()),
        message: "End date must be a valid date",
      },
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

//  index on title

EventSchema.index(
  { title: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

// validate that endDate is after startDate
EventSchema.pre("validate", async function (this: IEvent) {
  if (this.startDate && this.endDate && this.endDate <= this.startDate) {
    this.invalidate("endDate", "End date must be after start date");
  }
});

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;
