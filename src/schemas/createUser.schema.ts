import { z } from "zod";
import { PERMISSIONS } from "../utils/constants/permissions";

export const createUserSchema = z.object({
  fullName: z.string().min(3, "User full name is required"),
  username: z
    .string()
    .min(3, "Username is required")
    .transform((s) => s.toLowerCase().trim()),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["admin", "user"]).optional().default("user"),
  permissions: z.array(z.enum(PERMISSIONS)).optional().default([]),
});

export type ICreateUserInput = z.infer<typeof createUserSchema>;
