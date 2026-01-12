import z from "zod";

export const FormSelectOptionDTO = z.object({
  value: z.string().trim().min(1, "Option value is required"),
});
