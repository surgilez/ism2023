import { useDispatch } from 'react-redux'
import { startLogout } from '@redux/actions/auth'
import { ReactNode } from 'react'

export const Logout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return <div onClick={handleLogout}>{children}</div>
}
