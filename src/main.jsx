import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript, SkipNavLink } from '@chakra-ui/react'
import { UserProvider } from './contexts/UserContext.jsx';
import App from './App.jsx'
import theme from "./theme/theme.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="light" />
        <UserProvider>
          <SkipNavLink zIndex="20" >Skip to content</SkipNavLink>
          <App />
        </UserProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
