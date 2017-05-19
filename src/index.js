import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
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
        <li><Link to="/">Home</Link></li>
        <li><Link to="/calculator">Calculator</Link></li>
        <li><Link to="/comments">Comments</Link></li>
        <li><Link to="/game">Game</Link></li>
        <li><Link to="/topics">Topics</Link></li>
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
