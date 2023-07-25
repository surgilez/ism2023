import * as z from "zod"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const HotelModel = z.object({
  idHotel: z.string(),
  id: z.string(),
  address: z.string().nullish(),
  amenity_groups: jsonSchema.array(),
  check_in_time: z.string().nullish(),
  check_out_time: z.string().nullish(),
  description_struct: jsonSchema.array(),
  images: z.string().array(),
  kind: z.string().nullish(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  name: z.string().nullish(),
  phone: z.string().nullish(),
  policy_struct: jsonSchema.array(),
  postal_code: z.string().nullish(),
  region: jsonSchema,
  star_rating: z.number().int().nullish(),
  email: z.string().nullish(),
  semantic_version: z.number().int().nullish(),
  serp_filters: z.string().array(),
  is_closed: z.boolean().nullish(),
  metapolicy_struct: jsonSchema,
  metapolicy_extra_info: z.string().nullish(),
  star_certificate: jsonSchema,
  facts: jsonSchema,
  payment_methods: z.string().array(),
  hotel_chain: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})
