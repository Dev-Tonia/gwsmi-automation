import { Request, Response, NextFunction } from "express";
import { CreateFormBuilderDTOType } from "../dtos/form-builder/create-form-builder.dto";
import { FormBuilderService } from "../services/formBuilder.service";
import { success } from "zod";
import { FormBuilderEventParamsDTOType } from "../dtos/form-builder/form-builder-event-params.dto";
export const FormBuilderController = {
  async createForm(
    req: Request<{}, {}, CreateFormBuilderDTOType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const payload = req.body;
      const formBuilder = await FormBuilderService.createFormBuilder(payload);

      return res.status(201).json({
        success: true,
        message: "Form builder created",
        data: { formBuilder },
      });
    } catch (error) {
      next(error);
    }
  },

  async updateForm(
    req: Request<{ id: string }, {}, Partial<CreateFormBuilderDTOType>>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const data = req.body;
    try {
      const formBuilder = await FormBuilderService.updateFormBuilder(id, data);
      return res.status(200).json({
        success: true,
        message: "Form builder updated",
        data: { formBuilder },
      });
    } catch (error) {
      next(error);
    }
  },

  async getFormByEventId(
    req: Request<{ eventId: FormBuilderEventParamsDTOType["eventId"] }, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    const { eventId } = req.params;
    try {
      const formBuilder =
        await FormBuilderService.getFormBuilderByEventId(eventId);
      return res.status(200).json({
        success: true,
        message: "Form builder retrieved",
        data: { formBuilder },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteForm(
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      await FormBuilderService.deleteFormBuilder(id);
      return res.status(200).json({
        success: true,
        message: "Form builder deleted",
      });
    } catch (error) {
      next(error);
    }
  },
};
