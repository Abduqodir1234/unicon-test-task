import { Request, Response, Router } from 'express';
import { haveRoleController } from '../auth/middlewares/have-role-controller';
import { haveRoleRecipent } from '../auth/middlewares/have-role-recipent';
import { RequestWithUser } from '../auth/types/get-me.types';
import { approvetaskInputValidation } from './middlewares/approve-task.validation.middleware';
import { listQueryValidation } from './middlewares/list.query.validation';
import { TaskController } from './tasks.controller';
import { RequestInListWithUser } from './types/task.types';

const taskRoutes = Router();

const controller = new TaskController();

taskRoutes.get(
  '/done',
  haveRoleController,
  listQueryValidation,
  (req: RequestInListWithUser, res: Response) =>
    controller.doneTaskList(req, res)
);

taskRoutes.get(
  '/done/:id',
  haveRoleController,
  (req: RequestWithUser, res: Response) => controller.doneTask(req, res)
);

taskRoutes.get(
  '/personal',
  haveRoleRecipent,
  listQueryValidation,
  (req: RequestInListWithUser, res: Response) =>
    controller.personalTaskList(req, res)
);

taskRoutes.get(
  '/personal/:id',
  haveRoleRecipent,
  (req: RequestWithUser, res: Response) => controller.personalTask(req, res)
);

taskRoutes.put(
  '/personal/:id/change/status',
  haveRoleRecipent,
  (req: RequestWithUser, res: Response) =>
    controller.changingStatusOfTask(req, res)
);

taskRoutes.put(
  '/done/check/:id',
  haveRoleController,
  approvetaskInputValidation,
  (req: RequestWithUser, res: Response) =>
    controller.approveTaskBeingDoneFully(req, res)
);

export default taskRoutes;
