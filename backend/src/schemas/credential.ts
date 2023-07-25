import * as z from "zod"
import { CompleteInformationApi, RelatedInformationApiModel } from "./index"

export const CredentialModel = z.object({
  id: z.string().optional(),
  username: z.string().max(100, "Máximo 100 caracteres"),
  password: z.string(),
  endPoint: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  informationApiId: z.string(),
})

export interface CompleteCredential extends z.infer<typeof CredentialModel> {
  InformationApi: CompleteInformationApi
}

/**
 * RelatedCredentialModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCredentialModel: z.ZodSchema<CompleteCredential> = z.lazy(() => CredentialModel.extend({
  InformationApi: RelatedInformationApiModel,
}))
