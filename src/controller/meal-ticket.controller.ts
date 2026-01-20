import { Request, Response, NextFunction } from "express";
import { MealTicketService } from "../services/meal-ticket/meal-ticket.service";
import { mapMealTicketToResponse } from "../mappers/meal-ticket/map-meal-ticket-response";

export const MealTicketController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await MealTicketService.create(req.body);

      return res.status(201).json({
        success: true,
        data: mapMealTicketToResponse(ticket),
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await MealTicketService.getById(req.params.id);

      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: "Meal ticket not found",
        });
      }

      return res.json({
        success: true,
        data: mapMealTicketToResponse(ticket),
      });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tickets = await MealTicketService.getAll({
        attendeeId: req.query.attendeeId as string,
        transactionId: req.query.transactionId as string,
      });

      return res.json({
        success: true,
        data: tickets.map(mapMealTicketToResponse),
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const ticket = await MealTicketService.update(req.params.id, req.body);

      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: "Meal ticket not found",
        });
      }

      return res.json({
        success: true,
        data: mapMealTicketToResponse(ticket),
      });
    } catch (error) {
      next(error);
    }
  },

  async redeemMealTicket(req: Request, res: Response, next: NextFunction) {
    try {
      const { staffId } = req.body;

      const ticket = await MealTicketService.redeemMealTicket(
        req.params.id,
        staffId,
      );

      return res.json({
        success: true,
        data: mapMealTicketToResponse(ticket),
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await MealTicketService.delete(req.params.id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
