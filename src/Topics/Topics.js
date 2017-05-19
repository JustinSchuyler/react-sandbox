import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom';

const Topic = ({ match }) => (
  <h3>{match.params.topicId}</h3>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/first`}>First</Link>
      </li>
      <li>
        <Link to={`${match.url}/second`}>Second</Link>
      </li>
      <li>
        <Link to={`${match.url}/third`}>Third</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => (
      <h3>Select a topic</h3>
    )} />
  </div>
);

export default Topics;
