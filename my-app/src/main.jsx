import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { CartProvider } from './Context/Context.jsx'
import { SearchProvider } from './Context/Context.jsx'
import { Auth0Provider } from "@auth0/auth0-react";
import authConfig from "./auth_config.json";
import './index.css'
import App from './App.jsx'

//import { Provider } from 'react-redux';//
//import { store } from './store.js'//

createRoot(document.getElementById('root')).render(
  <Auth0Provider 
    domain={authConfig.domain}
    clientId={authConfig.clientId}
    authorizationParams={{
      redirect_uri: window.location.origin + "/callback",
      audience: authConfig.audience
    }}
  >
      <SearchProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </SearchProvider>
  </Auth0Provider>
)


