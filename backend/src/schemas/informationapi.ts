import * as z from "zod"
import { CompleteService, RelatedServiceModel, CompleteCredential, RelatedCredentialModel } from "./index"

export const InformationApiModel = z.object({
  id: z.string().optional(),
  name: z.string().max(50, "Máximo 50 caracteres"),
  contact: z.string(),
  phone: z.string(),
  webPage: z.string(),
  country: z.string(),
  state: z.boolean().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export interface CompleteInformationApi extends z.infer<typeof InformationApiModel> {
  services: CompleteService[]
  credentials?: CompleteCredential | null
}

/**
 * RelatedInformationApiModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedInformationApiModel: z.ZodSchema<CompleteInformationApi> = z.lazy(() => InformationApiModel.extend({
  services: RelatedServiceModel.array(),
  credentials: RelatedCredentialModel.nullish(),
}))
