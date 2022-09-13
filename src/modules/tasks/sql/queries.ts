import { client } from '../../db';
import {
  TaskInterface,
  TaskStatusEnum,
  TaskWithoutId,
} from '../types/task.types';

export class TaskQueries {
  static async create(data: TaskWithoutId) {
    return client.query(
      'INSERT INTO tasks (description,dueDate,status,userId) VALUES ($1,$2,$3,$4);',
      [data.description, data.dueDate, data.status, data.userId]
    );
  }

  static async createMany(data: TaskWithoutId[]) {
    let query = '';

    data.forEach((one) => {
      query += `INSERT INTO tasks (description,dueDate,status,userId, assignedBy) 
        VALUES (
          '${one.description}',
          '${one.dueDate}',
          '${one.status}',
          '${one.userId}',
          '${one.assignedBy}'
        );`;
    });

    return await client.query(query);
  }

  static async deleteAll() {
    return await client.query('DELETE FROM tasks;');
  }

  static async getDoneTasks(assignedBy: number, offset: number, limit: number) {
    return await client.query(
      'SELECT * FROM tasks WHERE assignedBy=$1 AND status=$2 OFFSET $3 LIMIT $4',
      [assignedBy, TaskStatusEnum.WAITING_APPROVAL, offset, limit]
    );
  }

  static async doneTask(assignedBy: number, id: number) {
    return await client.query(
      `SELECT tasks.id,description,status,dueDate,status,username 
          FROM tasks 
          JOIN users ON 
            tasks.assignedBy=$1 AND 
            tasks.id=$2 AND 
            tasks.status=$3 AND 
            tasks.userId=users.id;`,
      [assignedBy, id, TaskStatusEnum.WAITING_APPROVAL]
    );
  }

  static async personalTasks(userId: number, offset: number, limit: number) {
    return await client.query(
      'SELECT * FROM tasks WHERE userId=$1 AND status=$2 OFFSET $3 LIMIT $4 ',
      [userId, TaskStatusEnum.IN_PROGRESS, offset, limit]
    );
  }

  static async personalTask(userId: number, id: number) {
    return await client.query(
      `SELECT tasks.id,description,status,dueDate,status,userId as assignedTo,username as assignedBy 
        FROM tasks
        JOIN users ON 
          tasks.id=$1 AND
          tasks.userId=$2 AND
          status=$3 AND 
          tasks.assignedBy=users.id;`,
      [id, userId, TaskStatusEnum.IN_PROGRESS]
    );
  }

  static async updateStatusByUserIdAndId(userId: number, id: number) {
    return await client.query(
      `UPDATE tasks SET status=$1 WHERE userId=$2 AND status=$3 AND id=$4`,
      [TaskStatusEnum.WAITING_APPROVAL, userId, TaskStatusEnum.IN_PROGRESS, id]
    );
  }

  static async updateStatusByControllerIdAndId(
    assignedBy: number,
    id: number,
    status: TaskStatusEnum
  ) {
    return await client.query(
      `UPDATE tasks SET status=$1 WHERE assignedBy=$2 AND status=$3 AND id=$4`,
      [status, assignedBy, TaskStatusEnum.WAITING_APPROVAL, id]
    );
  }
}
