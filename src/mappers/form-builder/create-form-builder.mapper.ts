import { CreateFormBuilderDTOType } from "../../dtos/form-builder/create-form-builder.dto";

export function mapCreateForm(payload: Partial<CreateFormBuilderDTOType>) {
  return {
    eventId: payload.eventId,
    fields: payload.fields,
    consentText: payload.consentText,
  };
}
