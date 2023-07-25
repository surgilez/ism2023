import { tokens } from '@config/env';
import { Credential } from '@prisma/client';
import errorMessage from '@utils/errorMessage';
import { AES, enc } from 'crypto-js';
import { Request, Response } from 'express';

export const apiQuery = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const path = req.headers['x-path'];
    const credentials = req.headers['x-auth'];
    if (!credentials) throw new Error('Las credenciales no son correctas');
    const { username, password } = JSON.parse(String(credentials)) as Credential;
    if (!username || !password) throw new Error('Las credenciales no son correctas');
    const user = AES.decrypt(username, tokens.accessToken).toString(enc.Utf8);
    const pass = AES.decrypt(password, tokens.accessToken).toString(enc.Utf8);
    const authorization = Buffer.from(`${user}:${pass}`).toString('base64');
    const result = await fetch(String(path), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Basic ${authorization}` },
    });
    return res.json({ data: await result.json() });
  } catch (error) {
    return errorMessage(res, error);
  }
};
