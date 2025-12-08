import jwt from "jsonwebtoken";
import { config } from "../config/index";

function getSecret(): string {
  if (!config.jwt.jwtSecret) {
    throw new Error("JWT secret is not set in environment variables");
  }
  return config.jwt.jwtSecret;
}

export function signJwt(payload: object) {
  return jwt.sign(payload, getSecret(), {
    expiresIn: config.jwt.jwtExpiresIn,
  });
}

export function verifyJwt<T = any>(token: string): T {
  return jwt.verify(token, getSecret()) as T;
}
