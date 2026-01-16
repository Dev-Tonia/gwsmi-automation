import { IAttendee } from "../../models/attendee.model";

export function mapAttendeeResponse(attendee: IAttendee) {
  return {
    id: attendee._id.toString(),
    eventId: attendee.eventId.toString(),
    firstName: attendee.firstName,
    lastName: attendee.lastName,
    email: attendee.email,
    phone: attendee.phone,
    other: attendee.other,
    createdAt: attendee.createdAt,
    updatedAt: attendee.updatedAt,
  };
}
