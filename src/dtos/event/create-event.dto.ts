import { z } from "zod";

export const CreateEventDTO = z
  .object({
    title: z
      .string()
      .trim()
      .min(5, "Event title must be at least 5 characters"),

    description: z.string().trim().optional(),

    eventBanner: z.string().url("Event banner must be a valid URL").optional(),

    startDate: z.coerce.date().refine((d) => !isNaN(d.getTime()), {
      message: "Start date must be a valid date",
    }),

    endDate: z.coerce.date().refine((d) => !isNaN(d.getTime()), {
      message: "End date must be a valid date",
    }),

    location: z.string().trim().optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
export type CreateEventDTOType = z.infer<typeof CreateEventDTO>;
