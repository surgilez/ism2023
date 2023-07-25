import { createRoot } from 'react-dom/client'
import App from './app'
import 'sweetalert2/src/sweetalert2.scss'
import './styles/main.css'
;(() => {
  const container = document.getElementById('root')
  const root = createRoot(container!)
  root.render(<App />)
})()
