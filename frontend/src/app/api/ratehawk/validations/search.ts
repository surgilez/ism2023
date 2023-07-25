import * as Yup from 'yup'

export const SearchRateHawkValidation = Yup.object({
  checkin: Yup.date().required('Campo necesario'),
  checkout: Yup.date().required('Campo necesario'),
  destination: Yup.object().nullable().required('El destino es necesario'),
  residency: Yup.string().required('La residencia es necesaria'),
  guests: Yup.array(
    Yup.object({
      adults: Yup.number()
        .typeError('Solo se permiten números')
        .min(1, 'El valor mínimo es 1')
        .max(6, 'El valor máximo es 4')
        .required('El campo es necesario'),
      children: Yup.array(
        Yup.number()
          .typeError('Solo se permiten números')
          .min(0, 'La edad mínima es 0')
          .max(17, 'La  máximo es 17')
          .required('Edad necesaria')
      ),
    })
  ),
})
