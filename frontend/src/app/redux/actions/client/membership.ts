import moment from '@helpers/moment'
import { defaultError } from '@helpers/error'
import { FetchingToken } from '@helpers/fetch'
import { GET_MEMBERSHIP_CLIENT } from '@redux/types'
import { Membership } from '@utils/interfaces'
import { MembershipClientAction } from '@redux/interfaces/client/membership'
import { Redux } from '@redux/interfaces/redux'
import { startChecking } from '../auth'
import { trackPromise } from 'react-promise-tracker'

export const getMembershipAction = (
  list: Membership[]
): MembershipClientAction => ({
  type: GET_MEMBERSHIP_CLIENT,
  payload: {
    list,
  },
})

export const startGetMembershipClient =
  () => async (dispatch: (val?: any) => void, redux: () => Redux) => {
    const { uid } = redux().auth

    const { status, data } = await trackPromise(
      FetchingToken({
        url: `/membership/account/${uid}`,
        method: 'get',
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'membershipListUID'
    )
    console.log('membership/account', data, 'status', status)

    if (status === 200 && data.memberships) {
      const list = data.memberships.map((membership: any) => {
        let serviceId = ''
        return {
          id: membership.id,
          name: membership.name,
          exp: moment.unix(Number(membership.exp)).format('yyyy-MM-DD'),
          price: membership.price,
          state: membership.state,
          services: membership.services.map((service: any) => {
            serviceId = service.serviceId
            return {
              id: String(service?.id),
              provider:
                service.service.informationApi?.name.toLowerCase() || '',
              dsto: service?.dsto,
              service: service.service.name,
            }
          }),
          serviceId,
        }
      })
      dispatch(getMembershipAction(list))
    } else {
      dispatch(getMembershipAction([]))
    }
  }
