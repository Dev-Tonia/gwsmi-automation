import { Router } from "express";
import adminFormBuilderRouter from "./form-builder.routes";
import { authenticate } from "../../middleware/auth.middleware";
import { WizardStepController } from "../../controller/event-wizard-step.controller";
import { requirePermission } from "../../middleware/permission.middleware";

const adminIndexRouter = Router();

// require authentication and admin role
adminIndexRouter.use(authenticate);

adminIndexRouter.use("/form-builder", adminFormBuilderRouter);
adminIndexRouter.post(
  "/event-validate",
  requirePermission("CREATE_TICKETS"),
  WizardStepController.validateWizardStep
);
adminFormBuilderRouter.post(
  "/event-wizard",
  requirePermission("CREATE_TICKETS"),
  WizardStepController.submitWizard
);

export default adminIndexRouter;
