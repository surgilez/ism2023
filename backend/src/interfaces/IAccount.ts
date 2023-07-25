import { Account, Membership, Person } from '@prisma/client';

export interface IAccountInput extends Account {
  person: Person;
  memberships: Membership[];
  sellers: Account[];
}
