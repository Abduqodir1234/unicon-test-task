import * as dotenv from "dotenv";

dotenv.config();

export const mainConfig = {
  port: process.env.PORT || 5000,
};
