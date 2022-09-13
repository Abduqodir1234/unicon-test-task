import { readFileSync } from 'fs';
import pool from '..';

const runMigrations = async () => {
  try {
    const user = readFileSync(
      `${process.cwd()}/src/modules/db/migrations/user.sql`
    ).toString();

    const tasks = readFileSync(
      `${process.cwd()}/src/modules/db/migrations/task.sql`
    ).toString();

    await pool.query(user);
    await pool.query(tasks);

    console.log('✅ Your database is sync with schemas');
    process.exit(0);
  } catch (e) {
    console.log('Db error', e);
    process.exit(0);
  }
};

runMigrations();
