import { Prisma } from '@prisma/client';
import errorMessage from '@utils/errorMessage';
import { paginateFilterSort } from '@utils/paginateFilterSort';
import { loadHotels } from '@utils/readingFiles';
import prisma from 'database';
import { Request, Response } from 'express';

export const getHotel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id)
    const param = !!req.query.param;
    const hotel = await prisma.hotel.findFirst({ where: param ? { id } : { idHotel: id } });
    return res.json({ hotel });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await prisma.hotel.findMany({
      ...paginateFilterSort<Prisma.HotelFindManyArgs, Prisma.HotelWhereInput>(req, {}),
    });
    return res.json(hotels);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const createHotels = async (req: Request, res: Response) => {
  try {
    loadHotels();
    return res.json({ message: 'Este proceso puede tardar entre 30 o 40 minutos' });
  } catch (error) {
    return errorMessage(res, error);
  }
};
