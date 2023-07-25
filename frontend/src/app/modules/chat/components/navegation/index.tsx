import { Redux } from '@redux/interfaces/redux'
import { useSelector } from 'react-redux'
import { ChatNavigationAdmin } from './admin'
import { ChatNavigationSeller } from './seller'

export const ChatNavigation = () => {
  const { rol } = useSelector((i: Redux) => i.user)

  return (
    <ul className="flex gap-3 my-6">
      {rol === 'admin' && <ChatNavigationAdmin />}
      {rol === 'seller' && <ChatNavigationSeller />}
    </ul>
  )
}
