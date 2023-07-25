import { usePromiseTracker } from 'react-promise-tracker'
import { InfinitySpin } from 'react-loader-spinner'
import { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startChecking } from '@redux/actions/auth'

export const MainSpinner = ({ children }: { children: ReactNode }) => {
  const { promiseInProgress } = usePromiseTracker()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch, startChecking])

  return (
    <div>
      {promiseInProgress ? (
        <div className="spinner">
          <div>
            <InfinitySpin color="grey" width="200px" />
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
