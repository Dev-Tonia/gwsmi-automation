import { Router } from "express";
import adminFormBuilderRouter from "./form-builder.routes";
import { authenticate } from "../../middleware/auth.middleware";
import { WizardStepController } from "../../controller/event-wizard-step.controller";
import { requirePermission } from "../../middleware/permission.middleware";
import adminMealTicketRouter from "./meal-ticket.routes";

const adminIndexRouter = Router();

// require authentication and admin role
adminIndexRouter.use(authenticate);

// Mount admin form builder routes
adminIndexRouter.use("/form-builder", adminFormBuilderRouter);

// Event wizard routes
adminIndexRouter.post(
  "/event-validate",
  requirePermission("CREATE_TICKETS"),
  WizardStepController.validateWizardStep,
);
adminFormBuilderRouter.post(
  "/event-wizard",
  requirePermission("CREATE_TICKETS"),
  WizardStepController.submitWizard,
);

// meal ticket routes will be mounted in meal-ticket.routes.ts
adminIndexRouter.use("/meal-tickets", adminMealTicketRouter);

export default adminIndexRouter;
