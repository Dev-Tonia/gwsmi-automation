import { Router } from "express";
import { EventController } from "../controller/event.controller";
import validateInput from "../middleware/validation.middleware";
import { GetEventQueryDTO } from "../dtos/event/getEventQuery.dto";
import { z } from "zod";

const eventRouter = Router();

eventRouter.get(
  "/",
  validateInput(z.object({ query: GetEventQueryDTO })),
  EventController.getEvent
);

export default eventRouter;
