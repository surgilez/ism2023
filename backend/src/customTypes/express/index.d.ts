import { Account, Membership, Person, Role } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      account: Account & {
        role: Role;
        person: Person | null;
        sessions: Session[];
        memberships: Membership[];
      };
    }
  }
}
