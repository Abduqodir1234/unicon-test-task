import { Request, Response } from 'express';
import { RequestWithUser } from '../auth/types/get-me.types';
import { TaskService } from './task.service';
import { RequestInListWithUser } from './types/task.types';

export class TaskController {
  service = new TaskService();

  async doneTaskList(req: RequestInListWithUser, res: Response) {
    const { data, error, message, status } = await this.service.doneTaskList(
      req.user?.userId || 0,
      +req.query.offset,
      +req.query.limit
    );
    return res.status(status).json({ error, message, data });
  }

  async doneTask(req: RequestWithUser, res: Response) {
    const { id } = req.params;
    const { data, error, message, status } = await this.service.doneTask(
      req.user?.userId || 0,
      +id
    );
    return res.status(status).json({ error, message, data });
  }

  async personalTaskList(req: RequestInListWithUser, res: Response) {
    const { data, error, message, status } =
      await this.service.personalTaskList(
        req.user?.userId || 0,
        +req.query.offset,
        +req.query.limit
      );
    return res.status(status).json({ error, message, data });
  }

  async personalTask(req: RequestWithUser, res: Response) {
    const { id } = req.params;
    const { data, error, message, status } = await this.service.personalTask(
      req.user?.userId || 0,
      +id
    );
    return res.status(status).json({ error, message, data });
  }

  async changingStatusOfTask(req: RequestWithUser, res: Response) {
    const { data, error, message, status } =
      await this.service.changingStatusOfTask(
        req.user?.userId || 0,
        +req.params.id
      );
    return res.status(status).json({ error, message, data });
  }

  async approveTaskBeingDoneFully(req: RequestWithUser, res: Response) {
    const { data, error, message, status } =
      await this.service.approveTaskBeingDoneFully(
        req.user?.userId || 0,
        +req.params.id,
        req.body
      );
    return res.status(status).json({ error, message, data });
  }
}
