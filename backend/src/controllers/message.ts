import errorMessage from '@utils/errorMessage';
import prisma from 'database';
import { Request, Response } from 'express';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { from } = req.params;
    const { id } = req.account;
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { fromId: id, toId: from },
          { fromId: from, toId: id },
        ],
      },
      orderBy: { createdAt: 'asc' },
      take: 30,
    });
    return res.json({ status: 'ok', messages });
  } catch (error) {
    return errorMessage(res, error);
  }
};
