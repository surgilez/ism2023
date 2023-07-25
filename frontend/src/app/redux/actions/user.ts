import { FetchingToken } from '@helpers/fetch'
import { UserAction, UserState } from '@redux/interfaces/user'
import { USERINFO } from '@redux/types/auth/user'
import { Profile } from '@utils/interfaces'
import { trackPromise } from 'react-promise-tracker'
import Swal from 'sweetalert2'
import { logout } from './auth'
import { Redux } from '@redux/interfaces/redux'

export const setUser = (payload: UserState): UserAction => ({
  type: USERINFO,
  payload,
})

export const startEditProfile =
  (val: Profile) =>
  async (dispatch: (val?: any) => void, redux: () => Redux) => {
    const {
      auth: { uid },
      user,
    } = redux()

    const form = new FormData()
    const person = {
      name: val.name,
      lastName: val.lastName,
      phone: val.phone,
    }
    form.append('person', JSON.stringify(person))

    if (val.img) {
      form.append('img', val.img)
    }

    const { status, data } = await trackPromise(
      FetchingToken(
        {
          method: 'put',
          url: `/account/${uid}`,
          data: form,
        },
        () => {
          dispatch(logout())
        }
      ),
      'editProfile'
    )

    if (status === 200) {
      dispatch(
        setUser({
          ...user,
          name: val.name,
          lastName: val.lastName,
          phone: val.phone,
          img: data.person.img,
        })
      )
      Swal.fire(
        '¡Éxito!',
        'Se ha actualizado tu perfil correctamente',
        'success'
      )
    }
  }
