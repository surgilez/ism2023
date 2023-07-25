import * as z from "zod"
import { CompleteAccount, RelatedAccountModel, CompleteServicesToMemberships, RelatedServicesToMembershipsModel, CompletePromotion, RelatedPromotionModel } from "./index"

export const MembershipModel = z.object({
  id: z.string().optional(),
  code: z.string(),
  name: z.string().max(50, "Máximo 50 caracteres"),
  exp: z.number(),
  price: z.number(),
  img: z.string().nullish(),
  state: z.boolean().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteMembership extends z.infer<typeof MembershipModel> {
  accounts: CompleteAccount[]
  services: CompleteServicesToMemberships[]
  Promotion: CompletePromotion[]
}

/**
 * RelatedMembershipModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMembershipModel: z.ZodSchema<CompleteMembership> = z.lazy(() => MembershipModel.extend({
  accounts: RelatedAccountModel.array(),
  services: RelatedServicesToMembershipsModel.array(),
  Promotion: RelatedPromotionModel.array(),
}))
