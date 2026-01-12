import { CreateFormBuilderDTO } from "./create-form-builder.dto";
import z from "zod";

export const UpdateFormBuilderDTO = CreateFormBuilderDTO.partial();

export type UpdateFormBuilderDTOType = z.infer<typeof UpdateFormBuilderDTO>;
