import * as Yup from 'yup'

export const validationsSignIn = Yup.object({
  password: Yup.string()
    .min(8, 'La contraseña necesita almenos 8 caracteres')
    .required('La contraseña es necesaria'),
  email: Yup.string().email().required('correo requerido'),
})
