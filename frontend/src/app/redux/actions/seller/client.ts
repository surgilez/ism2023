import { GET_CLIENT_SELLER_LIST, ACTIVE_CLIENT } from '@redux/types'
import { ClientSellerAction } from '@redux/interfaces/seller/client'
import { Client } from '@utils/interfaces/admin/client'
// import { trackPromise } from 'react-promise-tracker'
// import { FetchingToken } from '@helpers/fetch'
// import { defaultError } from '@helpers/error'
// import { startChecking } from '../auth'

export const getClientsSeller = (list: {
  accounts: Client[]
  totalResults?: number | undefined
}): ClientSellerAction => ({
  type: GET_CLIENT_SELLER_LIST,
  payload: {
    list,
  },
})

export const setActiveClientSeller = (
  clientActive?: Client
): ClientSellerAction => ({
  type: ACTIVE_CLIENT,
  payload: {
    clientActive,
  },
})

export const startGetClientSeller = () => async () => {
  // clientSeller
  // const { uid } = redux().auth
  // const {} = await trackPromise(
  //   FetchingToken({
  //     url: `/account/seller/${uid}`,
  //     method: 'get',
  //   }).catch(({ response: { status: errStatus } }) => {
  //     if (errStatus === 403) {
  //       dispatch(startChecking())
  //     } else {
  //       defaultError()
  //     }
  //   }),
  //   'clientSeller'
  // )
  // dispatch(
  //   getClientsSeller({
  //     accounts: [
  //       {
  //         name: 'Melissa',
  //         lastName: 'L. Holmes',
  //         email: 'clienttest@gmail.com',
  //         doc: '12345678',
  //         id: 'cl4zymqvq0009octhzten20iu',
  //         seller: 'cl4rh8i0i0024l0hjmx02ab47',
  //         state: true,
  //       },
  //       {
  //         name: 'Herman',
  //         lastName: 'J. Coleman',
  //         email: 'clienttest@gmail.com',
  //         doc: '12345678',
  //         id: 'cl4zyo9xj0037octheevh06v0',
  //         seller: 'cl4rh8i0i0024l0hjmx02ab47',
  //         state: true,
  //       },
  //     ],
  //   })
  // )
}
