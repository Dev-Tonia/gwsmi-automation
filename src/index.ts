import { createServer } from "./server";
import { config } from "./config";
import connectDB from "./config/db";

const server = createServer();

server.listen(config.port, async () => {
  await connectDB();
  console.log(`api running on ${config.port} in ${config.nodeEnv} mode`);
});
