import { Redux } from '@redux/interfaces/redux'
import { useSelector } from 'react-redux'
import {
  ListUsersChat,
  Messages,
  NavbarChat,
  SearchUsersChat,
  SelectSomethingChat,
} from '../components'

export const SellerChatScreen = () => {
  const { activeChat } = useSelector((i: Redux) => i.chat)

  return (
    <div className="mt-6">
      <div className="flex justify-between flex-col xl:flex-row ">
        <div className="xl:w-80">
          <div className="border border-white h-full p-3 rounded-xl">
            <SearchUsersChat />
            <div className="overflow-x-auto scroll_list xl:h-[700px] xl:overflow-y-auto ">
              <ListUsersChat />
            </div>
          </div>
        </div>

        <div
          className={`mt-8 xl:mt-0 xl:ml-5 xl:w-3/4 bg-base-100 chat-messages 
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
