import { useDispatch } from 'react-redux'
import { useCallback, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { sendMessage, confirmCall, connectUser } from '@redux/actions/chat'
import { scrollToBottomAnimatedChat } from '@helpers/scroll'
import Swal from 'sweetalert2'
import { NameChat } from '@utils/pipes'
import { videoCall } from '@helpers/videoCall'

export const useSocket = () => {
  const pathServer = String(process.env.SOCKET)
  const [socket, setSocket] = useState<Socket>()
  const dispatch = useDispatch()

  const connectSocket = useCallback(() => {
    const newSocket = io(pathServer, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      secure: true,
      query: {
        token: localStorage.getItem('access'),
      },
      path: '/socket.io/',
    })

    setSocket(newSocket)

    return () => {
      socket?.disconnect()
    }
  }, [pathServer])

  const disconnectSocket = useCallback(() => {
    socket?.disconnect()
  }, [socket])

  const usersTeamChat = useCallback(() => {
    socket?.on('usersChat', (account) => {
      dispatch(connectUser(account))
    })
  }, [socket, dispatch])

  const personalMessages = useCallback(() => {
    socket?.on('personal-message', (message) => {
      dispatch(sendMessage(message))
      scrollToBottomAnimatedChat('messages')
    })
  }, [socket, dispatch])

  const startVideoCall = useCallback(() => {
    socket?.on('videoCall', ({ from, room }) => {
      Swal.fire({
        title: `Estas recibiendo una llamada de ${NameChat(
          from.name,
          from.lastName
        )}`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        denyButtonText: `Rechazar`,
      }).then((result) => {
        let accept = false
        if (result.isConfirmed) {
          videoCall(room)
          accept = true
        } else if (result.isDenied) {
          accept = false
        }

        socket.emit('confirmVideoCall', { accept, from })
      })
    })
  }, [socket, dispatch])

  const confirmVideoCall = useCallback(() => {
    socket?.on('confirmVideoCall', ({ accept }) => {
      dispatch(confirmCall(accept))

      if (!accept) {
        Swal.fire({
          title: `Inténtalo mas tarde`,
          text: 'La llamada ha sido rechazada',
          icon: 'success',
        })
      }
    })
  }, [socket, dispatch])

  const cancellVideoCall = useCallback(() => {
    // el socket retorna la propiedad from
    socket?.on('cancellVideoCall', () => {
      Swal.fire({
        title: `Lo sentimos`,
        text: 'La llamada ha sido cancelada',
        icon: 'success',
      })
    })
  }, [socket])

  return {
    socket,
    connectSocket,
    disconnectSocket,
    personalMessages,
    usersTeamChat,
    startVideoCall,
    cancellVideoCall,
    confirmVideoCall,
  }
}
