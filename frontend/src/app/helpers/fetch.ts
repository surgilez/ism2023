import axios, { AxiosRequestConfig } from 'axios'
import Swal from 'sweetalert2'

const BACK_API = process.env.BACKEND || ''

export const Fetching = (opts: AxiosRequestConfig): Promise<any> => {
  if (!opts.method) opts.method = 'get'
  if (!opts.headers) opts.headers = {}

  const url = `${BACK_API}/api/v1${opts.url}`

  return axios({ ...opts, url })
}

export const FetchingToken = (
  opts: AxiosRequestConfig,
  callback?: (val?: any) => void
): Promise<any> => {
  const tokenStorage = localStorage.getItem('access')

  return Fetching({
    ...opts,
    headers: {
      Authorization: `Bearer ${tokenStorage}` || '',
    },
  }).catch(({ response: { status: errStatus } }) => {
    if (errStatus === 403) {
      callback && callback()
      Swal.fire(
        'La sesión activa ha vencido',
        'Por motivos de seguridad es necesario que vuelvas a iniciar la sesión',
        'warning'
      )
    }
  })
}

export const NaturalFetch = (opts: AxiosRequestConfig): Promise<any> => {
  return axios({ ...opts })
}
