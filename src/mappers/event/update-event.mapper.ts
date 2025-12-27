import { CreateEventDTOType } from "../../dtos/event/create-event.dto";

export function mapUpdateEvent(input: Partial<CreateEventDTOType>) {
  const update: Partial<CreateEventDTOType> = {};

  if (input.title !== undefined) update.title = input.title.trim();
  if (input.description !== undefined)
    update.description = input.description.trim();
  if (input.eventBanner !== undefined) update.eventBanner = input.eventBanner;
  if (input.startDate !== undefined)
    update.startDate =
      input.startDate instanceof Date
        ? input.startDate
        : new Date(input.startDate);
  if (input.endDate !== undefined)
    update.endDate =
      input.endDate instanceof Date ? input.endDate : new Date(input.endDate);
  if (input.location !== undefined) update.location = input.location.trim();

  return update;
}
