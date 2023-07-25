import { IEmailConfig } from '@admin/modules/config/interfaces/email'
import { FetchingToken } from '@helpers/fetch'
import { IConfigAction } from '@redux/interfaces/admin'
import Swal from 'sweetalert2'
import { SET_CONFIG_EMAIL } from '@redux/types/admin'

export const setConfigEmail = (email: IEmailConfig): IConfigAction => ({
  type: SET_CONFIG_EMAIL,
  payload: {
    email,
  },
})

export const startGetConfigEmail =
  () => async (dispatch: (val?: any) => void) => {
    const { status, data } = await FetchingToken({
      url: '/config',
      method: 'get',
    }).catch(() => {
      return Swal.fire(
        'Proceso fallido',
        'No se pudo cargar la configuración',
        'error'
      )
    })

    if (status === 200 && data) {
      dispatch(setConfigEmail(data))
    }
  }

export const startSendConfigEmail =
  (config: IEmailConfig) => async (dispatch: (val?: any) => void) => {
    const { status } = await FetchingToken({
      url: '/config',
      method: 'POST',
      data: config,
    }).catch(() => {
      return Swal.fire(
        'Proceso fallido',
        'No se pudo guardar la configuración',
        'error'
      )
    })

    if (status === 200) {
      dispatch(
        setConfigEmail({ ...config, auth: { ...config.auth, pass: '' } })
      )
      return Swal.fire(
        'Proceso exitoso',
        'La configuración se ha guardado correctamente',
        'success'
      )
    }
  }
