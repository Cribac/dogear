import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

export const categorySchema = toTypedSchema(
  object({
    name: string().required().default(''),
  }),
)
