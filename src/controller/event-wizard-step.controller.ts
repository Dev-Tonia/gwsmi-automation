import { NextFunction, Request, Response } from "express";
import { WizardValidationDTO } from "../dtos/wizard-validation.dto";
import { WizardStepService } from "../services/event-wizard-step.service";

export const WizardStepController = {
  validateWizardStep(req: Request, res: Response) {
    //  wrapper structure
    const parsed = WizardValidationDTO.safeParse(req.body);

    if (!parsed.success) {
      return res.status(422).json({
        message: "Invalid wizard request",
        errors: parsed.error.format(),
      });
    }

    // validated values
    const { step, data } = parsed.data;

    //  Validate step-specific payload
    const result = WizardStepService.validateWizardStepService(step, data);

    if (!result.success) {
      return res.status(422).json({
        step,
        errors: result.error.format(),
      });
    }

    // All good
    return res.status(200).json({
      step,
      valid: true,
    });
  },

  async submitWizard(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        event: JSON.parse(req.body.event),
        meals: JSON.parse(req.body.meals),
        formBuilder: JSON.parse(req.body.formBuilder),
        eventBanner: req.file?.path ?? null,
      };

      const result = await WizardStepService.submitWizardService(payload);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
