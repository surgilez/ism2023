import * as z from "zod"
import { CompleteRole, RelatedRoleModel, CompleteSession, RelatedSessionModel, CompletePerson, RelatedPersonModel, CompleteMembership, RelatedMembershipModel, CompleteCart, RelatedCartModel, CompleteMessage, RelatedMessageModel, CompleteSalesHistory, RelatedSalesHistoryModel } from "./index"

export const AccountModel = z.object({
  id: z.string().optional(),
  email: z.string().max(50, "Máximo 50 caracteres"),
  password: z.string().optional(),
  roleId: z.string(),
  state: z.boolean().nullish(),
  online: z.boolean().nullish(),
  refreshToken: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteAccount extends z.infer<typeof AccountModel> {
  role: CompleteRole
  sessions: CompleteSession[]
  sellers: CompletePerson[]
  person?: CompletePerson | null
  memberships: CompleteMembership[]
  cart?: CompleteCart | null
  messagesTo: CompleteMessage[]
  messagesFrom: CompleteMessage[]
  salesHistory: CompleteSalesHistory[]
}

/**
 * RelatedAccountModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAccountModel: z.ZodSchema<CompleteAccount> = z.lazy(() => AccountModel.extend({
  role: RelatedRoleModel,
  sessions: RelatedSessionModel.array(),
  sellers: RelatedPersonModel.array(),
  person: RelatedPersonModel.nullish(),
  memberships: RelatedMembershipModel.array(),
  cart: RelatedCartModel.nullish(),
  messagesTo: RelatedMessageModel.array(),
  messagesFrom: RelatedMessageModel.array(),
  salesHistory: RelatedSalesHistoryModel.array(),
}))
