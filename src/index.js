import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Timer from './Timer';
import Toggle from './Toggle';
import './index.css';

ReactDOM.render(
  <div>
    <App />
    <Timer />
    <Toggle />
  </div>,
  document.getElementById('root')
);
