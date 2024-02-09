import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { socket, WebsocketProvider } from './contexts/WebsocketContext';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react'
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebsocketProvider value={socket}>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </WebsocketProvider>
  </React.StrictMode>
);
