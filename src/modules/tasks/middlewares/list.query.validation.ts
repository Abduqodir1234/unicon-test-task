import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const querySchema = Joi.object({
  limit: Joi.number().default(10),
  offset: Joi.number().default(0),
});

export const listQueryValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = querySchema.validate(req.query);

    if (error?.details)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });

    req.query = value;

    return next();
  } catch (e) {
    return res.status(500).json({ error: true, message: e });
  }
};
