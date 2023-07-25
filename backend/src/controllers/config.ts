import { tokens } from '@config/env';
import { IAuthConfig } from '@interfaces/IConfig';
import { Config } from '@prisma/client';
import errorMessage from '@utils/errorMessage';
import { AES } from 'crypto-js';
import prisma from 'database';
import { Request, Response } from 'express';

export const createConfig = async (req: Request, res: Response) => {
  try {
    const { auth, host, port, secure }: Omit<Config, 'auth'> & { auth: IAuthConfig } = req.body;
    await prisma.$executeRaw`Truncate table config`;
    const newAuth: IAuthConfig = {
      pass: AES.encrypt(auth.pass, tokens.accessToken).toString(),
      user: auth.user,
    };
    await prisma.config.create({
      data: { host, port, secure, auth: { ...newAuth } },
    });
    return res.json({ message: 'Se creo correctamente la configuración' });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getConfig = async (req: Request, res: Response) => {
  try {
    const config = await prisma.config.findFirst();
    return res.json({ ...config, auth: { ...(config?.auth as object), pass: undefined } });
  } catch (error) {
    return errorMessage(res, error);
  }
};
