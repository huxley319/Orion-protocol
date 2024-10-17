
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { TonConnectUIProvider } from '@tonconnect/ui-react';



ReactDOM.createRoot(document.getElementById('root')).render(
  <TonConnectUIProvider manifestUrl='https://telegram-mini-app-kkpo.onrender.com/tonconnect-manifest.json'>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </TonConnectUIProvider>,
)

