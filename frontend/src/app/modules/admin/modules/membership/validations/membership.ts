import * as Yup from 'yup'
import moment from '@helpers/moment'

export const membershipValidations = Yup.object({
  name: Yup.string().trim().required('El campo es necesario'),
  exp: Yup.date()
    .min(moment(new Date()).subtract(1, 'days'), 'La membresía ha vencido')
    .required('La fecha de expiración es necesaria'),
  price: Yup.number()
    .typeError('Unicamente números')
    .required('El precio es necesario'),
  services: Yup.array(
    Yup.object({
      provider: Yup.string().required('El campo es necesario'),
      service: Yup.string().required('El campo es necesario'),
      dsto: Yup.number()
        .typeError('Unicamente números')
        .test(
          'less than profit percent',
          'Se supera el descuento global',
          function () {
            let res = true
            const { service, dsto } = this.parent
            if (service && dsto) {
              const serv = JSON.parse(service)
              res = serv.profit >= dsto
            }
            return res
          }
        ),
    })
  ).test(
    'Unique service',
    'Existen servicios repetidos para un mismo motor',
    (values) => {
      const ids = values?.map(({ provider, service }) =>
        JSON.stringify({ provider, service })
      )
      const filtered = values?.filter(
        ({ provider, service }, index) =>
          !ids?.includes(JSON.stringify({ provider, service }), index + 1)
      )

      return values?.length === filtered?.length
    }
  ),
})
