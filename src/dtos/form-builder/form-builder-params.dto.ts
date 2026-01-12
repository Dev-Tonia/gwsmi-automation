import { z } from "zod";

export const FormBuilderParamsDTO = z.object({
  id: z.string().min(1, "Form builder id is required"),
  eventId: z.string().min(1, "Event id is required"),
});

export type FormBuilderParamsDTOType = z.infer<typeof FormBuilderParamsDTO>;
