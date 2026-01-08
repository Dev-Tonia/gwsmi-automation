import { CreateMealDTOType } from "../dtos/meal/create-meal.dto";
import { MealParamsDTOType } from "../dtos/meal/meal-params.dto";
import { UpdateMealDtoType } from "../dtos/meal/update-meal.dto";
import { MealService } from "../services/meal.service";

import { Request, Response, NextFunction } from "express";

export const MealController = {
  async createMeal(
    req: Request<{}, {}, CreateMealDTOType>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const meal = await MealService.createMeal(req.body);

      return res.status(201).json({
        success: true,
        message: "Meal created",
        data: { meal },
      });
    } catch (error) {
      next(error);
    }
  },
  async updateMeal(
    req: Request<{ id: string }, {}, Partial<UpdateMealDtoType>>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const data = req.body;
      const meal = await MealService.updateMeal(id, data);

      return res.status(200).json({
        success: true,
        message: "Meal updated",
        data: { meal },
      });
    } catch (error) {
      next(error);
    }
  },

  async getMeal(
    req: Request<{ id: MealParamsDTOType["id"] }, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const meal = await MealService.getMeal(id);

      return res.status(200).json({
        success: true,
        message: "Meal fetched",
        data: { meal },
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteMeal(
    req: Request<{ id: MealParamsDTOType["id"] }, {}, {}>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      await MealService.deleteMeal(id);

      return res.status(200).json({
        success: true,
        message: "Meal deleted",
      });
    } catch (error) {
      next(error);
    }
  },
};