import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { verifyJwt } from "../utils/token.util.js";
import { Response, Request, NextFunction } from "express";

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    // check if there's bearer token on the headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    // verify the token (tell TS what the decoded shape is)
    const decoded = verifyJwt<{ id: string }>(token);

    // check if the user exist
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(401).send({ message: "Unauthorized", error: errMsg });
  }
};

export default authorize;
