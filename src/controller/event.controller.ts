import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { EventService } from "../services/event.service";
import { deleteFileIfExists } from "../utils/deleteFile.util";
import { config } from "../config";

export const EventController = {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    const session = await mongoose.startSession();

    console.log("files:", req.file);

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

  async getEvent() {
    const event = await EventService.getEvent();
  },
};
