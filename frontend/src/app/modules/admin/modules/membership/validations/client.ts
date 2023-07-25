import * as Yup from 'yup'

export const ValidationsClient = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Los caracteres mínimos permitidos son 2')
    .max(30, 'Los caracteres máximos permitidos son 30'),
  numMembership: Yup.number().typeError('El campo requiere un numero'),
  lastName: Yup.string()
    .trim()
    .min(2, 'Los caracteres mínimos permitidos son 2')
    .max(30, 'Los caracteres máximos permitidos son 30'),
  identification: Yup.string(),
})

export const ValidationNewClient = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Los caracteres mínimos permitidos son 2')
    .max(30, 'Los caracteres máximos permitidos son 30')
    .required('El nombre es necesario'),
  lastName: Yup.string()
    .trim()
    .min(2, 'Los caracteres mínimos permitidos son 2')
    .max(30, 'Los caracteres máximos permitidos son 30')
    .required('El apellido es necesario'),
  membershipInfo: Yup.array(
    Yup.object({
      id: Yup.string().required('El campo es necesario'),
    })
  ).test(
    '',
    'Existen membresías que poseen un servicio asignado a un mismo proveedor',
    (values: any) => {
      let res = true

      if (!values || (values && values.length <= 0)) {
        res = true
      } else {
        const services = values.map((item: any) => {
          if (!item.id) res = true

          const membership = item?.id && JSON.parse(item.id)
          let services = []
          if (membership) {
            services = membership.services
          }
          return services
        })

        const motores = services.flat()

        const ids = motores.map((item: any) => item.id)
        const filtered = motores?.filter(
          ({ id }: any, index: number) => !ids?.includes(id, index + 1)
        )

        res = motores?.length === filtered?.length
      }
      return res
    }
  ),
  doc: Yup.string()
    .matches(/^[0-9]+$/, 'El campo requiere unicamente dígitos')
    .required('El documento es necesario')
    .test(
      'error length',
      'Se requieren 10 caracteres',
      (val) => val?.length === 10
    ),
  email: Yup.string()
    .trim()
    .email('Formato de correo invalido')
    .required('El correo es necesario'),
  seller: Yup.string().required('Selecciona un vendedor'),
})
