import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/app-error";

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
      const e = new Error(message) as AppError;
      e.statusCode = 404;
      error = e;
    }

    // mongoose duplicate key
    if (incoming?.code === 11000) {
      const message = `Duplicate ${Object.keys(incoming.keyValue || {}).join(", ")} entered`;
      const e = new Error(message) as AppError;
      e.statusCode = 400;
      error = e;
    }

    // mongoose validation error
    if (incoming?.name === "ValidationError") {
      const messages = Object.values(incoming.errors || {}).map(
        (v) => v.message
      );
      const e = new Error(messages.join(", ")) as AppError;
      e.statusCode = 422;
      error = e;
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
