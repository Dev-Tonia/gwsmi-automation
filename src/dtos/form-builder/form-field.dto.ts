import z from "zod";
import { FormSelectOptionDTO } from "./form-select-option.dto";
export const FormFieldDTO = z
  .object({
    key: z.string().trim().min(1, "Field key is required"),

    label: z.string().trim().min(1, "Field label is required"),

    type: z.enum([
      "short_text",
      "long_text",
      "email",
      "phone",
      "checkbox",
      "select",
      "multi_select",
    ]),

    required: z.boolean().optional(),
    isDefault: z.boolean().optional(),

    order: z.number().min(1, "Field order must be a number"),

    options: z.array(FormSelectOptionDTO).nullable(),
  })
  .superRefine((data, ctx) => {
    if (["select", "multi_select"].includes(data.type)) {
      if (!data.options || data.options.length === 0) {
        ctx.addIssue({
          path: ["options"],
          message: "Options are required for select and multi-select fields",
          code: z.ZodIssueCode.custom,
        });
      }
    } else {
      if (data.options !== null) {
        ctx.addIssue({
          path: ["options"],
          message: "Options must be null for non-select field types",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });
