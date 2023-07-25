/* eslint-disable @typescript-eslint/no-empty-function */
import { Socket } from 'socket.io-client'
import { createContext, ReactNode, useEffect } from 'react'
import { useSocket } from '@utils/hooks/useSocket'
import { useSelector } from 'react-redux'
import { Redux } from '@redux/interfaces/redux'

interface SocketServer {
  socket?: Socket
  connectSocket?: () => void
  disconnectSocket: () => void
}

export const SocketContext = createContext<SocketServer>({
  disconnectSocket: () => {},
})

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const {
    connectSocket,
    disconnectSocket,
    socket,
    personalMessages,
    usersTeamChat,
    startVideoCall,
    cancellVideoCall,
    confirmVideoCall,
  } = useSocket()

  const { uid } = useSelector((i: Redux) => i.auth)
  const isAuth = !!uid

  useEffect(() => {
    if (isAuth) {
      connectSocket()
    }
  }, [isAuth, connectSocket])

  useEffect(() => {
    if (!isAuth) {
      disconnectSocket()
    }
  }, [isAuth, disconnectSocket])

  useEffect(() => {
    personalMessages()
  }, [personalMessages])

  useEffect(() => {
    usersTeamChat()
  }, [usersTeamChat])

  useEffect(() => {
    startVideoCall()
  }, [startVideoCall])

  useEffect(() => {
    cancellVideoCall()
  }, [cancellVideoCall])

  useEffect(() => {
    confirmVideoCall()
  }, [confirmVideoCall])

  return (
    <SocketContext.Provider value={{ connectSocket, disconnectSocket, socket }}>
      {children}
    </SocketContext.Provider>
  )
}
