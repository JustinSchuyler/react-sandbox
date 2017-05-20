import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import Calculator from './Calculator/Calculator';
import Comments from './Comments/Comments';
import Game from './Game/Game';
import Topics from './Topics/Topics';
import './index.css';

const Home = () => (
  <h1>React Sandbox</h1>
);

ReactDOM.render(
  <Router>
    <div>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/calculator">Calculator</NavLink></li>
        <li><NavLink to="/comments">Comments</NavLink></li>
        <li><NavLink to="/game">Game</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/comments" component={Comments} />
      <Route path="/game" component={Game} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>,
  document.getElementById('root')
);
