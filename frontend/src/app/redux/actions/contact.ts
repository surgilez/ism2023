import { IContacts } from '@modules/landing/interfaces/contacts'
import { Fetching } from '@helpers/fetch'
import Swal from 'sweetalert2'

export const startSendContact = (contact: IContacts) => async () => {
  const { status } = await Fetching({
    url: '/send/contact',
    method: 'POST',
    data: contact,
  })

  if (status === 200) {
    return Swal.fire(
      'Registro exitoso',
      'El contacto ha sido registrado con éxito, te contactaremos con la brevedad posible.',
      'success'
    )
  }
}
