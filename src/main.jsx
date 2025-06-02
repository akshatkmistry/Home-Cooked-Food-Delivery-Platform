import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // or your CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
