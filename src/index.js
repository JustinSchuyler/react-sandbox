import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Calculator from './Calculator/Calculator';
import CommentForm from './CommentForm';
import Comments from './Comments';
import Game from './Game/Game';
import Timer from './Timer';
import Toggle from './Toggle';
import './index.css';

ReactDOM.render(
  <div>
    <App />
    <Calculator />
    <Timer />
    <Comments />
    <CommentForm />
    <Game />
    <Toggle />
  </div>,
  document.getElementById('root')
);
