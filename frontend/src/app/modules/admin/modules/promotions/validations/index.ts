import * as Yup from 'yup'
import moment from '@helpers/moment'

export const PromoAdminValidation = Yup.object({
  title: Yup.string().required('Seleccione un titulo'),
  from: Yup.date().typeError('Fecha invalida').required('campo requerido'),
  until: Yup.date()
    .typeError('Fecha invalida')
    .when('from', {
      is: (from: any) => from,
      then: Yup.date().test(
        'test date',
        'La fecha de inicio debe ser menor a la fecha de expiración',
        function () {
          let res = true
          const { from, until } = this.parent
          if (from && until) {
            res = moment(from).isBefore(until)
          }
          return res
        }
      ),
    })
    .required('campo requerido'),
  description: Yup.string().required('Ingresa una descripción'),
  policies: Yup.string().required('Ingresa una política'),
  membership: Yup.string().required('Selecciona una opción'),
  informationApi: Yup.array().when('dynamic', {
    is: true,
    then: Yup.array(
      Yup.object({
        id: Yup.string().required('Seleccione una opción'),
        services: Yup.array(
          Yup.object({
            id: Yup.string().required('Seleccione una opción'),
            data: Yup.array(
              Yup.object({
                id: Yup.string(),
                name: Yup.string().trim(),
                dsto: Yup.number()
                  .typeError('Unicamente números')
                  .test(
                    'profit',
                    'Supera el limite de ganancia',
                    function (value) {
                      let res = true
                      const service = (this as any).from[1].value.id
                      if (service && value) {
                        const serv = JSON.parse(service)
                        res = serv.profit >= value
                      }
                      return res
                    }
                  ),
              })
            )
              .default(null)
              .nullable()
              .test(
                'test without service',
                'Agregue al menos un servicio',
                function () {
                  return this.parent.data?.length > 0
                }
              )
              .test(
                'test repeat service',
                'Servicio repetido',
                function (values) {
                  let res = true
                  if (values) {
                    const ids = values?.map(({ id }: any) => id)
                    const filtered = values?.filter(
                      ({ id }: any, index) => !ids?.includes(id, index + 1)
                    )
                    res = values?.length === filtered?.length
                  }
                  return res
                }
              ),
          })
        ).test(
          'test without service',
          'agregue al menos un servicio',
          function () {
            return this.parent.services?.length > 0
          }
        ),
      })
    ).test('test without motor', 'agregue al menos un motor', function () {
      return this.parent.informationApi?.length > 0
    }),
  }),
})
