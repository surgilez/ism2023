import { Promotion } from '@prisma/client';
import errorMessage from '@utils/errorMessage';
import { checkImage, removeTmp, renameFile } from '@utils/uploadImage';
import prisma from 'database';
import { Request, Response } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';

export const getPromotionsByMembership = async (req: Request, res: Response) => {
  try {
    const { account } = req;
    const currentDay = new Date().setDate(new Date().getDate() + 1);
    await prisma.promotion.updateMany({ where: { until: { gte: currentDay } }, data: { state: false } });
    const promotions = await prisma.promotion.findMany({
      where: { OR: [{ membershipId: { in: account.memberships.map((item) => item.id) } }, { all: true }], state: true },
    });
    return res.json(promotions);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getPromotions = async (req: Request, res: Response) => {
  try {
    const currentDay = new Date().setDate(new Date().getDate() + 1);
    await prisma.promotion.updateMany({ where: { until: { gte: currentDay } }, data: { state: false } });
    const promotions = await prisma.promotion.findMany();
    return res.json(promotions);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getPromotionsSeller = async (req: Request, res: Response) => {
  try {
    const date = new Date().toDateString();
    const currentDay = new Date(date).setDate(new Date().getDate() + 1) / 1000;
    await prisma.promotion.updateMany({ where: { until: { gte: currentDay } }, data: { state: false } });
    const promotions = await prisma.promotion.findMany({ where: { state: true } });
    return res.json(promotions);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getPromotionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const promotion = await prisma.promotion.findFirst({ where: { id } });
    return res.json(promotion);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const createPromotion = async (req: Request, res: Response) => {
  const { files } = req;
  try {
    let data = JSON.parse(req.body.data);
    let pathImage: string | undefined;
    if (files !== null) {
      const uploadFile = await checkImage(files as FileArray);
      pathImage = renameFile(uploadFile);
    }
    if (data.membershipId === 'all') data = { ...data, membershipId: undefined, all: true };
    const promotion = await prisma.promotion.create({ data: { ...data, img: pathImage } });
    return res.json(promotion);
  } catch (error) {
    if (files !== null) removeTmp(((files as FileArray).img as UploadedFile).tempFilePath);
    return errorMessage(res, error);
  }
};

export const updatePromotion = async (req: Request, res: Response) => {
  const { files } = req;
  try {
    const { id } = req.params;
    let data: Promotion = JSON.parse(req.body.data);
    let pathImage: string | undefined;
    if (files !== null) {
      const uploadFile = await checkImage(files as FileArray);
      pathImage = renameFile(uploadFile);
    }
    if (data.membershipId === 'all') data = { ...data, membershipId: null, all: true };
    const promotion = await prisma.promotion.update({
      where: { id },
      data: { ...data, img: pathImage },
    });
    return res.json(promotion);
  } catch (error) {
    return errorMessage(res, error);
  }
};
