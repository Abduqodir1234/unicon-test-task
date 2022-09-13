import dbConfig from '../../../config/db';
import { client } from '../../db';
import { UserWithoutId } from '../types/get-me.types';

export class UserQueries {
  static async create(data: UserWithoutId) {
    return await client.query(
      'INSERT INTO users (username,password,role) VALUES ($1,$2,$3);',
      [data.username, data.password, data.role]
    );
  }

  static async createMany(data: UserWithoutId[]) {
    let query = '';

    data.forEach((one) => {
      query += `INSERT INTO users (username,password,role) VALUES ('${one.username}','${one.password}','${one.role}');`;
    });

    return await client.query(query);
  }

  static async getOneByUsername(username: string) {
    return await client.query('SELECT * FROM users WHERE username=$1', [
      username,
    ]);
  }

  static async getOneById(id: number) {
    return await client.query('SELECT username,role FROM users WHERE id=$1', [
      id,
    ]);
  }

  static async deleteAll() {
    return await client.query('DELETE FROM users;');
  }
}
