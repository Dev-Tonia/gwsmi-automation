import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/app-error";
import { createAppError } from "../utils/error.util";

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = err as AppError;

  // Default values
  let statusCode = error.statusCode || 500;
  let message = error.message || "Server Error";

  // Wrong mongoose ObjectId
  if (error?.name === "CastError") {
    statusCode = 404;
    message = `Resource not found. Invalid: ${error.path}`;
  }

  // Mongo duplicate key error
  if ((error as any)?.code === 11000) {
    statusCode = 400;
    message = `Duplicate ${Object.keys((error as any).keyValue).join(", ")} entered`;
  }

  // Mongoose validation error
  if (error?.name === "ValidationError") {
    statusCode = 422;
    message = Object.values(error.errors || {})
      .map((val: any) => val.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorMiddleware;
