import errorMessage from '@utils/errorMessage';
import prisma from 'database';
import { Request, Response } from 'express';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({ include: { informationApi: { include: { credentials: true } } } });
    return res.json(services);
  } catch (error) {
    return errorMessage(res, error);
  }
};
