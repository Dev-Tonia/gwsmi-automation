import { CreateAttendeeDTO } from "./create-attendee.dto";
import { z } from "zod";

export const UpdateAttendeeDTO = CreateAttendeeDTO.omit({
  eventId: true,
}).partial();

export type UpdateAttendeeDTOType = z.infer<typeof UpdateAttendeeDTO>;
