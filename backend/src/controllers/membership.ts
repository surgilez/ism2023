import { IMembershipInput } from '@interfaces/IMembership';
import errorMessage from '@utils/errorMessage';
import { checkImage, removeTmp, renameFile } from '@utils/uploadImage';
import prisma from 'database';
import { Request, Response } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';

export const getMembership = async (req: Request, res: Response) => {
  try {
    const membership = await prisma.membership.findUnique({
      where: { id: req.params.id },
      include: {
        services: { include: { service: { include: { informationApi: { include: { credentials: true } } } } } },
      },
    });
    return res.json({ membership });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getMembershipsByAccountId = async (req: Request, res: Response) => {
  try {
    const memberships = await prisma.membership.findMany({
      where: { accounts: { some: { id: req.params.id } } },
      include: {
        services: { include: { service: { include: { informationApi: { include: { credentials: true } } } } } },
      },
    });
    return res.json({ memberships });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getMemberships = async (req: Request, res: Response) => {
  try {
    const memberships = await prisma.membership.findMany({
      where: { state: true },
      include: {
        services: { include: { service: { include: { informationApi: { include: { credentials: true } } } } } },
      },
    });

    return res.json(
      memberships.map((membership) => ({
        ...membership,
        services: membership.services.map((service) => ({ ...service, id: service.serviceId, serviceId: service.id })),
      })),
    );
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const createMembership = async (req: Request, res: Response) => {
  const { files } = req;
  try {
    let pathImage: string | undefined;
    if (files !== null) {
      const uploadFile = await checkImage(files as FileArray);
      pathImage = renameFile(uploadFile);
    }
    const { name, exp, price, services, code }: IMembershipInput = JSON.parse(req.body.data);
    const membership = await prisma.membership.create({
      data: {
        name,
        code,
        exp,
        price,
        img: pathImage,
        services: { createMany: { data: services.map(({ id, dsto }) => ({ serviceId: id, dsto })) } },
      },
      include: {
        services: { include: { service: { include: { informationApi: { include: { credentials: true } } } } } },
      },
    });
    return res.json({
      ...membership,
      services: membership.services.map((service) => ({ ...service, id: service.serviceId, serviceId: service.id })),
    });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const updateMembership = async (req: Request, res: Response) => {
  const { files } = req;
  try {
    let pathImage: string | undefined;
    if (files !== null) {
      const uploadFile = await checkImage(files as FileArray);
      pathImage = renameFile(uploadFile);
    }
    const { name, exp, price, state, services, code }: IMembershipInput = JSON.parse(req.body.data);
    const membership = await prisma.membership.update({
      where: { id: req.params.id },
      data: {
        name,
        exp,
        code,
        price,
        img: pathImage,
        state,
        services: { update: services.map(({ id, dsto }) => ({ where: { id }, data: { dsto } })) },
      },
      include: {
        services: { include: { service: { include: { informationApi: { include: { credentials: true } } } } } },
      },
    });
    return res.json({ message: 'Se actualizo correctamente la membresía', membership });
  } catch (error) {
    if (files !== null) removeTmp(((files as FileArray).img as UploadedFile).tempFilePath);
    return errorMessage(res, error);
  }
};

export const updateMembershipState = async (req: Request, res: Response) => {
  try {
    const { memberships }: { memberships: string[] } = req.body;
    const state = req.query.state?.toString() === 'true';
    await prisma.membership.updateMany({
      where: { id: { in: memberships } },
      data: { state },
    });
    return res.json({ message: 'ok' });
  } catch (error) {
    return errorMessage(res, error);
  }
};
