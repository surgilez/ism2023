import { ReactNode } from 'react'
import AvatarNotFound from '@assets/notfoundavatar.jpg'

export const Avatar = ({
  img,
  children,
  className,
  online,
  isChat,
  size,
}: {
  img?: string | null
  children?: ReactNode
  className?: string
  online?: boolean
  isChat?: boolean
  size?: number
}) => (
  <div className="dropdown dropdown-end flex">
    <label
      tabIndex={0}
      className={`btn btn-ghost btn-circle avatar ${
        isChat && (online ? 'online' : 'offline')
      } border-2 border-gray-200 ${size && `w-[${size}] h-[${size}]`}`}
    >
      <div className={`${className} rounded-full `}>
        <img
          src={img ? `${process.env.BACKEND}/${img}` : AvatarNotFound}
          alt="avatar"
        />
      </div>
    </label>
    {children}
  </div>
)
