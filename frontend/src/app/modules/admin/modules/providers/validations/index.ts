import * as Yup from 'yup'

export const ProviderValidation = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, '2 caracteres mínimo')
    .max(20, '20 caracteres máximo')
    .required('El campo es necesario'),
  contact: Yup.string()
    .trim()
    .min(2, '2 caracteres mínimo')
    .max(20, '20 caracteres máximo'),
  country: Yup.string()
    .trim()
    .min(2, '2 caracteres mínimo')
    .max(15, '15 caracteres máximo'),
  phone: Yup.string()
    .trim()
    .min(6, '6 caracteres mínimo')
    .max(20, '20 caracteres máximo'),
  webPage: Yup.string()
    .trim()
    .min(2, '2 caracteres mínimo')
    .max(35, '35 caracteres máximo'),
  credentials: Yup.object({
    username: Yup.string()
      .trim()
      .min(2, '2 caracteres mínimo')
      .max(30, '30 caracteres máximo')
      .required('El campo es necesario'),
    password: Yup.string()
      .trim()
      .min(2, '2 caracteres mínimo')
      .max(150, '150 caracteres máximo')
      .required('El campo es necesario'),
    confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref('password'), null], 'Contraseñas no coinciden')
      .required('El campo es necesario'),
  }),

  services: Yup.array(
    Yup.object({
      name: Yup.string().trim(),
    })
  ).test('Unique service', 'Existen servicios repetidos', (values) => {
    const ids = values?.map((o) => o.name)
    const filtered = values?.filter(
      ({ name }, index) => !ids?.includes(name, index + 1)
    )

    return values?.length === filtered?.length
  }),
})
