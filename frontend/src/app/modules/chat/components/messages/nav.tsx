import { Redux } from '@redux/interfaces/redux'
import { Avatar } from '@utils/components/avatar'
import { NameChat } from '@utils/pipes'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { VideoCallModal } from './videoCall'

export const NavbarChat = () => {
  const {
    chat: { activeChat },
    user: { rol },
  } = useSelector((i: Redux) => i)

  const [openModal, setOpenModal] = useState(false)

  const handleVideoCall = () => {
    if (activeChat?.account.online) {
      setOpenModal(true)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5 mr-7 w-fit ">
          <div className="mb-5">
            <Avatar img={activeChat?.person.img} />
          </div>

          <span
            className={`text-2xl whitespace-nowrap font-bold ${
              rol === 'client' ? 'text-white' : 'text-gray-500 '
            }`}
          >
            {activeChat &&
              NameChat(activeChat.person.name, activeChat.person.lastName)}
          </span>
        </div>
        <div className="flex items-center">
          <div className="tooltip" data-tip="Llamadas">
            <i
              className={`btn btn-ghost btn-circle fa-solid fa-phone text-md cursor-pointer ${
                rol === 'client' ? 'text-white' : 'text-secondary'
              }`}
              onClick={handleVideoCall}
            />
          </div>
        </div>
      </div>
      <hr className="border-b-1 border-gray-300 px-2" />

      <VideoCallModal open={openModal} setOpenModal={setOpenModal} />
    </div>
  )
}
