import Swal from 'sweetalert2'

export const defaultError = () =>
  Swal.fire(
    'Error Critico',
    `Se ha presentado un error en el servicio, por favor intente de nuevo mas tarde`,
    'error'
  )
