import moment from 'moment'
import 'moment/dist/locale/es'

moment.locale('es')

export const dateChat = (date: Date) => {
  const dateMessage = moment(date)

  return dateMessage.format('HH:mm a | MMMM Do')
}

export default moment
