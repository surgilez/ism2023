import * as Yup from 'yup'

export const emailConfigValidation = Yup.object({
  host: Yup.string()
    .trim()
    .min(3, 'nombre demasiado corto!')
    .max(30, 'nombre demasiado largo!')
    .required('Host is requerido'),
  port: Yup.number()
    .typeError('El puerto debe ser un número')
    .required('Puerto is requerido'),
  auth: Yup.object({
    user: Yup.string()
      .email('El email no es válido')
      .required('Email is requerido'),
    pass: Yup.string().required('Contraseña is requerida'),
  }),
})
