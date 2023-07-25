import { GET_SELLER_CLIENT } from '@redux/types'
// import { defaultError } from '@helpers/error'
// import { FetchingToken } from '@helpers/fetch'
import {
  SellerClientAction,
  SellerClientState,
} from '@redux/interfaces/client/seller'
// import { trackPromise } from 'react-promise-tracker'
// import { startChecking } from '../auth'

export const setClientSeller = (
  payload: SellerClientState
): SellerClientAction => ({
  type: GET_SELLER_CLIENT,
  payload,
})

export const startGetClientSeller = (uid: string) => async (dispatch: any) => {
  console.log(
    'implementar startGetClientSeller en /redux/action/client/seller.ts',
    uid
  )
  // const {
  //   status,
  //   data: { account, person },
  // } = await trackPromise(
  //   FetchingToken({
  //     url: `/seller/${uid}`,
  //     method: 'get',
  //   }).catch(({ response: { status: errStatus } }) => {
  //     if (errStatus === 403) {
  //       dispatch(startChecking())
  //     } else {
  //       defaultError()
  //     }
  //   })
  // )

  // if (status === 200) {
  //   const dataSeller: SellerClientState = {
  //     id: account.id,
  //     email: account.email,
  //     commission: person.commission,
  //     name: person.name,
  //     lastName: person.lastName,
  //   }
  //   dispatch(setClientSeller(dataSeller))
  // }

  dispatch(
    setClientSeller({
      id: '',
      email: '',
      commission: 7,
      name: '',
      lastName: '',
    })
  )
}
