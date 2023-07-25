import moment from '@helpers/moment'
import Swal from 'sweetalert2'
import { AdminReportAction } from '@redux/interfaces/admin'
import { defaultError } from '@helpers/error'
import { FetchingToken } from '@helpers/fetch'
import { MembershipReport, SaleReport } from '@admin/modules/reports/interfaces'
import { Redux } from '@redux/interfaces/redux'
import { startChecking } from '../auth'
import { trackPromise } from 'react-promise-tracker'
import {
  GET_MEMBERSHIP_REPORTS,
  SET_LIST_MEMBERSHIP,
  SET_RESET_MEMBERSHIP_REPORT,
  GET_SALES_REPORTS,
  SET_LIST_SALES,
  SET_RESET_SALES_REPORT,
} from '@redux/types'

export const getMembershipReports = (
  membershipList?: MembershipReport[]
): AdminReportAction => ({
  type: GET_MEMBERSHIP_REPORTS,
  payload: { membershipList },
})

export const setListMembershipSelect = (
  select: number[] | string[]
): AdminReportAction => ({
  type: SET_LIST_MEMBERSHIP,
  payload: { select },
})

export const setResetMembershipReport = (aux: boolean): AdminReportAction => ({
  type: SET_RESET_MEMBERSHIP_REPORT,
  payload: { aux },
})

export const getSalesReports = (
  salesList?: SaleReport[]
): AdminReportAction => ({
  type: GET_SALES_REPORTS,
  payload: { salesList },
})

export const setListSalesSelect = (
  selectSales: number[] | string[]
): AdminReportAction => ({
  type: SET_LIST_SALES,
  payload: { selectSales },
})

export const setResetSalespReport = (aux: boolean): AdminReportAction => ({
  type: SET_RESET_SALES_REPORT,
  payload: { aux },
})

