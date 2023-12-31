import * as z from "zod"
import { CompleteAccount, RelatedAccountModel } from "./index"

export const MessageModel = z.object({
  id: z.number().int().optional(),
  message: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  toId: z.string(),
  fromId: z.string(),
})

export interface CompleteMessage extends z.infer<typeof MessageModel> {
  to: CompleteAccount
  from: CompleteAccount
}

/**
 * RelatedMessageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMessageModel: z.ZodSchema<CompleteMessage> = z.lazy(() => MessageModel.extend({
  to: RelatedAccountModel,
  from: RelatedAccountModel,
}))
