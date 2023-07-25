import { IError } from '@interfaces/IError';
import { Response } from 'express';
import { z, ZodError } from 'zod';

export default (res: Response, error: unknown) => {
  const { message: errorMessage } = error as Error;
  z.object({
    mensaje: z.string().nonempty(),
  });
  if (error instanceof ZodError) {
    return res.status(400).json({ error: error.issues });
  }
  return res.status(400).json({ error: errorMessage } as IError);
};
