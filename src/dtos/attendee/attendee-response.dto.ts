import { z } from "zod";

export const AttendeeResponseDTO = z.object({
  id: z.string(),
  eventId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  other: z.record(z.string(), z.any()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type AttendeeResponseDTOType = z.infer<typeof AttendeeResponseDTO>;
