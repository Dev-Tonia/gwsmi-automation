import z from "zod";
import { FormFieldDTO } from "./form-field.dto";

export const FormBuilderResponseDTO = z.object({
  id: z.string(),
  eventId: z.string(),
  fields: z.array(FormFieldDTO),
  consentText: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type FormBuilderResponseDTOType = z.infer<typeof FormBuilderResponseDTO>;
