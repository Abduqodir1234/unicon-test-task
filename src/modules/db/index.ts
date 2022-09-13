import { Client, Pool } from 'pg';
import dbConfig from '../../config/db';

const pool = new Pool(dbConfig);

export const client = new Client(dbConfig);

export default pool;

export const connectDB = async () => {
  try {
    await client.connect();
  } catch (e) {
    console.log(e);
    process.exit(0);
  }
};
