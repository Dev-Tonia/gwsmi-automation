import { CreateEventDTOType } from "../../dtos/event/create-event.dto";

export function mapCreateEvent(input: Partial<CreateEventDTOType>) {
  return {
    title: input.title?.trim(),
    description: input.description?.trim() || "",
    eventBanner: input.eventBanner?.trim(),
    startDate:
      input.startDate instanceof Date
        ? input.startDate
        : new Date(input.startDate!),
    endDate:
      input.endDate instanceof Date ? input.endDate : new Date(input.endDate!),
    location: input.location?.trim() || "",
  };
}
