import { Redux } from '@redux/interfaces/redux'
import { useSelector } from 'react-redux'
import {
  ListUsersChat,
  Messages,
  NavbarChat,
  SearchUsersChat,
  SelectSomethingChat,
} from '../components'

export const ClientChatScreen = () => {
  const {
    chat: { activeChat },
    user: { rol },
  } = useSelector((i: Redux) => i)

  return (
    <div className="mt-10 w-full px-5 flex justify-center items-center">
      <div className="flex justify-between flex-col xl:flex-row w-full xl:w-[1000px]">
        <div className="xl:w-80">
          <div
            className={`h-full p-3 rounded-xl border ${
              rol === 'client' && 'border-primary'
            }`}
          >
            {rol !== 'client' && <SearchUsersChat />}
            <div className="overflow-x-auto scroll_list xl:h-[700px] xl:overflow-y-auto ">
              <ListUsersChat />
            </div>
          </div>
        </div>

        <div
          className={`mt-8 xl:mt-0 xl:ml-5 xl:w-3/4 bg-base-100 chat-messages ${
            rol === 'client' && 'bg-[#6B6CB0]'
          }
                            ${!activeChat && 'flex justify-center items-center'}
                        `}
        >
          {!activeChat ? (
            <SelectSomethingChat />
          ) : (
            <>
              <NavbarChat />
              <Messages />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
