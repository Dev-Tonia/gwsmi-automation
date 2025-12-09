import { AppError } from "../types/app-error";

export function createAppError(message: string, statusCode = 400): AppError {
  const e = new Error(message) as AppError;
  e.statusCode = statusCode;
  return e;
}
