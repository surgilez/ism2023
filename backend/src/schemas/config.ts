import * as z from "zod"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const ConfigModel = z.object({
  id: z.string().optional(),
  host: z.string(),
  port: z.string(),
  secure: z.boolean(),
  auth: jsonSchema,
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
