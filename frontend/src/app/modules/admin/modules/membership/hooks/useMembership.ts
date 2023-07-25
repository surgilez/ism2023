import {
  activeMembership,
  startDeleteMembership,
  startSuspenseMembership,
} from '@redux/actions'
import { Redux } from '@redux/interfaces/redux'
import { useImgInput } from '@utils/hooks/useImg'
import { Membership, NEWMembership } from '@utils/interfaces'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useMembership = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const inputImgRef = useRef<HTMLInputElement>(null)
  const refImg = useRef<HTMLImageElement>(null)

  const { handleChangeImg, handleOpenInputImg } = useImgInput({
    refImg,
    inputImgRef,
  })

  const dispatch = useDispatch()

  const initState: NEWMembership = {
    name: '',
    exp: '',
    price: '',
    img: null,
    code: '',
    services: [
      {
        provider: '',
        service: '',
        dsto: '',
      },
    ],
  }

  const {
    admin: {
      membership: { active, list: ListMembership },
    },
    provider: { list: listProviders },
  } = useSelector((i: Redux) => i)

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
    dispatch(activeMembership(undefined))
  }

  const handleDeleteItem = () => {
    setOpenModal(false)
    setInit(initState)
    dispatch(startDeleteMembership())
  }

  const handleSuspense = (membership: Membership) => {
    dispatch(startSuspenseMembership(membership))
  }

  return {
    openModal,
    setOpenModal,
    active,
    init,
    dispatch,
    setInit,
    initState,
    handleOpenInputImg,
    refImg,
    handleCancelAction,
    handleDeleteItem,
    inputImgRef,
    ListMembership,
    handleSuspense,
    handleChangeImg,
    listProviders,
  }
}
