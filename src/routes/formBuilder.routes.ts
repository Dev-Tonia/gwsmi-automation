import { Router } from "express";
import { FormBuilderController } from "../controller/formBuilder.controller";
import validateInput from "../middleware/validation.middleware";
import z from "zod";
import { FormBuilderEventParamsDTO } from "../dtos/form-builder/form-builder-event-params.dto";

const formBuilderRouter = Router();

formBuilderRouter.get(
  "/:eventId",
  validateInput(z.object({ params: FormBuilderEventParamsDTO })),
  FormBuilderController.getFormByEventId
);

export default formBuilderRouter;
