import * as Yup from 'yup'

export const SellerValidation = Yup.object({
  seller: Yup.string().required('Seleccione un vendedor'),
  address: Yup.string().trim().required('La dirección es necesaria'),
  doc: Yup.string().trim(),
  phone: Yup.string(),
  name: Yup.string()
    .trim()
    .min(2, '2 caracteres mínimos')
    .max(30, '30 caracteres máximo')
    .required('El nombre es requerido'),
  lastName: Yup.string()
    .trim()
    .min(2, '2 caracteres mínimos')
    .max(30, '30 caracteres máximo')
    .required('El apellido es requerido'),
  email: Yup.string()
    .trim()
    .email('Formato inválido')
    .required('El correo es requerido'),
  dsto: Yup.number().typeError('Solo se aceptan números').required(false),
})
