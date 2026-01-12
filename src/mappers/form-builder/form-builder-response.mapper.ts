import { FormBuilderResponseDTOType } from "../../dtos/form-builder/form-builder-response.dto";

export const mapFormBuilderToResponse = (
  formBuilder: any
): FormBuilderResponseDTOType => {
  return {
    id: formBuilder._id.toString(),
    eventId: formBuilder.eventId,
    fields: formBuilder.fields,
    consentText: formBuilder.consentText,
    createdAt: formBuilder.createdAt,
    updatedAt: formBuilder.updatedAt,
  };
};
