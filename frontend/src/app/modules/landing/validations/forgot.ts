import * as Yup from 'yup'

export const validationsForgot = Yup.object({
  email: Yup.string().email().required('email es requerido'),
})
