import { type SchemaTypeDefinition } from 'sanity'


import product from "./product"
import category from "./category"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,category],
}

// import { Product } from '@/components'

// export const schema: { types: SchemaTypeDefinition[] } = {
//   types: [],
// }

// schemas/index.js (or index.ts if using TypeScript)