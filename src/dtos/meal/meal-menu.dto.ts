import { title } from "process";
import { z } from "zod";

export const MealMenuDTO = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(0, "Price must be at least 0"),
  limit: z.number().min(1, "Limit must be at least 1"),
});
