import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import RoutesElement from './routes';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    < RoutesElement />
  </BrowserRouter>)
{/* </React.StrictMode>, */ }
//)
