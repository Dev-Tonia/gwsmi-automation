import mongoose from "mongoose";
import { IEventInput } from "../database/schemas/event.schema";
import Event from "../models/events.model";

export const EventService = {
  async createEvent(data: IEventInput, session?: mongoose.ClientSession) {
    // check if the event with the same title or startDate already exists
    const existingEvent = await Event.findOne({
      or: [{ title: data.title }, { startDate: data.startDate }],
    });
    if (existingEvent) {
      throw new Error(
        "Event with the same title and start date already exists"
      );
    }
    const [event] = await Event.create([data], { session });
    return event.toJSON();
  },

  async getEvent() {
    // get the latest event
    const event = await Event.findOne().sort({ createAt: -1 });

    return event?.toJSON;
  },
};
