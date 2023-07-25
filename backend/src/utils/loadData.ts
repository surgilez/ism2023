import { accounts, memberships, roles } from '@utils/data';
import prisma from 'database';

export default async () => {
  await prisma.role.createMany({ data: roles });
  for await (const account of accounts) {
    await prisma.account.create({ data: { ...account, person: { create: { ...account.person } } } });
  }
  await prisma.membership.create({ data: { ...memberships[0] } });
};
