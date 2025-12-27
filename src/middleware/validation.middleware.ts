import { MiddlewareFunction, ValidateInput } from "../types/validation-error";
import { deleteFileIfExists } from "../utils/deleteFile.util";

const validateInput: ValidateInput =
  (schema): MiddlewareFunction =>
  async (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      // delete uploaded file if validation fails
      if (req.file?.path) {
        await deleteFileIfExists(req.file.path);
      }

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