export const startGetMembershipReports =
  () => async (dispatch: (val?: any) => void, redux: () => Redux) => {
    const { uid } = redux().auth

    const { status, data } = await trackPromise(
      FetchingToken({
        url: `/account/seller/${uid}`,
        method: 'get',
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'clientSeller'
    )

    if (status === 200 && data) {
      const dataMembership = data.map(
        ({ id, person, email, salesHistory }: any) => {
          const shoppingAux: any[] = []
          let c = 0
          let c2 = 0
          let shopping: any = null
          while (c < salesHistory.length) {
            shopping = salesHistory[c].shopping
            while (c2 < shopping.length) {
              shopping[c2].createdAt = salesHistory[c].createdAt
              c2++
            }
            shoppingAux.push(salesHistory[c].shopping)
            c++
          }

          const shoppingMap = shoppingAux.flat()
          const salesCurrenMont: any[] = []

          const sales = shoppingMap.map((val: any) => {
            const sale = {
              id: val.id,
              name: val.name,
              price: val.total,
              detail: `${val.name} - ${val.item_name}`,
              date: val.date,
              error: val.errorBooking,
              createdAt: val.createdAt,
            }

            if (moment(val.createdAt).month() === moment().month()) {
              salesCurrenMont.push(sale)
            }
            return sale
          })

          return {
            id,
            name: person.name,
            lastName: person.lastName,
            doc: person.doc,
            email,
            sales,
            salesCurrenMont,
          }
        }
      )

      dispatch(getMembershipReports(dataMembership))
    }
  }

export const startGetAdminReports =
  () => async (dispatch: (val?: any) => void) => {
    const {
      status,
      data: { salesHistories },
    } = await trackPromise(
      FetchingToken({
        url: `/sales-histories`,
        method: 'post',
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'salesSeller'
    )

    if (status === 200 && salesHistories) {
      const dataMembership = salesHistories.map(
        ({ account, shopping }: any) => {
          const sales: any[] = []
          let cont = 0

          while (cont < shopping.length) {
            const { item_name, name, total, id, checkin, checkout } =
              shopping[cont]

            sales.push({
              id,
              detail: `Reserva - ${name}`,
              name: item_name,
              price: Number(total).toFixed(2),
              checkin: moment.unix(checkin).format('yyyy-MM-DD'),
              checkout: moment.unix(checkout).format('yyyy-MM-DD'),
            })
            cont++
          }

          return {
            id: account.id,
            name: account.person.name,
            lastName: account.person.lastName,
            doc: account.person.doc,
            email: account.email,
            numMembership: account.code,
            sales,
          }
        }
      )

      dispatch(getMembershipReports(dataMembership))
    }
  }

export const startGetSalesReports =
  () => async (dispatch: (val?: any) => void) => {
    const {
      status,
      data: { salesHistories },
    } = await trackPromise(
      FetchingToken({
        url: `/sales-histories`,
        method: 'post',
      }).catch(({ response: { status: errStatus } }) => {
        if (errStatus === 403) {
          dispatch(startChecking())
        } else {
          defaultError()
        }
      }),
      'salesSeller'
    )

    if (status === 200 && salesHistories) {
      dispatch(
        getSalesReports([
          {
            id: '1',
            name: 'Nicholas Runolfsdottir V',
            lastName: 'Maxime_Nienow',
            doc: 'VF856552',
            email: 'Sherwood@rosamond.me',
            numMembership: '789655',
          },
        ])
      )
    }
  }

export const startSearchSalesReports =
  (dataFetch: any) =>
  async (dispatch: (val?: any) => void, redux: () => Redux) => {
    let msg = ''
    const {
      auth: { uid },
      user: { rol },
      // admin: {
      //   reports: { membershipList },
      // },
    } = redux()

    if (!dataFetch.filter) {
      msg = 'Seleccione un filtro'
    }

    if (dataFetch.filter === '1' && !dataFetch.typeSort) {
      msg = 'Seleccione una opción de ordenamiento'
    }

    if (
      (dataFetch.filter === '2' && !dataFetch.endDate) ||
      (dataFetch.filter === '2' && !dataFetch.startDate)
    ) {
      msg = 'Seleccione un rango de fechas válido'
    }

    if (dataFetch.filter === '3' && !dataFetch.membership) {
      msg = 'Seleccione una membresía'
    }

    if (dataFetch.filter === '4' && !dataFetch.doc) {
      msg = 'Seleccione el documento de búsqueda'
    }

    if (dataFetch.filter === '5' && !dataFetch.name) {
      msg = 'Seleccione el nombre de búsqueda'
    }

    if (dataFetch.filter === '6' && !dataFetch.email) {
      msg = 'Seleccione el email de búsqueda'
    }

    if (msg) {
      Swal.fire('Ooops!', msg, 'warning')
    } else {
      const {
        status,
        data: { salesHistories },
      } = await trackPromise(
        FetchingToken({
          url:
            rol === 'admin'
              ? '/sales-histories'
              : `/sales-history/seller/${uid}`,
          method: 'post',
          data: dataFetch,
        }).catch(({ response: { status: errStatus } }) => {
          if (errStatus === 403) {
            dispatch(startChecking())
          } else {
            defaultError()
          }
        }),
        'salesSeller'
      )

      if (status === 200 && salesHistories) {
        const shoppingAux: any[] = []

        salesHistories.forEach(({ account, shopping, createdAt }: any) => {
          let c = 0

          while (c < shopping.length) {
            shopping[c].createdAt = createdAt
            shopping[c].account = {
              id: account.id,
              name: account.person.name,
              lastName: account.person.lastName,
              doc: account.person.doc,
              email: account.email,
            }
            shoppingAux.push(shopping[c])
            c++
          }
        })

        const dataMapper = shoppingAux.flat()

        const account = new Set()
        const sales: any[] = []
        const salesCurrenMont: any[] = []

        dataMapper.forEach((x) => {
          account.add(JSON.stringify(x.account))

          const sale = {
            id: x.id,
            name: x.name,
            price: x.total,
            detail: `${x.name} - ${x.item_name}`,
            date: x.date,
            error: x.errorBooking,
            createdAt: x.createdAt,
          }

          sales.push(sale)
          if (moment(x.createdAt).month() === moment().month()) {
            salesCurrenMont.push(sale)
          }

          const accountMp = [...account]
          accountMp.forEach((v: any) => {
            const c = JSON.parse(v)
            if (c.id === x.id) {
              accountMp.push(sale)
            }
          })
        })

        // const shoppingMap = shoppingAux.flat()
        // const salesCurrenMont: any[] = []

        // const sales = shoppingMap.map((val: any) => {
        //   const sale = {
        //     id: val.id,
        //     name: val.name,
        //     price: val.total,
        //     detail: `${val.name} - ${val.item_name}`,
        //     date: val.date,
        //     error: val.errorBooking,
        //     createdAt: val.createdAt,
        //   }

        //   if (moment(val.createdAt).month() === moment().month()) {
        //     salesCurrenMont.push(sale)
        //   }
        //   return sale
        // })

        // console.log(dataMembership)

        //   const dataMembership = data.map(
        //     ({ id, person, email, salesHistory }: any) => {
        //       const shoppingAux: any[] = []
        //       let c = 0
        //       let c2 = 0
        //       let shopping: any = null
        //       while (c < salesHistory.length) {
        //         shopping = salesHistory[c].shopping
        //         while (c2 < shopping.length) {
        //           shopping[c2].createdAt = salesHistory[c].createdAt
        //           c2++
        //         }
        //         shoppingAux.push(salesHistory[c].shopping)
        //         c++
        //       }

        //       const shoppingMap = shoppingAux.flat()
        //       const salesCurrenMont: any[] = []

        //       const sales = shoppingMap.map((val: any) => {
        //         const sale = {
        //           id: val.id,
        //           name: val.name,
        //           price: val.total,
        //           detail: `${val.name} - ${val.item_name}`,
        //           date: val.date,
        //           error: val.errorBooking,
        //           createdAt: val.createdAt,
        //         }

        //         if (moment(val.createdAt).month() === moment().month()) {
        //           salesCurrenMont.push(sale)
        //         }
        //         return sale
        //       })

        //       return {
        //         id,
        //         name: person.name,
        //         lastName: person.lastName,
        //         doc: person.doc,
        //         email,
        //         sales,
        //         salesCurrenMont,
        //       }
        //     }
        //   )
      }
    }
  }
