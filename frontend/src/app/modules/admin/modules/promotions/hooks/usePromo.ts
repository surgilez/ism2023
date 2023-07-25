/* eslint-disable @typescript-eslint/no-explicit-any */
import { activePromo, startDeletePromo } from '@redux/actions'
import { Redux } from '@redux/interfaces/redux'
import { useImgInput } from '@utils/hooks/useImg'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PromoAdmin } from '../interfaces'

export const usePromo = ([openModal, setOpenModal]: any) => {
  const inputImgRef = useRef<HTMLInputElement>(null)
  const refImg = useRef<HTMLImageElement>(null)

  const { handleChangeImg, handleOpenInputImg } = useImgInput({
    refImg,
    inputImgRef,
  })

  const dispatch = useDispatch()

  const initState: PromoAdmin = {
    img: null,
    title: '',
    from: '',
    until: '',
    description: '',
    policies: '',
    membership: '',
    // informationApi: [],
    dynamic: false,
  }

  const {
    admin: {
      promo: { active },
      membership: { list: listMemberships },
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
    dispatch(activePromo(undefined))
  }

  const handleDeleteItem = (promo: PromoAdmin) => {
    setOpenModal(false)
    setInit(initState)
    dispatch(startDeletePromo(promo))
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
    handleChangeImg,
    listProviders,
    listMemberships,
  }
}
