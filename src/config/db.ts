import * as dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  user: process.env.POSTGRES_USER || '',
  password: process.env.POSTGRES_PASSWORD || '',
  database: process.env.POSTGRES_DB || '',
  host: process.env.POSTGRES_HOST || '',
  port: parseInt(process.env.POSTGRES_PORT || '0'),
};
export default dbConfig;
