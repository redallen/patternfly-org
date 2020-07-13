import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { HomePage, GetInTouchPage } from './pages/index';
import { MDXTemplate } from 'theme-patternfly-org/templates/mdx';
import * as pageIndex from './generated/index';
import * as LayoutOptions from '../patternfly-docs.config.js';
import '../patternfly-docs.css.js';

LayoutOptions.idPages = Object.values(pageIndex)
  .reduce((accum, pageData) => {
    const { section, id, slug } = pageData;
    accum[section] = accum[section] || {};
    accum[section][id] = accum[section][id] || {
      title: id,
      slug,
      pages: []
    };
    accum[section][id].pages.push(pageData);
    // Give shared sections a shared slug
    if (accum[section][id].pages.length > 1) {
      accum[section][id].slug = `/shared/${section}/${id.replace(/\s+/g, '-').toLowerCase()}`;
    }

    return accum;
  }, {});

function App() {
  return (
    <Router>
      <HomePage path="/" layoutOptions={LayoutOptions} />
      <GetInTouchPage path="/get-in-touch" layoutOptions={LayoutOptions} />
      {Object.values(LayoutOptions.idPages)
        .map(section => Object.values(section))
        .flat(1)
        .map(page => (
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
