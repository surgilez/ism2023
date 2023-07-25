import * as Yup from 'yup'

export const validationsProfile = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, '2 caracteres mínimos permitidos')
    .max(30, 'Se ha excedido el limite de caracteres permitidos')
    .required('El nombre es necesario'),
  lastName: Yup.string()
    .trim()
    .min(2, '2 caracteres mínimos permitidos')
    .max(30, 'Se ha excedido el limite de caracteres permitidos')
    .required('El apellido es necesario'),
  email: Yup.string()
    .max(50, 'Se ha excedido el limite de caracteres permitidos')
    .email('El formato del correo electrónico es invalido')
    .required('El email es necesario'),
})
