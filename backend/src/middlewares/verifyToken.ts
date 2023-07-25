import { tokens } from '@config/env';
import { IError } from '@interfaces/IError';
import { IJwt } from '@interfaces/IJwt';
import prisma from 'database';
import { NextFunction, Request, Response } from 'express';
import { decode, TokenExpiredError, verify } from 'jsonwebtoken';
import { Server } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import errorMessage from '../utils/errorMessage';

export const verifyToken = async (token: string, key: string, all?: boolean) => {
  try {
    const decoded = <IJwt>verify(token, key);
    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      const { exp, id } = <IJwt>decode(token);
      if (all) {
        await prisma.account.update({
          where: { id },
          data: { online: false, refreshToken: null, sessions: { deleteMany: { accountId: id } } },
        });
      }
      throw new TokenExpiredError('Token expirado', new Date(Number(exp) * 1000));
    }
    throw new Error((error as Error).message);
  }
};

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization?.startsWith('Bearer ')) return res.status(400).json({ error: 'No existe el token' } as IError);
    const accessToken = authorization?.substring(7);
    if (!accessToken) return res.status(400).json({ error: 'No existe el token' });
    const { id } = await verifyToken(accessToken, tokens.accessToken);
    if (!id) return res.status(401).json({ error: 'El token es invalido' } as IError);
    const account = await prisma.account.findUnique({
      where: { id },
      include: { role: true, person: true, sessions: true, memberships: true },
    });
    if (!account) return res.status(401).json({ error: 'No se encontró la cuenta' } as IError);
    const session = account.sessions.find((item) => item.accessToken === accessToken);
    if (!session) return res.status(401).json({ error: 'La sesión no existe' } as IError);
    req.account = account;
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) return res.status(403).json({ error: 'El token expiró' } as IError);
    return errorMessage(res, error);
  }
};

export const verifyAccessTokenPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization?.startsWith('Bearer ')) return res.status(400).json({ error: 'No existe el token' } as IError);
    const accessToken = authorization?.substring(7);
    if (!accessToken) return res.status(400).json({ error: 'No existe el token' });
    const { id } = await verifyToken(accessToken, tokens.accessToken);
    if (!id) return res.status(401).json({ error: 'El token es invalido' } as IError);
    const account = await prisma.account.findUnique({
      where: { id },
      include: { role: true, person: true, sessions: true, memberships: true },
    });
    if (!account) return res.status(401).json({ error: 'No se encontró la cuenta' } as IError);
    req.account = account;
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) return res.status(403).json({ error: 'El token expiró' } as IError);
    return errorMessage(res, error);
  }
};

export const verifySocketToken = (io: Server) => {
  io.use(async (socket, next) => {
    try {
      const { auth } = socket.handshake;
      if (Object.entries(auth).length === 0) throw new Error('No existe el token');
      const token = auth.accessToken.substring(7);
      if (!token) throw new Error('No existe el token');
      const { id } = await verifyToken(token as string, tokens.accessToken);
      if (!id) throw new Error('El token es invalido');
      const account = await prisma.account.findUnique({
        where: { id },
        include: { role: true, person: true, sessions: true },
      });
      if (!account) throw new Error('No se encontró la cuenta');
      const session = account.sessions.find((item) => item.accessToken === token);
      if (!session) throw new Error('La sesión no existe');
      return next();
    } catch (error) {
      return next(error as ExtendedError);
    }
  });
};

const role = async (roleUser: string, req: Request, res: Response, next: NextFunction) => {
  try {
    const { account } = req;
    if (!account) return res.status(403).json({ error: 'No existe el usuario' } as IError);
    if (account.role.name !== roleUser)
      return res.status(403).json({ error: 'No tiene permisos para realizar esta acción' } as IError);
    return next();
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const adminRole = (req: Request, res: Response, next: NextFunction) => role('admin', req, res, next);
export const clientRole = (req: Request, res: Response, next: NextFunction) => role('client', req, res, next);
export const sellerRole = (req: Request, res: Response, next: NextFunction) => role('seller', req, res, next);
