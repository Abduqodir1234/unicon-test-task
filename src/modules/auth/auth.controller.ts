import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RequestWithUser } from './types/get-me.types';

export class AuthController {
  private readonly service = new AuthService();

  async signIn(req: Request, res: Response) {
    const { data, error, message, status } = await this.service.signIn(
      req.body
    );
    return res.status(status).json({ error, message, data });
  }

  async signUp(req: Request, res: Response) {
    const { data, error, message, status } = await this.service.signUp(
      req.body
    );
    return res.status(status).json({ error, message, data });
  }

  async getMe(req: RequestWithUser, res: Response) {
    const { data, error, message, status } = await this.service.getMe(
      req.user?.userId || 0
    );
    return res.status(status).json({ error, message, data });
  }
}
