import { setTypeActiveChat } from '@redux/actions/chat'
import { Redux } from '@redux/interfaces/redux'
import { useDispatch, useSelector } from 'react-redux'

export const ChatNavigationSeller = () => {
  const dispatch = useDispatch()

  const { typeActiveChat } = useSelector((i: Redux) => i.chat)

  return (
    <>
      <li>
        <span
          onClick={() => dispatch(setTypeActiveChat('team'))}
          className={`btn btn-ghost btn-sm px-7 border-2 border-gray-500 p-2 rounded-2xl text-white ${
            typeActiveChat &&
            typeActiveChat.endsWith('seller') &&
            'subNavActive'
          }`}
        >
          Equipo
        </span>
      </li>
      <li>
        <span
          onClick={() => dispatch(setTypeActiveChat('client'))}
          className={`btn btn-ghost btn-sm px-7 border-2 border-gray-500 p-2 rounded-2xl text-white ${
            typeActiveChat &&
            typeActiveChat.endsWith('seller') &&
            'subNavActive'
          }`}
        >
          Clientes
        </span>
      </li>
    </>
  )
}
