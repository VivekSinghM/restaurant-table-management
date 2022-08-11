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
      <MenuProvider>
        <AuthProvider>
          <OrderProvider>
            <TableDataProvicer>
              <App/>
            </TableDataProvicer>
          </OrderProvider>
        </AuthProvider>
      </MenuProvider>
    </BrowserRouter>
  </React.StrictMode>
);

