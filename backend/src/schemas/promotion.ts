import * as z from "zod"
import { CompleteMembership, RelatedMembershipModel } from "./index"

export const PromotionModel = z.object({
  id: z.string().optional(),
  title: z.string(),
  from: z.number(),
  until: z.number(),
  description: z.string(),
  policies: z.string(),
  state: z.boolean().nullish(),
  img: z.string().nullish(),
  all: z.boolean().nullish(),
  membershipId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePromotion extends z.infer<typeof PromotionModel> {
  membership?: CompleteMembership | null
}

/**
 * RelatedPromotionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPromotionModel: z.ZodSchema<CompletePromotion> = z.lazy(() => PromotionModel.extend({
  membership: RelatedMembershipModel.nullish(),
}))
