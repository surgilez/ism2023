import { Redux } from '@redux/interfaces/redux'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Chat } from '../layout'
import { AdminChatScreen, ClientChatScreen, SellerChatScreen } from '../pages'

export const ChatRoutes = () => {
  const { rol } = useSelector((i: Redux) => i.user)

  let Element: () => JSX.Element = () => <div />

  switch (rol) {
    case 'admin':
      Element = AdminChatScreen
      break
    case 'seller':
      Element = SellerChatScreen
      break
    case 'client':
      Element = ClientChatScreen
      break
    default:
  }

  return (
    <Routes>
      <Route element={<Chat />}>
        <Route index element={<Element />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
