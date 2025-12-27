import mongoose from "mongoose";
import { IEventInput } from "../database/schemas/event.schema";
import Event from "../models/events.model";
import { UpdateEventDTOType } from "../dtos/event/updateEvent.dto";
import { EventParamsDTOType } from "../dtos/event/eventParams.dto";
import { createAppError } from "../utils/error.util";
import { deleteFileIfExists } from "../utils/deleteFile.util";

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

  async getEvent({ id, title }: { id?: string; title?: string }) {
    if (id) {
      return Event.findById(id).lean();
    }

    if (title) {
      return Event.findOne({
        title,
      }).lean();
    }

    return Event.findOne().sort({ createdAt: -1 }).lean();
  },

  async updateEvent(
    id: EventParamsDTOType["id"],
    data: Partial<UpdateEventDTOType>,
    newBannerPath?: string
  ) {
    const event = await Event.findById(id);

    if (!event) {
      throw createAppError("Event not found", 404);
    }

    if (data.title !== undefined) {
      event.title = data.title;
    }

    if (data.description !== undefined) {
      event.description = data.description;
    }

    if (data.startDate !== undefined) {
      event.startDate = data.startDate;
    }

    if (data.endDate !== undefined) {
      event.endDate = data.endDate;
    }

    if (data.location !== undefined) {
      event.location = data.location;
    }

    if (newBannerPath) {
      if (event.eventBanner) {
        await deleteFileIfExists(event.eventBanner);
      }
      event.eventBanner = newBannerPath;
    }

    await event.save();
    return event.toObject();
  },

  async deleteEvent(id: string) {
    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createAppError("Invalid event ID", 400);
    }

    const event = await Event.findById(id);

    if (!event) {
      throw createAppError("Event not found", 404);
    }

    // delete event banner if exists
    if (event.eventBanner) {
      await deleteFileIfExists(event.eventBanner);
    }

    await event.deleteOne();
  },
};
