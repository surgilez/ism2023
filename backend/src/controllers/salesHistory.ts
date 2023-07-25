import { apiRatehack } from '@config/env';
import { ISalesHistory } from '@interfaces/ISalesHistory';
import { Prisma } from '@prisma/client';
import errorMessage from '@utils/errorMessage';
import { sendVoucher } from '@utils/sendEmails';
import prisma from 'database';
import { Request, Response } from 'express';

export const getSalesHistories = async (req: Request, res: Response) => {
  try {
    // const take = req.query.take ? Number(req.query.take) : 10;
    // const skip = req.query.skip ? (Number(req.query.skip) - 1) * take : 0;
    const typeSort = req.query.typeSort ? (String(req.query.typeSort).toLowerCase() as Prisma.SortOrder) : 'desc';
    const startDate = req.body.startDate ? String(req.body.startDate) : undefined;
    const endDate = req.body.endDate ? String(req.body.endDate) : undefined;
    const membership = req.body.membership ? String(req.body.membership) : undefined;
    const doc = req.body.doc ? String(req.body.doc) : undefined;
    const name = req.body.name ? String(req.body.name) : undefined;
    const email = req.body.email ? String(req.body.email) : undefined;

    if (!startDate && !endDate && !membership && !doc && !name && !email) {
      const result = await prisma.$transaction([
        prisma.salesHistory.findMany({
          // skip,
          // take,
          include: { account: { include: { person: true, memberships: true } } },
        }),
        prisma.salesHistory.count(),
      ]);
      return res.json({ salesHistories: result[0], totalResults: result[1] });
    }

    const filters: Prisma.SalesHistoryWhereInput = {
      OR: [
        {
          createdAt: startDate && endDate ? { lte: new Date(endDate), gte: new Date(startDate) } : undefined,
        },
        {
          account: {
            OR: [
              {
                person: {
                  OR: [
                    { doc: doc ? { contains: doc, mode: 'insensitive' } : undefined },
                    { name: name ? { contains: name, mode: 'insensitive' } : undefined },
                  ],
                },
              },
              { email: email ? { contains: email, mode: 'insensitive' } : undefined },
              { memberships: membership ? { some: { id: membership } } : undefined },
            ],
          },
        },
      ],
    };
    const results = await prisma.$transaction([
      prisma.salesHistory.findMany({
        where: filters,
        // skip,
        // take,
        orderBy: { account: { person: { name: typeSort } } },
        include: { account: { include: { person: true, memberships: true } } },
      }),
      prisma.salesHistory.count({ where: filters }),
    ]);
    return res.json({ salesHistories: results[0], totalResults: results[1] });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getSalesHistoriesAll = async (req: Request, res: Response) => {
  try {
    const results = await prisma.salesHistory.findMany({
      include: { account: { include: { person: true } } },
    });
    return res.json(results);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getSalesHistoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const salesHistories = await prisma.salesHistory.findMany({
      where: { accountId: id },
      include: { account: { include: { person: true } } },
    });
    return res.json(salesHistories);
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getSalesHistoryByIdSeller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const take = req.query.take ? Number(req.query.take) : 10;
    // const skip = req.query.skip ? (Number(req.query.skip) - 1) * take : 0;
    const typeSort = req.query.typeSort ? (String(req.query.typeSort).toLowerCase() as Prisma.SortOrder) : 'desc';
    const membership = req.body.membership ? String(req.body.membership) : undefined;
    const doc = req.body.doc ? String(req.body.doc) : undefined;
    const startDate = req.body.startDate ? String(req.body.startDate) : undefined;
    const endDate = req.body.endDate ? String(req.body.endDate) : undefined;
    const name = req.body.name ? String(req.body.name) : undefined;
    const email = req.body.email ? String(req.body.email) : undefined;
    if (!membership && !doc && !name && !email) {
      const result = await prisma.$transaction([
        prisma.salesHistory.findMany({
          where: {
            account: { person: { sellerId: id } },
            createdAt: startDate && endDate ? { lte: new Date(endDate), gte: new Date(startDate) } : undefined,
          },
          // skip,
          // take,
          include: { account: { include: { person: true, memberships: true } } },
        }),
        prisma.salesHistory.count({
          where: {
            account: { person: { sellerId: id } },
            createdAt: startDate && endDate ? { lte: new Date(endDate), gte: new Date(startDate) } : undefined,
          },
        }),
      ]);
      return res.json({ salesHistories: result[0], totalResults: result[1] });
    }

    const filters: Prisma.SalesHistoryWhereInput = {
      AND: [
        {
          account: { person: { sellerId: id } },
          createdAt: startDate && endDate ? { lte: new Date(endDate), gte: new Date(startDate) } : undefined,
        },
        {
          OR: {
            account: {
              OR: [
                {
                  person: {
                    OR: [
                      { doc: doc ? { contains: doc, mode: 'insensitive' } : undefined },
                      { name: name ? { contains: name, mode: 'insensitive' } : undefined },
                    ],
                  },
                },
                { email: email ? { contains: email, mode: 'insensitive' } : undefined },
                { memberships: membership ? { some: { id: membership } } : undefined },
              ],
            },
          },
        },
      ],
    };

    const results = await prisma.$transaction([
      prisma.salesHistory.findMany({
        where: filters,
        // skip,
        // take,
        orderBy: { account: { person: { name: typeSort } } },
        include: { account: { include: { person: true, memberships: true } } },
      }),
      prisma.salesHistory.count({ where: filters }),
    ]);
    return res.json({ salesHistories: results[0], totalResults: results[1] });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getSalesHistoryByIdSellerAndDate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const salesHistories = await prisma.salesHistory.findMany({
      where: {
        account: { person: { sellerId: id } },
        createdAt: { gte: new Date(new Date().setDate(new Date().getDate() - 30)) },
      },
      include: { account: { include: { person: true } } },
    });
    return res.json({ salesHistories });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const createSalesHistory = async (req: Request, res: Response) => {
  try {
    const { shopping, form }: ISalesHistory = req.body;
    if (!shopping || shopping.length === 0)
      return res.status(400).json({ error: 'La orden de cada productos es requerida' });
    if (!form) return res.status(400).json({ error: 'El formulario para el voucher es requerido' });
    const salesHistory = await prisma.salesHistory.create({
      data: { ...req.body },
      include: { account: { include: { person: true, memberships: true } } },
    });
    const buffers: Buffer[] = [];
    setTimeout(async () => {
      for await (const iterator of shopping) {
        const data = JSON.stringify({ partner_order_id: iterator.order.partner_order_id, language: 'es' });
        const encoded = Buffer.from(`${apiRatehack.user}:${apiRatehack.password}`).toString('base64');
        const result = await fetch(`${apiRatehack.url}/hotel/order/document/voucher/download/?data=${data}`, {
          method: 'GET',
          headers: { Authorization: `Basic ${encoded}` },
        });
        const buffer = Buffer.from(new Uint8Array(await result.arrayBuffer()));
        buffers.push(buffer);
      }
      await sendVoucher(
        form.voucher.email,
        buffers.map((item, i) => ({
          filename: `voucher${i + 1}.pdf`,
          content: item.toString('base64'),
          encoding: 'base64',
        })),
      );
    }, 1000 * 60 * 2);
    return res.json(salesHistory);
  } catch (error) {
    return errorMessage(res, error);
  }
};
