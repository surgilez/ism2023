import { setActiveClientSeller } from '@redux/actions/seller/client'
import { startGetShopping } from '@redux/actions/shopping'
import { Redux } from '@redux/interfaces/redux'
import { useForm } from '@utils/hooks/useForm'
import { Client } from '@utils/interfaces'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface InitState {
  client: ''
}

export const ClientsSellerShopping = () => {
  const dispatch = useDispatch()
  const {
    seller: {
      client: { clientActive },
    },
    admin: {
      reports: { membershipList },
    },
  } = useSelector((i: Redux) => i)

  const initState: InitState = {
    client: '',
  }
  const { client, handleInputChange, setValueForm } = useForm(initState)

  useEffect(() => {
    if (!client) {
      return
    }

    dispatch(setActiveClientSeller(JSON.parse(client)))
  }, [client, dispatch])

  useEffect(() => {
    if (!client && clientActive) {
      setValueForm((val) => ({
        ...val,
        client: JSON.stringify(clientActive) as any,
      }))
    }
  }, [clientActive, client, setValueForm])

  useEffect(() => {
    if (clientActive) {
      dispatch(startGetShopping(String(clientActive.id)))
    }
  }, [clientActive])

  return (
    <div className="flex justify-end gap-4 items-center">
      <div>
        <select
          title="select"
          name="client"
          value={client}
          onChange={handleInputChange as any}
          className="select select-sm bg-[#ececcc] select-primary"
        >
          <option value="" disabled>
            Seleccione un cliente
          </option>
          {membershipList &&
            membershipList.length > 0 &&
            membershipList.map((item: Client, i) => (
              <option key={i} value={JSON.stringify(item)}>
                {item.name} {item.lastName}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}
