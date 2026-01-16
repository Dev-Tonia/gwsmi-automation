import { ObjectId } from "mongodb";
import { z } from "zod";

export const CreateAttendeeDTO = z.object({
  eventId: z.string().refine((value) => ObjectId.isValid(value), {
    message: "Invalid event ID",
  }),
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  email: z.string().email("Invalid email"),

  phone: z.string().optional(),

  other: z.record(z.string(), z.any()).optional(),
});

export type CreateAttendeeDTOType = z.infer<typeof CreateAttendeeDTO>;
