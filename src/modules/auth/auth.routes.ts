import { Request, Response, Router } from 'express';
import { AuthController } from './auth.controller';
import { signInInputValidation } from './middlewares/sign-in.validation.middleware';
import { signUpInputValidation } from './middlewares/sign-up.validation.middleware';
import verifyToken from './middlewares/verify-token';
import { RequestWithUser } from './types/get-me.types';

const authRoutes = Router();

const controller = new AuthController();

authRoutes.post(
  '/signin',
  signInInputValidation,
  (req: Request, res: Response) => controller.signIn(req, res)
);

authRoutes.post(
  '/signup',
  signUpInputValidation,
  (req: Request, res: Response) => controller.signUp(req, res)
);

authRoutes.get('/me', verifyToken, (req: RequestWithUser, res: Response) =>
  controller.getMe(req, res)
);

export default authRoutes;
