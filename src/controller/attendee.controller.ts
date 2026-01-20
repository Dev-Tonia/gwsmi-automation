import { Request, Response, NextFunction } from "express";

import { AttendeeService } from "../services/attendee.service";
import { Document, DefaultSchemaOptions, Types } from "mongoose";
import { IAttendee } from "../models/attendee.model";

export const AttendeeController = {
  async createAttendeeController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const attendee = await AttendeeService.createAttendee(req.body);
    res.status(201).json({
      success: true,
      data: mapAttendeeResponse(attendee),
    });
  },
  async getAttendeeController(req: Request, res: Response) {
    const attendee = await AttendeeService.getAttendeeById(req.params.id);
    res.json({
      success: true,
      data: attendee && mapAttendeeResponse(attendee),
    });
  },
  async updateAttendeeController(req: Request, res: Response) {
    const attendee = await AttendeeService.updateAttendee(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: attendee && mapAttendeeResponse(attendee),
    });
  },

  async deleteAttendeeController(req: Request, res: Response) {
    await AttendeeService.deleteAttendee(req.params.id);
    res.status(204).send();
  },
};
function mapAttendeeResponse(
  attendee: Document<unknown, {}, IAttendee, {}, DefaultSchemaOptions> &
    IAttendee &
    Required<{ _id: Types.ObjectId }> & { __v: number }
) {
  throw new Error("Function not implemented.");
}
