import { dateChat } from '@helpers/moment'
import { Redux } from '@redux/interfaces/redux'
import { useSelector } from 'react-redux'
import { Twemoji } from 'react-emoji-render'
import { Avatar } from '@utils/components/avatar'
import { SendMessage } from './send'

export const Messages = () => {
  const {
    chat: { messages, activeChat },
    auth: { uid },
    user: { img, rol },
  } = useSelector((i: Redux) => i)

  return (
    <>
      <div id="messages" className="mt-10 messages pb-[75px]">
        {messages?.map(({ message, from, createdAt }, i) => (
          <div
            key={i}
            className={`flex flex-col messages__${
              uid !== from ? 'from' : 'to'
            } `}
          >
            <div className="flex gap-4">
              <Avatar
                img={from === uid ? img : activeChat?.person.img}
                className={`${from === uid ? 'order-1' : 'order-0'}`}
              />

              <div className=" message">
                <div className="shadow-lg bg-gray-200 p-4 bg-white rounded-xl">
                  <span className="text-sm text-justify">
                    <Twemoji
                      text={message}
                      svg
                      options={{ className: 'Twemoji' }}
                      className="message_text flex gap-2"
                    />
                  </span>
                </div>
                <div className="message__date mt-2">
                  <span
                    className={`text-xs ${rol === 'client' && 'text-white'}`}
                  >
                    {createdAt && dateChat(createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SendMessage />
    </>
  )
}
