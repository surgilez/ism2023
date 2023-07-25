import * as z from "zod"
import { CompleteAccount, RelatedAccountModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const CartModel = z.object({
  id: z.string().optional(),
  shopping: jsonSchema.array(),
  accountId: z.string(),
})

export interface CompleteCart extends z.infer<typeof CartModel> {
  account?: CompleteAccount | null
}

/**
 * RelatedCartModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCartModel: z.ZodSchema<CompleteCart> = z.lazy(() => CartModel.extend({
  account: RelatedAccountModel.nullish(),
}))
