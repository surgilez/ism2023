import { ChatNavigation } from '@chat/components'
import { Redux } from '@redux/interfaces/redux'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

export const Chat = () => {
  const { rol } = useSelector((i: Redux) => i.user)

  const bgColor = () => {
    let color = ''
    switch (rol) {
      case 'admin':
        color += 'bg-primary'
        break
      case 'seller':
        color += 'bg-[#001E36]'
        break
      default:
    }

    return color
  }

  return (
    <>
      {/* <h1 className="font-bold text-2xl text-white">Chat</h1> */}
      <div className={`mt-2 rounded-xl p-5 min-h-[800px] ${bgColor()}`}>
        {rol !== 'client' && (
          <>
            <ChatNavigation />
            <hr className="my-6 border-1 border-slate-200" />
          </>
        )}

        <Outlet />
      </div>
    </>
  )
}
