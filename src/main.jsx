import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { UserProvider } from './contexts/UserContext.jsx';
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider>
      <ColorModeScript initialColorMode="light" />
        <UserProvider>
          <App />
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
