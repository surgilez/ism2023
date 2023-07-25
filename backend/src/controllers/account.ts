import { IAccountInput } from '@interfaces/IAccount';
import { IFilters } from '@interfaces/IParams';
import { Prisma } from '@prisma/client';
import errorMessage from '@utils/errorMessage';
import { filterQuery, generateSearch, paginateFilterSort } from '@utils/paginateFilterSort';
import { checkImage, removeTmp, renameFile } from '@utils/uploadImage';
import bcrypt from 'bcrypt';
import prisma from 'database';
import { Request, Response } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';

const include: Prisma.AccountInclude = { role: true, person: true, sellers: true, memberships: true };

export const getAccount = async (req: Request, res: Response) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: req.params.id },
      include: { role: true, person: true, sellers: true, memberships: true },
    });
    return res.json({ ...account, password: undefined });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getAccountsBySeller = async (req: Request, res: Response) => {
  try {
    const accounts = await prisma.account.findMany({
      where: { person: { sellerId: req.params.id } },
      include: { role: true, person: true, sellers: true, memberships: true, salesHistory: true },
    });
    return res.json(accounts.map((account) => ({ ...account, password: undefined })));
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const { childrenPerson } = req.query;
    let searches: Prisma.AccountWhereInput = {};
    if (childrenPerson) {
      const searchArray: IFilters[] = JSON.parse(childrenPerson as string);
      const searchObject = generateSearch(searchArray);
      searches = { OR: [{ person: { ...searchObject } }] };
    }
    const accounts = await prisma.$transaction([
      prisma.account.findMany({
        ...paginateFilterSort<Prisma.AccountFindManyArgs, Prisma.AccountWhereInput>(req, searches),
        include,
      }),
      prisma.account.count({ ...filterQuery<Prisma.AccountCountArgs, Prisma.AccountWhereInput>(req, searches) }),
    ]);
    return res.json({
      accounts: accounts[0].map((item) => ({ ...item, password: undefined })),
      totalResults: accounts[1],
    });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getAccountsAdmin = async (req: Request, res: Response) => {
  try {
    const name = String(req.body.name).length > 0 ? String(req.body.name) : undefined;
    const lastName = String(req.body.lastName).length > 0 ? String(req.body.lastName) : undefined;
    const doc = String(req.body.doc).length > 0 ? String(req.body.doc) : undefined;
    const membership = String(req.body.membership).length > 0 ? String(req.body.membership) : undefined;
    const person: Prisma.PersonWhereInput = {
      OR: [
        { name: { contains: name, mode: 'insensitive' } },
        { lastName: { contains: lastName, mode: 'insensitive' } },
        { doc: { contains: doc, mode: 'insensitive' } },
      ],
    };
    let query: Prisma.AccountWhereInput;
    if ((name || lastName || doc) && membership) {
      query = {
        AND: [
          { person },
          { memberships: membership ? { some: { id: membership } } : undefined },
          { role: { name: 'client' } },
        ],
      };
    } else {
      query = {
        OR: [{ person }, { memberships: membership ? { some: { id: membership } } : undefined }],
        role: { name: 'client' },
      };
    }
    const accounts = await prisma.account.findMany({
      where: { ...query },
      include: { role: true, person: true, sellers: true, memberships: { include: { services: true } } },
    });

    return res.json({
      accounts: accounts.map((item) => ({ ...item, password: undefined })),
    });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const getAccountsChat = async (req: Request, res: Response) => {
  try {
    const accounts = await prisma.account.findMany({
      include: { role: true, person: true },
    });
    return res.json({
      account: accounts.map((item) => ({
        account: { ...item, password: undefined, person: undefined, role: undefined },
        person: item.person,
        rol: item.role,
      })),
    });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const createAccount = async (req: Request, res: Response) => {
  const { files } = req;
  try {
    let pathImage: string | undefined;
    if (files !== null) {
      const uploadFile = await checkImage(files as FileArray);
      pathImage = renameFile(uploadFile);
    }
    const { email, roleId }: IAccountInput = req.body;
    const memberships: { id: string }[] | undefined = req.body.memberships
      ? JSON.parse(req.body.memberships)
      : undefined;
    const person = JSON.parse(req.body.person);
    const password = await bcrypt.hash(person.doc, 12);
    const account = await prisma.account.create({
      data: {
        email,
        password,
        roleId,
        person: { create: { ...person, img: pathImage } },
        memberships: memberships ? { connect: memberships.map((item) => ({ id: item.id })) } : undefined,
      },
      include,
    });
    return res.json(account);
  } catch (error) {
    if (files !== null) removeTmp(((files as FileArray).img as UploadedFile).tempFilePath);
    return errorMessage(res, error);
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  const { files } = req;
  try {
    let pathImage: string | undefined;
    const seller = String(req.query.seller) === 'true';
    const person = req.body.person ? JSON.parse(req.body.person) : undefined;
    if (files !== null) {
      const uploadFile = await checkImage(files as FileArray);
      pathImage = renameFile(uploadFile);
      removeTmp(person.img);
    }
    const memberships: { id: string }[] = req.body.memberships ? JSON.parse(req.body.memberships) : undefined;
    if (!seller && memberships) {
      const membership = await prisma.membership.findFirst({ where: { name: 'S/N' } });
      if (memberships.length === 0 && membership) memberships.push({ id: membership.id });
    }
    const { roleId, email }: IAccountInput = req.body;
    const account = await prisma.account.update({
      where: { id: req.params.id },
      data: {
        roleId,
        person: { update: { ...person, img: pathImage } },
        email,
        memberships: memberships ? { set: memberships.map((item) => ({ id: item.id })) } : undefined,
      },
      include: { person: true, memberships: true, sellers: true },
    });
    return res.json(account);
  } catch (error) {
    if (files !== null) removeTmp(((files as FileArray).img as UploadedFile).tempFilePath);
    return errorMessage(res, error);
  }
};

export const updateAccountState = async (req: Request, res: Response) => {
  try {
    const { clients }: { clients: string[] } = req.body;
    const state = req.query.state?.toString() === 'true';
    await prisma.account.updateMany({
      where: { id: { in: clients } },
      data: { state },
    });
    return res.json({ message: 'Se actualizo correctamente el estado' });
  } catch (error) {
    return errorMessage(res, error);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.account;
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    await prisma.account.update({ where: { id }, data: { password: hash } });
    return res.json({ message: 'Se actualizo correctamente la contraseña' });
  } catch (error) {
    return errorMessage(res, error);
  }
};
