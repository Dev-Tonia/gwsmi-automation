import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/app-error";
import { createAppError } from "../utils/error.util";

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const incoming = err as AppError;
    let error: AppError = { ...incoming } as AppError;
    error.message = incoming?.message || "Server Error";
    console.error(incoming);

    // wrong mongoose object id
    if (incoming?.name === "CastError") {
      const message = `Resource not found. Invalid: ${incoming.path}`;
      error = createAppError(message, 404);
    }

    // mongoose duplicate key
    if (incoming?.code === 11000) {
      const message = `Duplicate ${Object.keys(incoming.keyValue || {}).join(", ")} entered`;
      throw createAppError(message, 400);
    }

    // mongoose validation error
    if (incoming?.name === "ValidationError") {
      const messages = Object.values(incoming.errors || {}).map(
        (v) => v.message
      );
      error = createAppError(messages.join(", "), 422);
    }

    res.status(error.statusCode ?? 500).json({
      success: false,
      error: error.message ?? "Server Error",
    });
  } catch (e) {
    next(e);
  }
};

export default errorMiddleware;
