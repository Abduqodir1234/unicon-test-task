import { RequestWithUser } from '../../auth/types/get-me.types';

export enum TaskStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_APPROVAL = 'WAITING_APPROVAL',
  DONE = 'DONE',
}

export interface TaskInterface {
  id: number;
  description: string;
  dueDate: Date;
  status: TaskStatusEnum;
  userId: number;
  assignedBy: number;
}

export interface TaskWithoutId {
  description: string;
  dueDate: string;
  status: TaskStatusEnum;
  userId: number;
  assignedBy: number;
}

export interface RequestInListWithUser extends RequestWithUser {
  query: { limit: string; offset: string };
}
