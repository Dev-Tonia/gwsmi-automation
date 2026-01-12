// mappers/update-form-builder.mapper.ts
import { UpdateFormBuilderDTOType } from "../../dtos/form-builder/update-form-builder.dto";

export function mapUpdateForm(payload: Partial<UpdateFormBuilderDTOType>) {
  const update: Partial<UpdateFormBuilderDTOType> = {};

  if (payload.consentText !== undefined) {
    update.consentText = payload.consentText;
  }

  if (payload.fields !== undefined) {
    update.fields = payload.fields;
  }

  return update;
}
