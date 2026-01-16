import { mapCreateAttendee } from "../mappers/attendee/create-attandee.mapper";
import { mapUpdateAttendee } from "../mappers/attendee/update-attandee.mapper";
import { Attendee } from "../models/attendee.model";

export const AttendeeService = {
  async createAttendee(payload: any) {
    const data = mapCreateAttendee(payload);
    return Attendee.create(data);
  },

  async getAttendeeById(id: string) {
    return Attendee.findById(id);
  },

  async updateAttendee(id: string, payload: any) {
    const data = mapUpdateAttendee(payload);

    return Attendee.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },

  async deleteAttendee(id: string) {
    return Attendee.findByIdAndDelete(id);
  },
};
