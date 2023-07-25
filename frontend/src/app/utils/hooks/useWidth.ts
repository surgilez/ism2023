import { useLayoutEffect, useState } from 'react'

export const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useLayoutEffect(() => {
    const effect = () => setWidth(window.innerWidth)
    window.addEventListener('resize', effect)

    return () => {
      window.removeEventListener('resize', effect)
    }
  }, [])

  return { width }
}
