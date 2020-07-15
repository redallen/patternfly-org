# patternfly-org-4

A React website for MD from `@patternfly/react-*` packages.

## Pre-build (scripts/parseMD.js)
1. Source MD
2. Transform MD into JSX using `unified()` and modified MDX code
  - Create metadata from frontmatter
```jsx
import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from 'theme-patternfly-org/components';


export const DocumentationComponentsAboutModalCoreDocs = {
  "slug": "/documentation/components/about-modal/core",
  "source": "core",
  "sourceLink": "https://github.com/patternfly/patternfly/blob/master/src/patternfly/components/AboutModalBox/examples/AboutModalBox.md",
  "section": "components",
  "id": "About modal",
  "title": "About modal box",
  "toc": [
    "Examples",
    "Documentation"
  ],
  "cssPrefix": "pf-c-about-modal-box"
};
DocumentationComponentsAboutModalCoreDocs.liveContext = {
  
};
```
  - Create MDX AST
  - Transform to JSX HAST (mdx-ast-to-mdx-hast.js)
    - Special care taken for code, image sources, comments, and links
  - Transform JSX HAST to JSX (mdx-hast-to-jsx.js)
    - Special care taken to style content and for imports
```jsx
DocumentationComponentsAboutModalCoreDocs.DocComponent = function DocumentationComponentsAboutModalCoreDocsDocComponent() {
  return (
    <React.Fragment>
      <AutoLinkHeader {...{"size":"h2","className":"ws-title ws-h2"}}>
        {`Examples`}
      </AutoLinkHeader>
      <Example {...DocumentationComponentsAboutModalCoreDocs} {...{"code":"<div class=\"pf-c-about-modal-box\">...</div>","title":"Basic","lang":"html","isFullscreen":true}}>
      </Example>
      {...}
    </React.Fragment>
  );
};
```
3. Save to `src/generated/${slug}`
4. Write index to `src/generated/index.js`

## Build (webpack.config.js + app.js)
1. Import index
2. Group pages by new `id` field
3. Each grouped page gets rendered using `<MDXTemplate>` and a route postpended with `/*`
4. Each grouped page gets subroutes rendered
