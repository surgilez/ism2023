import { LazyExoticComponent } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const PublicRoute = ({
  children,
  path,
}: {
  path?: string
  children: JSX.Element
}) => {
  const location = useLocation()
  return path ? (
    <Navigate to={path} state={{ from: location }} replace />
  ) : (
    children
  )
}

export const PrivateRoute = ({
  Element,
}: {
  Element: LazyExoticComponent<() => JSX.Element> | (() => JSX.Element) | null
}) => {
  const location = useLocation()
  return Element ? (
    <Element />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  )
}
