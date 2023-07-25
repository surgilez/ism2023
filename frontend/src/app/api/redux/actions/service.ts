import { defaultError } from '@helpers/error'
import { FetchingToken } from '@helpers/fetch'
import { startChecking } from '@redux/actions'
import { trackPromise } from 'react-promise-tracker'
import { ServiceAction, ServiceState } from '../interface/state'
import { GET_SERVICES } from '../types'

export const getServiceAction = (payload: ServiceState): ServiceAction => ({
  type: GET_SERVICES,
  payload,
})

export const startGetServices = () => async (dispatch: (val?: any) => void) => {
  const { status, data } = await trackPromise(
    FetchingToken({
      url: `/services`,
      method: 'get',
    }).catch(({ response: { status: errStatus } }) => {
      if (errStatus === 403) {
        dispatch(startChecking())
      } else {
        defaultError()
      }
    }),
    'services'
  )

  if (status === 200) {
    const services = data.map(
      ({ name, state, profit, informationApi: api }: any) => ({
        name,
        state,
        profit,
        api: {
          id: api.id,
          name: api.name,
          state: api.state,
          endPoint: api.credentials.endPoint,
          credentials: {
            username: api.credentials.username,
            password: api.credentials.password,
          },
        },
      })
    )

    /**Eliminar este método cuando esten todos los servicios */
    services.push(
      {
        name: 'Vuelos',
        state: true,
        profit: 10,
        api: {
          id: '2',
          name: 'ratehawk',
          state: true,
          endPoint: 'https://api.worldota.net/api/b2b/v3',
          credentials: {
            username: '1',
            password: 'xxxxx',
          },
        },
      },
      {
        name: 'Autos',
        state: true,
        profit: 15,
        api: {
          id: '3',
          name: 'ratehawk',
          state: true,
          endPoint: 'https://api.worldota.net/api/b2b/v3',
          credentials: {
            username: '2',
            password: 'xxxccxx',
          },
        },
      },
      {
        name: 'Tours',
        state: true,
        profit: 12,
        api: {
          id: '4',
          name: 'ratehawk',
          state: true,
          endPoint: 'https://api.worldota.net/api/b2b/v3',
          credentials: {
            username: '3',
            password: '3xcvsd',
          },
        },
      },
      {
        name: 'Crucero',
        state: true,
        profit: 6,
        api: {
          id: '5',
          name: 'ratehawk',
          state: true,
          endPoint: 'https://api.worldota.net/api/b2b/v3',
          credentials: {
            username: '4',
            password: 'xcvxcvwe4',
          },
        },
      }
    )

    dispatch(
      getServiceAction({
        list: services,
      })
    )
  }

  // const services: ServiceState = {
  //   list: [
  // {
  //   name: 'Hoteles',
  //   state: true,
  //   profit: 20,
  //   api: {
  //     id: '1',
  //     name: 'ratehawk',
  //     state: true,

  //     endPoint: 'https://api.worldota.net/api/b2b/v3',
  //     credentials: {
  //       username: '3743',
  //       password: '0e6396c4-df71-4757-b15e-66550e9b88d6',
  //     },
  //   },
  // },
  //     {
  //       name: 'Vuelos',
  //       state: true,
  //       profit: 10,
  //       api: {
  //         id: '2',
  //         name: 'ratehawk',
  //         state: true,
  //         endPoint: 'https://api.worldota.net/api/b2b/v3',
  //         credentials: {
  //           username: '3743',
  //           password: '0e6396c4-df71-4757-b15e-66550e9b88d6',
  //         },
  //       },
  //     },
  //     {
  //       name: 'Autos',
  //       state: true,
  //       profit: 15,
  //       api: {
  //         id: '3',
  //         name: 'ratehawk',
  //         state: true,
  //         endPoint: 'https://api.worldota.net/api/b2b/v3',
  //         credentials: {
  //           username: '3743',
  //           password: '0e6396c4-df71-4757-b15e-66550e9b88d6',
  //         },
  //       },
  //     },
  //     {
  //       name: 'Tours',
  //       state: true,
  //       profit: 12,
  //       api: {
  //         id: '4',
  //         name: 'ratehawk',
  //         state: true,
  //         endPoint: 'https://api.worldota.net/api/b2b/v3',
  //         credentials: {
  //           username: '3743',
  //           password: '0e6396c4-df71-4757-b15e-66550e9b88d6',
  //         },
  //       },
  //     },
  //     {
  //       name: 'Crucero',
  //       state: true,
  //       profit: 6,
  //       api: {
  //         id: '5',
  //         name: 'ratehawk',
  //         state: true,
  //         endPoint: 'https://api.worldota.net/api/b2b/v3',
  //         credentials: {
  //           username: '3743',
  //           password: '0e6396c4-df71-4757-b15e-66550e9b88d6',
  //         },
  //       },
  //     },
  //   ],
  // }
}
