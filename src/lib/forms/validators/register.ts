import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

export const registerSchema = toTypedSchema(
  object({
    email: string().required().email(),
    password: string().min(8).required(),
  }),
)
