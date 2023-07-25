import { tokens } from '@config/env';
import errorMessage from '@utils/errorMessage';
import { sendContact, sendEmailForgotPassword, sendEmailCuenta } from '@utils/sendEmails';

import prisma from 'database';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

export const sendEmailPassword = async (req: Request, res: Response) => {
  try {
    const { email, url } = req.body;
    const account = await prisma.account.findUnique({ where: { email }, include: { role: true } });
    if (!account) return res.json({ message: 'No existe una cuenta con ese correo' });
    const accessToken = sign({ id: account.id, role: account.role.name }, tokens.accessToken, { expiresIn: '10m' });
    await sendEmailForgotPassword(email, `${url}?token=${accessToken}`, 'Recuperación de contraseña');
    return res.json({ message: 'Se envió a su correo un link temporal para cambiar su contraseña' });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const sendEmailContact = async (req: Request, res: Response) => {
  try {
    const { email, phone, name, message } = req.body;
    await sendContact({ email, phone, name, message });
    return res.json({ message: 'ok' });
  } catch (error) {
    return errorMessage(res, error);
  }
};


export const sendEmailAccount = async (req: Request, res: Response) => {
  try {
    const { email, contrasenia, url } = req.body;
    const account = await prisma.account.findUnique({ where: { email }, include: { role: true } });
    if (!account) return res.json({ message: 'No existe una cuenta con ese correo' });
    const accessToken = sign({ id: account.id, role: account.role.name }, tokens.accessToken, { expiresIn: '10m' });
    await sendEmailCuenta(email, `${url}?token=${accessToken}`, "Creación cuenta", contrasenia);
    return res.json({ message: 'Se envió a su correo una contraseña temporal. Por favor cambiar lo antes posible esta contraseña' });
  } catch (error) {
    return errorMessage(res, error);
  }
};
