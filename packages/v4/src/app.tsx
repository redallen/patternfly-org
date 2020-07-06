import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import IndexPage from './pages/index';
import '@patternfly/react-docs/gatsby-browser';

function App() {
  return (
    <Router>
      <IndexPage path="/" />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
