import { Role } from '@prisma/client';
import errorMessage from '@utils/errorMessage';
import prisma from 'database';
import { Request, Response } from 'express';

export const getRole = async (req: Request, res: Response) => {
  try {
    const role = await prisma.role.findUnique({ where: { id: req.params.id } });
    return res.json({ role });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.role.findMany();
    return res.json(roles);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { id } = await prisma.role.create({ data: { name } });
    return res.json({ id });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { name, state }: Role = req.body;
    await prisma.role.update({ where: { id: req.params.id }, data: { name, state } });
    return res.json({ message: 'Se actualizo correctamente el rol' });
  } catch (error) {
    return errorMessage(res, error);
  }
};
