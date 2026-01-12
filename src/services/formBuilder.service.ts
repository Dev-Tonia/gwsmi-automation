import { CreateFormBuilderDTOType } from "../dtos/form-builder/create-form-builder.dto";
import { createAppError } from "../utils/error.util";
import { FormBuilder } from "../models/formBuilder.model";
import Event from "../models/event.model";
import { mapCreateForm } from "../mappers/form-builder/create-form-builder.mapper";
import { UpdateFormBuilderDTOType } from "../dtos/form-builder/update-form-builder.dto";
import { FormBuilderParamsDTOType } from "../dtos/form-builder/form-builder-params.dto";
import { mapFormBuilderToResponse } from "../mappers/form-builder/form-builder-response.mapper";
import { mapUpdateForm } from "../mappers/form-builder/update-form-builder.mapper";
import { FormBuilderEventParamsDTOType } from "../dtos/form-builder/form-builder-event-params.dto";

export const FormBuilderService = {
  async createFormBuilder(data: CreateFormBuilderDTOType) {
    // get the event id
    const { eventId } = data;
    // check if event exists
    const eventExists = await Event.findById(eventId);
    if (!eventExists) {
      throw createAppError("Event not found", 404);
    }

    // check if form builder already exists for this event
    const formBuilderExists = await FormBuilder.findOne({ eventId });
    if (formBuilderExists) {
      throw createAppError(
        "Form builder already exists for this event, Update the form builder instead",
        400
      );
    }
    // create form builder
    const payload = mapCreateForm(data);
    const [formBuilder] = await FormBuilder.create([payload]);
    return mapFormBuilderToResponse(formBuilder);
  },

  async updateFormBuilder(
    id: FormBuilderParamsDTOType["id"],
    data: Partial<UpdateFormBuilderDTOType>
  ) {
    const formBuilder = await FormBuilder.findById(id);

    if (!formBuilder) throw createAppError("Form builder not found", 404);

    // update the form builder using mapper
    const updatePayload = mapUpdateForm(data);

    formBuilder.set(updatePayload);
    await formBuilder.save();

    return mapFormBuilderToResponse(formBuilder);
  },

  async deleteFormBuilder(id: FormBuilderParamsDTOType["id"]) {
    const formBuilder = await FormBuilder.findById(id);
    if (!formBuilder) throw createAppError("Form builder not found", 404);

    await formBuilder.deleteOne();

    return;
  },

  // get the form builder by event id
  async getFormBuilderByEventId(
    eventId: FormBuilderEventParamsDTOType["eventId"]
  ) {
    const formBuilder = await FormBuilder.findOne({ eventId });
    if (!formBuilder) throw createAppError("Form builder not found", 404);

    return mapFormBuilderToResponse(formBuilder);
  },
};
