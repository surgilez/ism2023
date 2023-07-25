import { ChatAction, typeActiveChat } from '@redux/interfaces/chat'
import { Fetching } from '@helpers/fetch'
import { Login } from '@modules/landing/interfaces/user'
import { AuthAction, AuthState } from '@redux/interfaces/auth'
import { SIGNIN, LOGOUT, CHECK, ROLES } from '@redux/types'
import { trackPromise } from 'react-promise-tracker'
import Swal from 'sweetalert2'
import { User, UserAction } from '@redux/interfaces/user'
import { Redux } from '@redux/interfaces/redux'
import { IRoles } from '@utils/interfaces/admin/roles'
import { AdminProvidersAction } from '@redux/interfaces/admin'
import { ShoppingAction } from '@redux/interfaces/shopping'
import { setUser } from './user'
import { setTypeActiveChat } from './chat'

export const login = (payload: AuthState): AuthAction => ({
  type: SIGNIN,
  payload,
})

export const rolesAction = (roles: IRoles[]): AuthAction => ({
  type: ROLES,
  payload: {
    roles,
  },
})

export const logout = (): AuthAction => ({
  type: LOGOUT,
})

export const check = (checking: boolean): AuthAction => ({
  type: CHECK,
  payload: {
    checking,
  },
})

export const setTypeRol = (user: User, dispatch: (val: ChatAction) => void) => {
  let typeChat: typeActiveChat = 'client'

  switch (user.rol) {
    case 'admin':
      typeChat = 'seller'
      break
    case 'seller':
      typeChat = 'team'
      break
    default:
  }
  dispatch(setTypeActiveChat(typeChat))
}

export const startLogin =
  (auth: Login) =>
  async (
    dispatch: (
      val?:
        | AuthAction
        | UserAction
        | AdminProvidersAction
        | ShoppingAction
        | any
    ) => void
  ) => {
    const {
      status,
      data: { refreshToken, session, person, account, roles },
    } = await trackPromise(
      Fetching({
        method: 'post',
        data: auth,
        url: '/auth/signin',
      }).catch(({ response: { data } }) => {
        Swal.fire({
          icon: 'error',
          title: 'Error iniciando la sesión',
          text: data.error,
        })
      }),
      'login'
    )

    if (status === 200) {
      const { email, online, role, state } = account

      if (!state) {
        dispatch(check(false))
        localStorage.clear()
        return Swal.fire({
          title: 'Cuenta desactivada',
          text: 'Por favor contacte al administrador',
          icon: 'info',
        })
      }

      localStorage.setItem('token', refreshToken)
      localStorage.setItem('session', session.id)
      localStorage.setItem('access', session.accessToken)

      dispatch(
        login({
          uid: account.id,
          access: session.accessToken,
          roles: roles || undefined,
        })
      )
      const user = { email, online, rol: role, ...person }

      dispatch(setUser(user))
      setTypeRol(user, dispatch)
    }
  }

const initLogout = (dispatch: any) => {
  localStorage.removeItem('token')
  localStorage.removeItem('session')
  dispatch(logout())
}

export const startLogout =
  () => async (dispatch: (val: AuthAction) => void, redux: () => Redux) => {
    const session = localStorage.getItem('session')
    const { access } = redux().auth

    await trackPromise(
      Fetching({
        method: 'get',
        url: `/auth/signout/${session}`,
        headers: {
          Authorization: `Bearer ${access}` || '',
        },
      }).catch(() => {
        initLogout(dispatch)
      }),
      'logout'
    )

    initLogout(dispatch)
  }

export const startChecking =
  () =>
  async (
    dispatch: (
      val?:
        | AuthAction
        | UserAction
        | AdminProvidersAction
        | ShoppingAction
        | any
    ) => void
  ) => {
    const tokenStorage = localStorage.getItem('token')
    const sessionID = localStorage.getItem('session')

    if (!tokenStorage || !sessionID) {
      return dispatch(logout())
    }

    dispatch(check(true))

    const {
      status,
      data: { session, person, account, roles },
    } = await trackPromise(
      Fetching({
        method: 'get',
        url: `/auth/refresh-token/${sessionID}`,
        headers: {
          Authorization: `Bearer ${tokenStorage}` || '',
        },
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          Swal.fire(
            'La sesión activa ha vencido',
            'Por motivos de seguridad es necesario que vuelvas a iniciar la sesión',
            'warning'
          )
        }
        localStorage.removeItem('token')
        localStorage.removeItem('session')
        localStorage.removeItem('access')
        return dispatch(logout())
      })
    )

    if (status === 200) {
      const { email, online, role, state } = account

      if (!state) {
        dispatch(check(false))
        localStorage.clear()
        return Swal.fire({
          title: 'Cuenta desactivada',
          text: 'Por favor contacte al administrador',
          icon: 'info',
        })
      }
      localStorage.setItem('session', session.id)
      localStorage.setItem('access', session.accessToken)

      dispatch(
        login({
          uid: account.id,
          access: session.accessToken,
          roles: roles || undefined,
        })
      )
      const user = { email, online, rol: role, ...person }

      dispatch(setUser(user))
      setTypeRol(user, dispatch)
    }

    return dispatch(check(false))
  }

export const startForgotPassword = (email: string) => async () => {
  localStorage.clear()
  const { status } = await trackPromise(
    Fetching({
      method: 'post',
      url: '/send/password',
      data: {
        email,
        url: 'https://portal.internationalsm.com/#/recover-password',
        //url: document.URL.replace('forgot-password', 'recover-password'),
      },
    }).catch(({ response: { data } }) => {
      Swal.fire({
        icon: 'error',
        title: 'Error enviando el correo',
        text: data.error,
      })
    }),
    'forgotPassword'
  )

  if (status === 200) {
    Swal.fire({
      title: 'Correo enviado',
      text: 'Por favor verifique su correo',
      icon: 'info',
    })
  }
}

export const startRecoverPassword =
  (password: string, token: string) => async () => {
    if (!token) return

    const { status } = await trackPromise(
      Fetching({
        method: 'put',
        url: '/account/reset-password',
        data: {
          password,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).catch(({ response: { data } }) => {
        Swal.fire({
          icon: 'error',
          title: 'Error enviando el correo',
          text: data.error,
        })
      }),
      'recoverPassword'
    )

    if (status === 200) {
      Swal.fire({
        title: 'Contraseña cambiada con éxito',
        text: 'Por favor inicie sesión',
        icon: 'success',
      })
    }
  }
