import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { HomePage, GetInTouchPage } from './pages/index';
import { MDXTemplate } from 'theme-patternfly-org/templates/mdx';
import * as pageIndex from './generated/index';
import * as LayoutOptions from '../patternfly-docs.config.js';
import '../patternfly-docs.css.js';

const allPages = Object.values(pageIndex);
LayoutOptions.allPages = allPages;

function App() {
  return (
    <Router>
      <HomePage path="/" layoutOptions={LayoutOptions} />
      <GetInTouchPage path="/get-in-touch" layoutOptions={LayoutOptions} />
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
