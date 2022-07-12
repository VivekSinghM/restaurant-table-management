import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './components/Login'
import Signup from './components/signup/Signup'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Login/>
  </React.StrictMode>
);

