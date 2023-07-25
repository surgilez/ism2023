import { tokens } from '@config/env';
import { IError } from '@interfaces/IError';
import { verifyToken } from '@middlewares/verifyToken';
import { Account } from '@prisma/client';
import errorMessage from '@utils/errorMessage';
import bcrypt from 'bcrypt';
import prisma from 'database';
import { Request, Response } from 'express';
import { sign, TokenExpiredError } from 'jsonwebtoken';

export const signIn = async (req: Request, res: Response) => {
  try {
    const { password, email }: Account = req.body;
    const account = await prisma.account.findFirst({ where: { email, state: true }, include: { role: true } });
    if (!account) return res.status(401).json({ error: 'Correo o contraseña incorrectos' } as IError);
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(401).json({ error: 'Correo o contraseña incorrectos' } as IError);
    const accessToken = sign({ id: account.id, role: account.role.name }, tokens.accessToken, {
      expiresIn: tokens.accessExpireIn,
    });
    const refreshToken = sign({ id: account.id, role: account.role.name }, tokens.refreshToken, {
      expiresIn: tokens.refreshExpireIn,
    });
    const { person, sessions } = await prisma.account.update({
      data: { refreshToken, online: true, sessions: { create: { accessToken } } },
      where: { id: account.id },
      include: { role: true, person: true, sessions: true },
    });
    const roles = await prisma.role.findMany();
    const response = {
      account: { ...account, password: undefined, role: account.role.name },
      person,
      session: sessions.find((item) => item.accessToken === accessToken),
      refreshToken,
    };
    return res.json(account.role.name === 'admin' ? { ...response, roles } : response);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    const { sessions, refreshToken } = req.account;
    const lastSession = sessions.length === 1 && true;
    if (sessions.length === 0) return res.status(401).json({ error: 'No tiene sesiones activas' } as IError);
    await prisma.account.update({
      where: { id: req.account.id },
      data: {
        online: !lastSession,
        refreshToken: lastSession ? null : refreshToken,
        sessions: { delete: { id: req.params.id } },
      },
    });
    return res.json({ message: 'Se cerró la sesión' });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const newAccessToken = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    if (!authorization?.startsWith('Bearer ')) return res.status(400).json({ error: 'No existe el token' } as IError);
    const refreshToken = authorization?.substring(7);
    if (!refreshToken) return res.status(400).json({ error: 'No existe el token' });
    const { id } = await verifyToken(refreshToken, tokens.refreshToken, true);
    if (!id) return res.status(401).json({ error: 'El token es invalido' });
    const account = await prisma.account.findFirst({
      where: { id, state: true },
      include: { role: true, person: true },
    });
    if (!account) return res.status(401).json({ error: 'No se encontró la cuenta' } as IError);
    if (account.refreshToken !== refreshToken) {
      return res.status(401).json({ error: 'No existe el token' } as IError);
    }
    const accessToken = sign({ id: account.id, role: account.role.name }, tokens.accessToken, {
      expiresIn: tokens.accessExpireIn,
    });
    const session = await prisma.session.update({ where: { id: req.params.id }, data: { accessToken } });
    const roles = await prisma.role.findMany();
    const response = {
      account: { ...account, password: undefined, role: account.role.name },
      person: account.person,
      session,
      refreshToken,
    };
    return res.json(account.role.name === 'admin' ? { ...response, roles } : response);
  } catch (error) {
    if (error instanceof TokenExpiredError) return res.status(403).json({ error: 'El token expiró' } as IError);
    return errorMessage(res, error);
  }
};
