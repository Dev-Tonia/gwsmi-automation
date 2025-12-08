import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type ValidateInput = (
  schema: z.ZodObject<{
    body?: z.ZodTypeAny;
    query?: z.ZodTypeAny;
    params?: z.ZodTypeAny;
  }>
) => MiddlewareFunction;
