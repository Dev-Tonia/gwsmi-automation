import { z } from "zod";

export const GetEventQueryDTO = z
  .object({
    id: z.string().optional(),
    title: z.string().optional(),
  })
  .refine((data) => !(data.id && data.title), {
    message: "Provide either 'id' or 'title', not both",
  });

export type GetEventQueryDTOType = z.infer<typeof GetEventQueryDTO>;
