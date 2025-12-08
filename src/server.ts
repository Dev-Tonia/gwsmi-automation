import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors());

  app.use(errorMiddleware);

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the GSWMI LOGISTICS AUTOMATION API" });
  });

  app.get("/health", (req: Request, res: Response) => {
    res.json({ ok: true });
  });

  return app;
};
