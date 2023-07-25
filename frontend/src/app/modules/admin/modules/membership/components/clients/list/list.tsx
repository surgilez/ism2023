import { setPageAction, setTypePage } from '@redux/actions/admin/utils'
import { Redux } from '@redux/interfaces/redux'
import { ComponentLoader } from '@utils/components'
import { Pagination } from '@utils/components/pagination'
import { useEffect } from 'react'
import { usePromiseTracker } from 'react-promise-tracker'
import { useDispatch, useSelector } from 'react-redux'
import { TableClients } from './table'

export const ListClients = () => {
  const dispatch = useDispatch()
  const {
    admin: {
      client: { list, selectReset },
    },
  } = useSelector((i: Redux) => i)

  useEffect(() => {
    dispatch(setPageAction(1))
    dispatch(setTypePage('clients'))
  }, [dispatch, setPageAction])

  const { promiseInProgress } = usePromiseTracker({ area: 'clients_admin' })

  return (
    <div className="flex flex-col">
      <div>
        {promiseInProgress ? (
          <div className="min-h-[60vh] grid place-content-center">
            <ComponentLoader />
          </div>
        ) : (
          <div className="flex flex-col">
            <TableClients
              promiseInProgress={promiseInProgress}
              list={list?.accounts || []}
              selectReset={selectReset}
            />
          </div>
        )}
      </div>
      {list?.accounts &&
        list.accounts.length > 0 &&
        list?.totalResults &&
        list?.totalResults !== -1 && (
          <div className={`mt-10  self-end ${promiseInProgress && 'hidden'}`}>
            <Pagination totalReg={list?.totalResults || 0} />
          </div>
        )}
    </div>
  )
}
