import { tokens } from '@config/env';
import { IInformationApiInput } from '@interfaces/IInformationApi';
import { Prisma } from '@prisma/client';
import errorMessage from '@utils/errorMessage';
import { AES } from 'crypto-js';
import prisma from 'database';
import { Request, Response } from 'express';

const include: Prisma.InformationApiInclude = { credentials: true, services: true };

export const getInformationApi = async (req: Request, res: Response) => {
  try {
    const informationApi = await prisma.informationApi.findUnique({
      where: { id: req.params.id },
      include: { credentials: true, services: true },
    });
    return res.json({ informationApi });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getInformationApis = async (req: Request, res: Response) => {
  try {
    const informationApis = await prisma.informationApi.findMany({
      where: { state: true, services: { every: { state: true } } },
      include,
    });
    return res.json(informationApis);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const createInformationApi = async (req: Request, res: Response) => {
  try {
    const { name, contact, phone, webPage, country, services, credentials }: IInformationApiInput = req.body;
    const results = await prisma.service.count({
      where: { state: true, name: { in: services.map((item) => item.name) } },
    });

    if (results > 0)
      throw new Error('Usted ya tiene servicios existentes con el mismo nombre y que están activos en otra API');
    const informationApi = await prisma.informationApi.create({
      data: {
        name,
        contact,
        phone,
        webPage,
        country,
        services: { createMany: { data: services } },
        credentials: {
          create: {
            ...credentials,
            username: AES.encrypt(credentials.username, tokens.accessToken).toString(),
            password: AES.encrypt(credentials.password, tokens.accessToken).toString(),
          },
        },
      },
      include: { services: true, credentials: true },
    });
    return res.json({ id: informationApi.id, services: informationApi.services });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const updateInformationApi = async (req: Request, res: Response) => {
  try {
    const { name, contact, phone, webPage, country, services, state, credentials }: IInformationApiInput = req.body;
    const results = await prisma.service.findMany({
      where: { state: true, name: { in: services.map((item) => item.name) } },
    });
    // if (results.length > 0) {
    //   const exist = results.some((item) => item.id === services.find((service) => service.name === item.name)?.id);
    //   if (!exist)
    //     throw new Error('Usted ya tiene servicios existentes con el mismo nombre y que están activos en otra API');
    // }
    console.log( AES.encrypt("5031", tokens.accessToken).toString())
    console.log( AES.encrypt("434fb64f-ec66-4f68-bb1c-708b457a9e32", tokens.accessToken).toString())
    await prisma.service.deleteMany({ where: {} });
    const informationApi = await prisma.informationApi.update({
      where: { id: req.params.id },
      data: {
        name,
        contact,
        phone,
        webPage,
        country,
        state,
        services: {
          upsert: services.map((item) => ({
            where: { id: item.id },
            update: { name: item.name, state: item.state, profit: item.profit },
            create: { name: item.name, state: item.state, profit: item.profit },
          })),
        },
        credentials: {
          update: {
            ...credentials,
            username: AES.encrypt(credentials.username, tokens.accessToken).toString(),
            password: AES.encrypt(credentials.password, tokens.accessToken).toString(),
          },
        },
      },
      include: { services: true, credentials: true },
    });
    return res.json({ message: 'Se actualizo correctamente la membresía', informationApi });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const updateInformationApiState = async (req: Request, res: Response) => {
  try {
    const { informationApis }: { informationApis: string[] } = req.body;
    const state = req.query.state?.toString() === 'true';
    await prisma.informationApi.updateMany({
      where: { id: { in: informationApis } },
      data: { state },
    });
    return res.json({ message: 'ok' });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const deleteInformationApi = async (req: Request, res: Response) => {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Se elimino correctamente el servicio' });
  } catch (error) {
    return errorMessage(res, error);
  }
};
