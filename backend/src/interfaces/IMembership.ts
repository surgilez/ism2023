import { Membership, ServicesToMemberships } from '@prisma/client';

export interface IMembershipInput extends Membership {
  services: ServicesToMemberships[];
}
