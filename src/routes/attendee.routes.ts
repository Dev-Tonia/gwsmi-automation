import { Router } from "express";
import { AttendeeController } from "../controllers/attendee.controller";

const attendeeRouter = Router();

attendeeRouter.post("/", AttendeeController.createAttendeeController);
attendeeRouter.get("/:id", AttendeeController.getAttendeeController);
attendeeRouter.patch("/:id", AttendeeController.updateAttendeeController);
attendeeRouter.delete("/:id", AttendeeController.deleteAttendeeController);

export default attendeeRouter;
