import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const config = {
  port: process.env.PORT || 3500,
  nodeEnv: process.env.NODE_ENV || "development",
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/gswmi_db",
  jwt: {
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiresIn: (process.env.JWT_EXPIRES_IN ||
      "6h") as `${number}${"s" | "m" | "h" | "d"}`,
    bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  },
};
