import { Router } from "express";
import { AttendeeController } from "../controller/attendee.controller";
import validateInput from "../middleware/validation.middleware";
import z from "zod";
import { CreateAttendeeDTO } from "../dtos/attendee/create-attendee.dto";

const attendeeRouter = Router();

attendeeRouter.post(
  "/",
  validateInput(z.object({ body: CreateAttendeeDTO })),
  AttendeeController.createAttendeeController,
);
attendeeRouter.get("/:id", AttendeeController.getAttendeeController);
attendeeRouter.patch("/:id", AttendeeController.updateAttendeeController);
attendeeRouter.delete("/:id", AttendeeController.deleteAttendeeController);

export default attendeeRouter;
