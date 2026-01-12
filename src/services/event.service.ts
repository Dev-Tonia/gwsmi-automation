// services/event.service.ts
import mongoose from "mongoose";
import Event from "../models/event.model";
import { CreateEventDTOType } from "../dtos/event/create-event.dto";
import { UpdateEventDTOType } from "../dtos/event/update-event.dto";
import { EventParamsDTOType } from "../dtos/event/event-params.dto";
import { createAppError } from "../utils/error.util";
import { deleteFileIfExists } from "../utils/deleteFile.util";
import { mapCreateEvent } from "../mappers/event/create-event.mapper";
import { mapUpdateEvent } from "../mappers/event/update-event.mapper";

export const EventService = {
  // CREATE EVENT
  async createEvent(
    data: CreateEventDTOType,
    session?: mongoose.ClientSession
  ) {
    // Check for duplicate title or startDate
    const existingEvent = await Event.findOne({
      $or: [{ title: data.title }, { startDate: data.startDate }],
    });

    if (existingEvent) {
      throw createAppError(
        "Event with either same title and start date already exists",
        400
      );
    }

    // Map input to DB-ready payload
    const payload = mapCreateEvent(data);
    const [event] = await Event.create([payload], { session });

    return event.toJSON();
  },

  // GET EVENT
  async getEvent({ id, title }: { id?: string; title?: string }) {
    if (id) {
      return Event.findById(id).lean();
    }
    if (title) {
      return Event.findOne({ title }).lean();
    }

    return Event.findOne().sort({ createdAt: -1 }).lean();
  },

  // UPDATE EVENT
  async updateEvent(
    id: EventParamsDTOType["id"],
    data: Partial<UpdateEventDTOType>,
    newBannerPath?: string
  ) {
    const event = await Event.findById(id);
    if (!event) throw createAppError("Event not found", 404);

    // Use mapper to get clean update payload
    const updatePayload = mapUpdateEvent(data);

    // Apply all mapped fields at once
    event.set(updatePayload);

    // Handle banner separately
    if (newBannerPath) {
      if (event.eventBanner) {
        await deleteFileIfExists(event.eventBanner);
      }
      event.eventBanner = newBannerPath;
    }

    await event.save();
    return event.toObject();
  },
  // DELETE EVENT
  async deleteEvent(id: EventParamsDTOType["id"]) {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createAppError("Invalid event ID", 400);
    }

    const event = await Event.findById(id);
    if (!event) {
      throw createAppError("Event not found", 404);
    }

    // Delete banner file if exists
    if (event.eventBanner) {
      await deleteFileIfExists(event.eventBanner);
    }

    await event.deleteOne();
  },
};
