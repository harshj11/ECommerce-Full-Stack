import { ChakraProvider } from '@chakra-ui/react';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import theme from './theme/index';

import { Provider } from 'react-redux';
import store from './features/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
