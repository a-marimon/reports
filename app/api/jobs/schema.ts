import { z } from 'zod';

const schema = z.object({
  node: z.string().min(3),
  name: z.string().min(3),
  activeNum: z.string(),
  codes: z.string(),
  billings: z.optional(z.string()),
  assistant: z.optional(z.string())
})

export default schema