import errorMessage from '@utils/errorMessage';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export default (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    delete req.body.id;
    schema.parse(req.body);
    next();
  } catch (error) {
    errorMessage(res, error);
  }
};
