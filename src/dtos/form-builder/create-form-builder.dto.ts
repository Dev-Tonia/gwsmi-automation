import z from "zod";
import { ObjectId } from "mongodb";
import { FormFieldDTO } from "./form-field.dto";

export const CreateFormBuilderDTO = z.object({
  eventId: z.string().refine((value) => ObjectId.isValid(value), {
    message: "Invalid event id ",
  }),
  fields: z.array(FormFieldDTO).default([]),
  consentText: z.string().min(1, "Consent text is required"),
});
export type CreateFormBuilderDTOType = z.infer<typeof CreateFormBuilderDTO>;
