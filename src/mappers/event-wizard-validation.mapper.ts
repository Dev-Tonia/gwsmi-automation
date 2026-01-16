import { CreateEventDTO } from "../dtos/event/create-event.dto";
import { CreateFormBuilderDTO } from "../dtos/form-builder/create-form-builder.dto";
import { CreateMealDTO } from "../dtos/meal/create-meal.dto";

export const EventWizardValidationMap = {
  event: CreateEventDTO,
  meal: CreateMealDTO,
  "form-builder": CreateFormBuilderDTO,
} as const;
