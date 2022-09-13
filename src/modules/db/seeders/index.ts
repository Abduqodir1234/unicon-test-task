import { client } from '..';
import { UserQueries } from '../../auth/sql/queries';
import { TaskQueries } from '../../tasks/sql/queries';
import { tasktData } from './data/task';
import { userData } from './data/user';

const runSeeders = async () => {
  try {
    await client.connect();

    await Promise.all([UserQueries.deleteAll(), TaskQueries.deleteAll()]);

    await UserQueries.createMany(await userData());

    await TaskQueries.createMany(tasktData);

    await client.end();
    console.log('✅ Your database is seeded successfully');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

runSeeders();
