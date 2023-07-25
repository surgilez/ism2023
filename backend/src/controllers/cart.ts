import errorMessage from '@utils/errorMessage';
import prisma from 'database';
import { Request, Response } from 'express';

export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await prisma.cart.findFirst({ where: { accountId: req.params.id } });
    return res.json(cart);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const createCart = async (req: Request, res: Response) => {
  try {
    const cart = await prisma.cart.create({ data: { ...req.body } });
    return res.json(cart);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const cart = await prisma.cart.update({ where: { id: req.params.id }, data: { ...req.body } });
    return res.json(cart);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const cart = await prisma.cart.delete({ where: { id: req.params.id } });
    return res.json(cart);
  } catch (error) {
    return errorMessage(res, error);
  }
};
