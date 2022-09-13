import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
export const signUpInput = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  role: Joi.string().valid('Controller', 'Recipent').required(),
});

export function signUpInputValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { error, value } = signUpInput.validate(req.body);

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
