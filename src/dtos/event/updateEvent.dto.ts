import { z } from "zod";

export const UpdateEventDTO = z
  .object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    location: z.string().optional(),
  })
  .strict()
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: "endDate must be after startDate",
      path: ["endDate"],
    }
  );

export type UpdateEventDTOType = z.infer<typeof UpdateEventDTO>;
