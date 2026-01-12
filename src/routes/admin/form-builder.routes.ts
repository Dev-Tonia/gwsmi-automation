import { Router } from "express";
import { requirePermission } from "../../middleware/permission.middleware";
import { uploadEventBanner } from "../../middleware/upload.middleware";
import validateInput from "../../middleware/validation.middleware";
import { CreateFormBuilderDTO } from "../../dtos/form-builder/create-form-builder.dto";
import z from "zod";
import { FormBuilderController } from "../../controller/formBuilder.controller";
import { UpdateFormBuilderDTO } from "../../dtos/form-builder/update-form-builder.dto";
import { FormBuilderParamsDTO } from "../../dtos/form-builder/form-builder-params.dto";

const adminFormBuilderRouter = Router();

adminFormBuilderRouter.post(
  "/",
  requirePermission("CREATE_TICKETS"),
  uploadEventBanner.single("eventBanner"),
  validateInput(z.object({ body: CreateFormBuilderDTO })),
  FormBuilderController.createForm
);

adminFormBuilderRouter.patch(
  "/:id",
  requirePermission("CREATE_TICKETS"),
  validateInput(
    z.object({
      body: UpdateFormBuilderDTO,
      params: FormBuilderParamsDTO,
    })
  ),
  FormBuilderController.updateForm
);

adminFormBuilderRouter.delete(
  "/:id",
  requirePermission("CREATE_TICKETS"),
  validateInput(z.object({ params: FormBuilderParamsDTO })),
  FormBuilderController.deleteForm
);

export default adminFormBuilderRouter;
