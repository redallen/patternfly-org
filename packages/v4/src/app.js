import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link } from '@reach/router';
import IndexPage from './pages/index';
import { MDXTemplate } from 'theme-patternfly-org/templates/mdx';
import * as corePages from './generated/index-core';
import * as LayoutOptions from '../patternfly-docs.config.js';
import '../patternfly-docs.css.js';

const allPages = Object.values(corePages);
LayoutOptions.allPages = allPages;

function App() {
  return (
    <Router>
      <IndexPage path="/" />
      {allPages.map(page => (
        <MDXTemplate
          key={page.slug}
          path={page.slug} 
          layoutOptions={LayoutOptions}
          {...page}
        />
      ))}
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
