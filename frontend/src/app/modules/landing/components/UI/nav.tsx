import { Link } from 'react-router-dom'
import Logo from '@assets/logo.png'
import { useState } from 'react'
import { SignIn } from '../auth'

export const LandingNavigation = () => {
  const [showBannerLogin, seShowBannerLogin] = useState(false)

  const handleShowBannerLogin = () => seShowBannerLogin(!showBannerLogin)

  return (
    <>
      <div className="navbar bg-base-100 landing_nav">
        <div className="navbar-start">
          <Link to="/" className=" normal-case text-xl landing__logo ml-5">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <i className="fa-solid fa-bars text-2xl" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/about">¿Como funcionamos?</Link>
              </li>
              <li onClick={handleShowBannerLogin}>
                <a>Iniciar Sesión</a>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal p-0 z-10">
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/about">¿Como funcionamos?</Link>
              </li>
              <li onClick={handleShowBannerLogin}>
                <a>Iniciar Sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ display: showBannerLogin ? 'block' : 'none' }}>
        <SignIn />
      </div>
    </>
  )
}

export default LandingNavigation
