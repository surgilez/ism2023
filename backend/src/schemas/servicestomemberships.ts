import * as z from "zod"
import { CompleteService, RelatedServiceModel, CompleteMembership, RelatedMembershipModel } from "./index"

export const ServicesToMembershipsModel = z.object({
  id: z.string().optional(),
  dsto: z.number(),
  serviceId: z.string(),
  membershipId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteServicesToMemberships extends z.infer<typeof ServicesToMembershipsModel> {
  service: CompleteService
  membership: CompleteMembership
}

/**
 * RelatedServicesToMembershipsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedServicesToMembershipsModel: z.ZodSchema<CompleteServicesToMemberships> = z.lazy(() => ServicesToMembershipsModel.extend({
  service: RelatedServiceModel,
  membership: RelatedMembershipModel,
}))
