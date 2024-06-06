import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStoreProvider } from './services/context/GlobalStoreContext';
import { AuthContextProvider } from './services/context/AuthContext';

import './styles/index.scss';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStoreProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </GlobalStoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);


