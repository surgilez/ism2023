import * as z from "zod"
import { CompleteAccount, RelatedAccountModel } from "./index"

export const RoleModel = z.object({
  id: z.string().optional(),
  name: z.string().max(50, "Máximo 50 caracteres"),
  state: z.boolean().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteRole extends z.infer<typeof RoleModel> {
  accounts: CompleteAccount[]
}

/**
 * RelatedRoleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRoleModel: z.ZodSchema<CompleteRole> = z.lazy(() => RoleModel.extend({
  accounts: RelatedAccountModel.array(),
}))
