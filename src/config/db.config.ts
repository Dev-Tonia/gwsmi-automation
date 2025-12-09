import mongoose from "mongoose";

import { config } from "./index";

if (!config.dbUri) {
  throw new Error("DB_URI is not defined in environment variables");
}

const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUri);
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose is disconnected");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

export default connectDB;
