import { Redux } from '@redux/interfaces/redux'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@assets/card.png'
import { Membership } from '@utils/interfaces'
import { activeMembership } from '@redux/actions'
import { usePromiseTracker } from 'react-promise-tracker'
import { ComponentLoader } from '@utils/components/loader/component'

export const ListMembership = () => {
  const { list } = useSelector((i: Redux) => i.admin.membership)
  const dispatch = useDispatch()

  const handleDetails = (membership: Membership) => {
    dispatch(activeMembership(membership))
  }

  const { promiseInProgress } = usePromiseTracker({ area: 'membershipList' })

  return (
    <div>
      {promiseInProgress ? (
        <div className="min-h-[60vh] w-full grid place-content-center">
          <ComponentLoader />
        </div>
      ) : (
        <div className="mt-10 p-2 flex flex-col gap-5">
          {list && list.length > 0 ? (
            list?.map(
              (membership, i) =>
                membership.name?.toLocaleLowerCase() !== 's/n' && (
                  <div
                    key={i}
                    className="shadow-xl flex justify-between items-center p-5 rounded-xl cardx"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={
                          membership.img
                            ? `${process.env.BACKEND}/${
                                membership.img as string
                              }`
                            : Card
                        }
                        alt="card"
                        className="w-[75px]"
                      />
                      <div>
                        <p>{membership.name}</p>
                        <p
                          className="underline text-sm text-blue-500 cursor-pointer "
                          onClick={() => handleDetails(membership)}
                        >
                          Ver detalles
                        </p>
                      </div>
                    </div>
                    <i className="fa-solid fa-check mr-4 text-xl" />
                  </div>
                )
            )
          ) : (
            <div className="flex items-center justify-center h-[500px]">
              <span>No existen membresías</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
