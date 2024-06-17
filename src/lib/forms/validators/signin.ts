import { object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

export const signinSchema = toTypedSchema(
  object({
    email: string().required().email().default(''),
    password: string().min(0).required().default(''),
  }),
)
