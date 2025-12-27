import { z } from "zod";

export const EventParamsDTO = z.object({
  id: z.string().min(1, "Event id is required"),
});

export type EventParamsDTOType = z.infer<typeof EventParamsDTO>;
