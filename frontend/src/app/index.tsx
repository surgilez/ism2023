import Store from '@redux/store'
import { Provider } from 'react-redux'
import { SocketProvider } from '@context/socket'
import Routes from './routes'

const App = () => (
  <Provider store={Store}>
    <SocketProvider>
      <Routes />
    </SocketProvider>
  </Provider>
)

export default App
