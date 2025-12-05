import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export const config = {
  port: process.env.PORT || 3500,
  nodeEnv: process.env.NODE_ENV || "development",
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/gswmi_db",
};
