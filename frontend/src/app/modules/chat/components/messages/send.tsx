import { SocketContext } from '@context/socket'
import { Redux } from '@redux/interfaces/redux'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import InputEmoji from 'react-input-emoji'

export const SendMessage = () => {
  const {
    auth: { uid },
    chat: { activeChat },
  } = useSelector((i: Redux) => i)

  const { socket } = useContext(SocketContext)

  const [message, setMessage] = useState<string>('')

  function handleOnEnter(inputMessage: string) {
    if (!inputMessage || !activeChat || !uid) return

    socket?.emit('personal-message', {
      from: uid,
      to: activeChat.account.id,
      message,
    })
  }

  return (
    <div className=" mt-6">
      <div className='className="mt-12 flex justify-between gap-2"'>
        <InputEmoji
          value={message}
          onChange={setMessage}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Escribir mensaje..."
          theme="light"
        />
      </div>
    </div>
  )
}
