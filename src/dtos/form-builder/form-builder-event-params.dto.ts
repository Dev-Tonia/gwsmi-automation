import z from "zod";

export const FormBuilderEventParamsDTO = z.object({
  eventId: z.string().min(1, "Event id is required"),
});

export type FormBuilderEventParamsDTOType = z.infer<
  typeof FormBuilderEventParamsDTO
>;
