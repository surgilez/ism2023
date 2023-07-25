/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SocketContext } from '@context/socket'
import { videoCall } from '@helpers/videoCall'
import { confirmCall } from '@redux/actions/chat'
import { Redux } from '@redux/interfaces/redux'
import { Avatar } from '@utils/components/avatar'
import { Modal } from '@utils/components/modal'
import { NameChat } from '@utils/pipes/index'
import { useContext, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'

export const VideoCallModal = ({
  open,
  setOpenModal,
}: {
  open: boolean
  setOpenModal: (val?: any) => void
}) => {
  const {
    chat: { activeChat, call },
    auth: { uid },
    user: { name, lastName },
  } = useSelector((i: Redux) => i)

  const dispatch = useDispatch()

  const from = {
    uid,
    name,
    lastName,
  }

  const to = activeChat

  const handleStopCall = () => {
    setOpenModal(false)
    socket?.emit('videoCall', { to, from, cancell: true })
  }

  const { socket } = useContext(SocketContext)
  const room = `https://meet.jit.si/personal-meet-${from.uid}-${to?.account.id}`

  useEffect(() => {
    if (open) {
      socket?.emit('videoCall', { to, from, room })
    }
  }, [socket, open])

  useEffect(() => {
    if (call) {
      videoCall(room)
    }

    dispatch(confirmCall(undefined))
    setOpenModal(false)
  }, [call, room, dispatch])

  return (
    <Modal openModal={open}>
      <div className="flex flex-col justify-center items-center mt-5 ">
        <Avatar img={activeChat?.person.img} size={40} />

        <span className="mt-4 text-xl">
          Llamando a{' '}
          {activeChat &&
            NameChat(activeChat.person.name, activeChat.person.lastName)}
        </span>

        <span className="mt-5">
          <ThreeDots ariaLabel="loading-indicator" />
        </span>

        <button
          type="button"
          className="btn btn-circle btn-outline w-18 h-18 mt-10"
          onClick={handleStopCall}
        >
          <i className="fa-solid fa-phone-slash text-xl" />
        </button>
      </div>
    </Modal>
  )
}
