import * as z from "zod"
import { CompleteInformationApi, RelatedInformationApiModel, CompleteServicesToMemberships, RelatedServicesToMembershipsModel } from "./index"

export const ServiceModel = z.object({
  id: z.string().optional(),
  name: z.string().max(50, "Máximo 50 caracteres"),
  profit: z.number(),
  state: z.boolean().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
  informationApiId: z.string().nullish(),
})

export interface CompleteService extends z.infer<typeof ServiceModel> {
  informationApi?: CompleteInformationApi | null
  memberships: CompleteServicesToMemberships[]
}

/**
 * RelatedServiceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedServiceModel: z.ZodSchema<CompleteService> = z.lazy(() => ServiceModel.extend({
  informationApi: RelatedInformationApiModel.nullish(),
  memberships: RelatedServicesToMembershipsModel.array(),
}))
