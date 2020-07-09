import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import IndexPage from './pages/index';
import MDXTemplate from 'gatsby-theme-patternfly-org/templates/mdx';
import * as corePages from './generated/index-core';
import '@patternfly/react-docs/gatsby-browser';

function App() {
  return (
    <Router>
      <IndexPage path="/" />
      {Object.values(corePages).map(page => (
        <MDXTemplate {...page} key={page.slug} path={page.slug} />
      ))}
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
