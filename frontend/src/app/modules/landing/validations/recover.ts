import * as Yup from 'yup'

export const validationsRecover = Yup.object({
  password: Yup.string()
    .trim()
    .min(8, 'Se requieren al menos 8 caracteres')
    .max(20, 'La contraseña no puede tener más de 20 caracteres')
    .required('contraseña requerida'),
  confirmPassword: Yup.string()
    .trim()
    .min(8, 'Se requieren al menos 8 caracteres')
    .max(20, 'La contraseña no puede tener más de 20 caracteres')
    .required('contraseña requerida')
    .oneOf([Yup.ref('password'), null], 'Contraseñas no coinciden'),
})
