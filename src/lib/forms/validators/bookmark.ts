import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

export const bookmarkSchema = toTypedSchema(
  object({
    url: string().required().url().default(''),
    name: string().min(0).required().default(''),
    categoryId: string().min(0).default(''),
  }),
)
