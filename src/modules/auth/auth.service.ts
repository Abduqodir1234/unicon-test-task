import { compare, hash } from 'bcrypt';
import { Responses } from '../base/responses';
import { UserQueries } from './sql/queries';
import { User } from './types/get-me.types';
import { SignInBodyInterface } from './types/sign-in.types';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../config';
import { SignUpBodyInterface } from './types/sign-up.types';
import { DatabaseError } from 'pg';

export class AuthService {
  async signIn(data: SignInBodyInterface): Promise<{
    error: boolean;
    message: string;
    data: { access_token: string } | {};
    status: number;
  }> {
    try {
      const user = await UserQueries.getOneByUsername(data.username);

      if (user.rowCount === 0) return Responses.unauthorized('User not found');

      const isMatch = await compare(data.password, user.rows[0].password);

      if (!isMatch) return Responses.unauthorized('Password not correct');

      const token = jwt.sign(
        { userId: user.rows[0].id, role: user.rows[0].role },
        jwtConfig.jwtSecret || '',
        {
          expiresIn: jwtConfig.jwtExpire,
        }
      );

      return Responses.returnWithData<{ access_token: string }>({
        access_token: token,
      });
    } catch (e) {
      return Responses.internalServerError(e);
    }
  }

  async signUp(
    data: SignUpBodyInterface
  ): Promise<{ error: boolean; message: string; status: number; data: {} }> {
    try {
      const hashedPassword = await hash(data.password, 10);
      data.password = hashedPassword;
      await UserQueries.create(data);
      return Responses.responseWithCustomMessage('Registered successfully');
    } catch (e) {
      console.log(e);

      if (e instanceof DatabaseError)
        if (e.code === '23505')
          return Responses.badRequest('Username already exists');
      return Responses.internalServerError(e);
    }
  }

  async getMe(
    id: number
  ): Promise<{ error: boolean; message: string; data: User; status: number }> {
    try {
      const user = await UserQueries.getOneById(id);
      console.log(user);
      return Responses.returnWithData(user.rows[0]);
    } catch (e) {
      console.log(e);
      return Responses.internalServerError(e);
    }
  }
}
