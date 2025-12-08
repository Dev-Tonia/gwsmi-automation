import { MiddlewareFunction, ValidateInput } from "../types/validation-error";
const validateInput: ValidateInput =
  (schema): MiddlewareFunction =>
  (req, res, next) => {
    // Validate the input
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // If the validation fails, return a 400 status with the validation errors
    if (!result.success) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: result.error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
          code: err.code,
        })),
      });
    }

    next();
  };

export default validateInput;
