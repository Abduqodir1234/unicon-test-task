import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
export const signInInput = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export function signInInputValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { error, value } = signInInput.validate(req.body);

    if (error?.details)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    req.body = value;

    return next();
  } catch (e) {
    return res.status(500).json({ error: true, message: e });
  }
}
