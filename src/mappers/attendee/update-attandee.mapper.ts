import { UpdateAttendeeDTOType } from "../../dtos/attendee/update-attendee.dto";
import { IAttendee } from "../../models/attendee.model";

export function mapUpdateAttendee(
  dto: UpdateAttendeeDTOType
): Partial<IAttendee> {
  return {
    ...(dto.firstName !== undefined && { firstName: dto.firstName }),
    ...(dto.lastName !== undefined && { lastName: dto.lastName }),
    ...(dto.email !== undefined && { email: dto.email }),
    ...(dto.phone !== undefined && { phone: dto.phone }),
    ...(dto.other !== undefined && { other: dto.other }),
  };
}
