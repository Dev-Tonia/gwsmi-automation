import { z } from "zod";

export const WizardStepEnum = z.enum(["event", "meal", "form-builder"]);

export type WizardStep = z.infer<typeof WizardStepEnum>;
