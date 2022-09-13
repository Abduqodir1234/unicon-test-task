import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import verifyToken from './auth/middlewares/verify-token';
import taskRoutes from './tasks/task.routes';

const indexRoutes = Router();

indexRoutes.use('/auth', authRoutes);
indexRoutes.use('/tasks', verifyToken, taskRoutes);

export default indexRoutes;
