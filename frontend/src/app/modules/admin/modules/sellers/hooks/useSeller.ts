import { activeSeller, startSuspenseSeller } from '@redux/actions'
import { Redux } from '@redux/interfaces/redux'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Seller } from '../interfaces'

export const useSeller = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const dispatch = useDispatch()

  const initState: Seller = {
    seller: '',
    address: '',
    doc: '',
    phone: '',
    state: true,
    allowAdviser: false,
    allowChat: false,
    name: '',
    lastName: '',
    email: '',
    dsto: '',
  }

  const { active } = useSelector((i: Redux) => i.admin.seller)

  const [init, setInit] = useState(initState)

  useEffect(() => {
    if (active) {
      setOpenModal(true)

      setInit((prev) => ({
        ...prev,
        ...active,
      }))
    }
  }, [active])

  const handleCancelAction = () => {
    setOpenModal(false)
    setInit(initState)
    dispatch(activeSeller(undefined))
  }

  const handleSuspenseItem = (seller: Seller) => {
    // setOpenModal(false);
    // setInit(initState);
    dispatch(startSuspenseSeller(seller))
  }

  return {
    openModal,
    setOpenModal,
    active,
    init,
    dispatch,
    setInit,
    initState,
    handleCancelAction,
    handleSuspenseItem,
  }
}
