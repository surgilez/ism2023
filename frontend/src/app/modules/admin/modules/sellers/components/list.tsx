import { activeSeller } from '@redux/actions'
import { Redux } from '@redux/interfaces/redux'
import { ComponentLoader } from '@utils/components'
import { usePromiseTracker } from 'react-promise-tracker'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '@utils/components/pagination'
import { Seller } from '../interfaces'
import { useEffect } from 'react'
import { setPageAction, setTypePage } from '@redux/actions/admin/utils'

export const ListSeller = () => {
  const {
    admin: {
      seller: { list },
    },
  } = useSelector((i: Redux) => i)
  const dispatch = useDispatch()

  const handleDetails = (seller: Seller) => {
    dispatch(activeSeller(seller))
  }

  useEffect(() => {
    dispatch(setPageAction(1))
    dispatch(setTypePage('sellers'))
  }, [dispatch, setPageAction])

  const { promiseInProgress } = usePromiseTracker({ area: 'sellers_admin' })

  return (
    <div className="flex flex-col justify-between">
      <div>
        {promiseInProgress ? (
          <div className="mt-10 min-h-[60vh] grid place-content-center">
            <ComponentLoader />
          </div>
        ) : (
          <div className="mt-10 p-2 flex min-h-[60vh] flex-col gap-5">
            {list && list.accounts.length > 0 ? (
              list?.accounts.map((seller, i) => (
                <div
                  key={i}
                  className="shadow-xl flex justify-between items-center p-5 rounded-xl cardx"
                >
                  <div className="flex gap-4 items-center">
                    <span className="text-xl py-5 px-7 bg-base-100 rounded-xl">
                      {seller.seller}
                    </span>
                    <div>
                      <p>{seller.name}</p>
                      <p
                        className="underline text-sm text-blue-500 cursor-pointer "
                        onClick={() => handleDetails(seller)}
                      >
                        Ver detalles
                      </p>
                    </div>
                  </div>
                  <i className="fa-solid fa-check mr-4 text-xl" />
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-[500px]">
                <span>No existen vendedores</span>
              </div>
            )}
          </div>
        )}
      </div>

      {list?.accounts && list.accounts.length > 0 && (
        <div className={`mt-10 px-4 self-end ${promiseInProgress && 'hidden'}`}>
          <Pagination totalReg={list?.totalResults || 0} numPageByReg={5} />
        </div>
      )}
    </div>
  )
}
