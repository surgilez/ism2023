import { InfinitySpin } from 'react-loader-spinner'

export const SuspenseLoader = () => (
  <div className="spinner">
    <div className="animate__animated animate__fadeIn">
      <InfinitySpin color="grey" width="200px" />
    </div>
  </div>
)
