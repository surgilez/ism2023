import * as z from "zod"
import { TypeSeller } from "@prisma/client"
import { CompleteAccount, RelatedAccountModel } from "./index"

export const PersonModel = z.object({
  id: z.string().optional(),
  name: z.string().max(50, "Máximo 50 caracteres"),
  lastName: z.string().max(50, "Máximo 50 caracteres"),
  doc: z.string().max(20, "Máximo 20 caracteres"),
  accountId: z.string(),
  img: z.string().nullish(),
  phone: z.string().max(20, "Máximo 20 caracteres").nullish(),
  address: z.string().max(100, "Máximo 100 caracteres").nullish(),
  commission: z.number().int().nullish(),
  typeSeller: z.nativeEnum(TypeSeller).nullish(),
  allowAdviser: z.boolean().nullish(),
  allowChat: z.boolean().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  sellerId: z.string().nullish(),
})

export interface CompletePerson extends z.infer<typeof PersonModel> {
  account: CompleteAccount
  seller?: CompleteAccount | null
}

/**
 * RelatedPersonModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPersonModel: z.ZodSchema<CompletePerson> = z.lazy(() => PersonModel.extend({
  account: RelatedAccountModel,
  seller: RelatedAccountModel.nullish(),
}))
