import Logo from '@assets/logo.png'
import { Redux } from '@redux/interfaces/redux'
import { NameChat } from '@utils/pipes'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ClietNavigation } from './nav'
import { ShoppingCart } from '../shopping'
import { Support } from './support'

export const ClientNavbar = () => {
  const { name, lastName } = useSelector((i: Redux) => i.user)
  return (
    <div className="navbar bg-base-100 p-5 xl:px-32 " id="navbarClient">
      <div className="flex-1">
        <Link to="/client" className=" normal-case text-xl landing__logo ml-5">
          <img src={Logo} alt="logo" />
        </Link>

        <span className="self-end hidden xl:block text-xl font-bold">
          Hola, {NameChat(String(name), String(lastName))}
        </span>
      </div>
      <div className="flex items-center">
        <Support />
        <ShoppingCart />
        <ClietNavigation />
      </div>
    </div>
  )
}
