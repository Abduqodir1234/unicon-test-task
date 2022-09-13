import * as dotenv from 'dotenv';

dotenv.config();
export const jwtConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE,
};
