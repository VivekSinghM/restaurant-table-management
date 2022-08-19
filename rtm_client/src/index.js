import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import AuthProvider from './context/AuthProvider';
import MenuProvider from './context/MenuProvider';
import OrderProvider from './context/OrderProvider';
import TableDataProvicer from './context/TableDataProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <OrderProvider>
            <TableDataProvicer>
              <App />
            </TableDataProvicer>
          </OrderProvider>
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

