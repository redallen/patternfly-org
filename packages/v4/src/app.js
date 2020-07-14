import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { HomePage, GetInTouchPage } from './pages/index';
import { MDXTemplate } from 'theme-patternfly-org/templates/mdx';
import * as pageIndex from './generated';
import * as LayoutOptions from '../patternfly-docs.config.js';
import '../patternfly-docs.css.js';

LayoutOptions.idPages = Object.values(pageIndex)
  .reduce((accum, pageData) => {
    const { section, id, slug, title } = pageData;
    accum[section] = accum[section] || {};
    accum[section][id] = accum[section][id] || {
      title,
      slug,
      pages: []
    };
    accum[section][id].pages.push(pageData);
    // Give shared sections a shared slug
    if (accum[section][id].pages.length > 1) {
      accum[section][id].slug = `/documentation/${section}/${id.replace(/\s+/g, '-').toLowerCase()}`;
    }

    return accum;
  }, {});

// Lone design snippets don't get a shared page
Object.values(LayoutOptions.idPages)
  .forEach(section => Object.entries(section).forEach(([key, val]) => {
    if (val.pages.length === 1 && val.pages[0].source === 'design-snippets') {
      delete section[key];
    }
  })
);

const groupedPages = Object.values(LayoutOptions.idPages)
  .map(section => Object.values(section))
  .flat(1);
  
console.log('groupedPages', groupedPages);

function App() {
  return (
    <Router>
      <HomePage path="/" layoutOptions={LayoutOptions} />
      <GetInTouchPage path="/get-in-touch" layoutOptions={LayoutOptions} />
      {groupedPages.map(({ title, slug, pages }) => (
        <MDXTemplate
          key={slug}
          path={slug + '/*'} 
          layoutOptions={LayoutOptions}
          embeddedPages={pages}
          title={title}
        />
      ))}
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
