import { CreateEventDTOType } from "../dtos/event/create-event.dto";
import { CreateFormBuilderDTOType } from "../dtos/form-builder/create-form-builder.dto";
import { CreateMealDTOType } from "../dtos/meal/create-meal.dto";
import { EventWizardValidationMap } from "../mappers/event-wizard-validation.mapper";
import { createAppError } from "../utils/error.util";
import mongoose from "mongoose";
import Event from "../models/event.model";
import Meal from "../models/meal.model";
import FormBuilder from "../models/formBuilder.model";
import { deleteFileIfExists } from "../utils/deleteFile.util";
import { buildFormFields } from "../utils/form-builder/build-form-fields";

interface MealsPayload {
  meals: CreateMealDTOType[];
}

interface SubmitWizardPayload {
  event: CreateEventDTOType;
  meals: MealsPayload;
  formBuilder: CreateFormBuilderDTOType;
  eventBanner: string | null;
}

export const WizardStepService = {
  validateWizardStepService(step: string, data: unknown) {
    const schema =
      EventWizardValidationMap[step as keyof typeof EventWizardValidationMap];

    if (!schema) {
      throw createAppError("Invalid wizard form step", 400);
    }

    return schema.safeParse(data);
  },

  async submitWizardService(payload: SubmitWizardPayload) {
    const session = await mongoose.startSession();
    const uploadedFile = payload.eventBanner;

    try {
      session.startTransaction();

      const [event] = await Event.create(
        [
          {
            ...payload.event,
            eventBanner: uploadedFile ?? undefined,
          },
        ],
        { session }
      );

      const eventId = event._id;

      await Meal.insertMany(
        payload.meals.meals.map((meal) => ({
          ...meal,
          eventId,
        })),
        { session }
      );

      const fieldsWithDefaults = buildFormFields(payload.formBuilder.fields);

      await FormBuilder.create(
        [
          {
            eventId,
            consentText: payload.formBuilder.consentText,
            fields: fieldsWithDefaults,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return event;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (uploadedFile) {
        await deleteFileIfExists(uploadedFile);
      }

      throw error;
    }
  },
};
