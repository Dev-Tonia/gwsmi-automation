import { z } from "zod";
import { WizardStepEnum } from "../enum/wizard-step.enum";

export const WizardValidationDTO = z.object({
  step: WizardStepEnum,
  data: z.unknown(),
});

export type WizardValidationDTOType = z.infer<typeof WizardValidationDTO>;
