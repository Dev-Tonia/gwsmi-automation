import { CreateAttendeeDTOType } from "../../dtos/attendee/create-attendee.dto";
import { IAttendee } from "../../models/attendee.model";

/**
 * Map Create DTO → Mongo insert payload
 */
export function mapCreateAttendee(
  dto: CreateAttendeeDTOType
): Partial<IAttendee> {
  return {
    eventId: dto.eventId,
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    phone: dto.phone,
    other: dto.other ?? {},
  };
}
