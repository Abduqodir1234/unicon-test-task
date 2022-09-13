import { NextFunction, Response } from 'express';
import { Responses } from '../../base/responses';
import { RequestWithUser } from '../types/get-me.types';

export const haveRoleController = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role !== 'Controller')
      return res
        .status(403)
        .json({ error: true, message: 'You are unauthorized' });
    return next();
  } catch (e) {
    return Responses.internalServerError(e);
  }
};
