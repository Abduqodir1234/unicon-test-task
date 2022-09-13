import { Responses } from '../base/responses';
import { TaskQueries } from './sql/queries';
import { ApproveTaskInputInterface } from './types/approve-task.types';
import { TaskInterface, TaskStatusEnum } from './types/task.types';

export class TaskService {
  async doneTaskList(userId: number, offset: number, limit: number) {
    try {
      const data = await TaskQueries.getDoneTasks(userId,offset,limit);

      return Responses.returnWithData<TaskInterface[]>(data.rows);
    } catch (e) {
      return Responses.internalServerError(e);
    }
  }

  async doneTask(userId: number, id: number) {
    try {
      const data = await TaskQueries.doneTask(userId, id);

      if (data.rowCount === 0) return Responses.notFound();

      return Responses.returnWithData(data.rows[0]);
    } catch (e) {
      return Responses.internalServerError(e);
    }
  }

  async personalTaskList(userId: number, offset: number, limit: number) {
    try {
      const data = await TaskQueries.personalTasks(userId, offset, limit);
      return Responses.returnWithData<TaskInterface[]>(data.rows);
    } catch (e) {
      return Responses.internalServerError(e);
    }
  }

  async personalTask(userId: number, id: number) {
    try {
      const data = await TaskQueries.personalTask(userId, id);

      if (data.rowCount === 0) return Responses.notFound();

      return Responses.returnWithData(data.rows[0]);
    } catch (e) {
      return Responses.internalServerError(e);
    }
  }

  async changingStatusOfTask(userId: number, id: number) {
    try {
      const updated = await TaskQueries.updateStatusByUserIdAndId(userId, id);

      if (updated.rowCount === 0) return Responses.notFound();

      return Responses.responseWithCustomMessage('Done');
    } catch (e) {
      return Responses.internalServerError(e);
    }
  }

  async approveTaskBeingDoneFully(
    assignedBy: number,
    id: number,
    data: ApproveTaskInputInterface
  ) {
    try {
      const updated = await TaskQueries.updateStatusByControllerIdAndId(
        assignedBy,
        id,
        data.done ? TaskStatusEnum.DONE : TaskStatusEnum.IN_PROGRESS
      );

      if (updated.rowCount === 0) return Responses.notFound();

      return Responses.responseWithCustomMessage('Done');
    } catch (e) {
      return Responses.internalServerError(e);
    }
  }
}
