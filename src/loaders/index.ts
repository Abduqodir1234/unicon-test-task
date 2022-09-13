import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import { mainConfig } from '../config';
import cors from 'cors';
import indexRoutes from '../modules/routes';
import { connectDB } from '../modules/db';

export async function startApp(app: Express) {
  dotenv.config();

  app.use(express.json());

  app.use(cors());

  app.use('/v1', indexRoutes);

  await connectDB();

  app.listen(mainConfig.port, () =>
    console.log(`Listening in PORT ${mainConfig.port}\nDatabase is connected`)
  );
}
