import * as Yup from 'yup'

export const PaymentValidation = Yup.object({
  extra: Yup.object({
    voucher: Yup.object({
      email: Yup.string()
        .trim()
        .email('correo no válido')
        .required('correo requerido'),
      confirmEmail: Yup.string()
        .trim()
        .email('correo no válido')
        .required('correo requerido')
        .oneOf([Yup.ref('email'), null], 'Los correos no coinciden'),
    }),
    bill: Yup.object({
      name: Yup.string().required('campo requerido'),
      lastName: Yup.string().required('campo requerido'),
      email: Yup.string().email('correo no válido').required('campo requerido'),
      identificationDocType: Yup.string().required('campo requerido'),
      identificationDocId: Yup.number()
        .typeError('documento no válido')
        .min(10, 'mínimo 10 dígitos')
        .required('campo requerido'),
    }),
    phone: Yup.array(
      Yup.object({
        number: Yup.string()
          .trim()
          .required('teléfono requerido')
          .min(10, 'teléfono inválido')
          .nullable(),
        typePhone: Yup.string().trim().required('tipo de teléfono requerido'),
      })
    ),
    rooms: Yup.array(
      Yup.object({
        guests: Yup.array(
          Yup.object({
            first_name: Yup.string()
              .trim()
              .min(3, 'mínimo 3 caracteres')
              .max(30, 'máximo 30 caracteres')
              .required('nombre requerido'),
            last_name: Yup.string()
              .trim()
              .min(3, 'mínimo 3 caracteres')
              .max(30, 'máximo 30 caracteres')
              .required('apellido requerido'),
          })
        ),
      })
    ),
  }),
})
