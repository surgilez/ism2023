import { Service } from '@api/redux/interface'
import { Redux } from '@redux/interfaces/redux'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const useApi = () => {
  const { list: listService } = useSelector((i: Redux) => i.api.services)

  const [apiRateHawk, setApiRateHawk] = useState<Service | null>(null)

  useEffect(() => {
    if (!listService || listService.length <= 0) return

    const ratehawk = listService.find(
      (api) =>
        api.name === 'Hoteles' &&
        api.api?.name.toLowerCase().trim() === 'ratehawk'
    )
    setApiRateHawk(ratehawk as Service)
  }, [listService])

  return {
    apiRateHawk,
  }
}
