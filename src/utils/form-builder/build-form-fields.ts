import { DEFAULT_FORM_FIELDS } from "./form-builder.defaults";

export function buildFormFields(clientFields: any[] = []) {
  const defaultKeys = new Set(DEFAULT_FORM_FIELDS.map((f) => f.key));

  // Remove client fields that try to override defaults
  const sanitizedClientFields = clientFields.filter(
    (field) => !defaultKeys.has(field.key)
  );

  const merged = [...DEFAULT_FORM_FIELDS, ...sanitizedClientFields];

  // Normalize order
  return merged.map((field, index) => ({
    ...field,
    order: index + 1,
  }));
}
