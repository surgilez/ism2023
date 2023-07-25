import { useState } from 'react'

export const useDebounce = () => {
  const [timeOut, setTimeOutTime] = useState<NodeJS.Timeout | null>(null)

  const handleSetTimeOut = (fn: () => void, time: number) => {
    if (timeOut) {
      clearTimeout(timeOut)
    }

    setTimeOutTime(setTimeout(fn, time))
  }

  return {
    handleSetTimeOut,
  }
}
