import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { EventService } from "../services/event.service";
import { deleteFileIfExists } from "../utils/deleteFile.util";
import { config } from "../config";
import { createAppError } from "../utils/error.util";

export const EventController = {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    const session = await mongoose.startSession();

    //  getting file path from multer
    const bannerPath = req.file?.path;

    try {
      // attach file path to payload
      const payload = {
        ...req.body,
        eventBanner: bannerPath,
      };

      // on local, no transaction
      if (config.nodeEnv !== "production") {
        const event = await EventService.createEvent(payload);
        return res.status(201).json({
          success: true,
          message: "Event created",
          data: { event },
        });
      }

      // on production (transaction)
      session.startTransaction();

      const event = await EventService.createEvent(payload, session);

      await session.commitTransaction();

      return res.status(201).json({
        success: true,
        message: "Event created",
        data: { event },
      });
    } catch (error) {
      // rollback DB
      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      // delete uploaded file
      await deleteFileIfExists(bannerPath);

      next(error);
    } finally {
      session.endSession();
    }
  },

  async getEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, title } = req.query;

      const event = await EventService.getEvent({
        id: id as string | undefined,
        title: title as string | undefined,
      });

      if (!event) {
        throw createAppError("Event not found", 404);
      }

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },

  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;
      //  getting file path from multer
      const bannerPath = req.file?.path;

      const event = await EventService.updateEvent(id, data, bannerPath);

      res.status(200).json(event);
    } catch (error) {
      // cleanup  uploaded file if updating event fails
      if (req.file) {
        await deleteFileIfExists(req.file.path);
      }
      next(error);
    }
  },

  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await EventService.deleteEvent(id);

      return res.status(200).json({
        success: true,
        message: "Event deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
