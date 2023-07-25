import * as z from "zod"
import { CompleteAccount, RelatedAccountModel } from "./index"

export const SessionModel = z.object({
  id: z.string().optional(),
  accessToken: z.string(),
  accountId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteSession extends z.infer<typeof SessionModel> {
  account: CompleteAccount
}

/**
 * RelatedSessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSessionModel: z.ZodSchema<CompleteSession> = z.lazy(() => SessionModel.extend({
  account: RelatedAccountModel,
}))
