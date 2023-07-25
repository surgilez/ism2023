import * as z from "zod"
import { CompleteAccount, RelatedAccountModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const SalesHistoryModel = z.object({
  id: z.string().optional(),
  form: jsonSchema,
  shopping: jsonSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  accountId: z.string(),
})

export interface CompleteSalesHistory extends z.infer<typeof SalesHistoryModel> {
  account: CompleteAccount
}

/**
 * RelatedSalesHistoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSalesHistoryModel: z.ZodSchema<CompleteSalesHistory> = z.lazy(() => SalesHistoryModel.extend({
  account: RelatedAccountModel,
}))
