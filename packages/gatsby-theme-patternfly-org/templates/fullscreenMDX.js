import React from 'react';
import { LiveProvider, LivePreview } from 'react-live';
import { useMDXScope } from 'gatsby-plugin-mdx/context';
import { transformCode } from '../helpers/transformCode';
import './fullscreen.css';

const FullscreenMDXTemplate = ({ pageContext }) => {
  const { wrapperTag: WrapperTag, title, code } = pageContext;
  return (
    <LiveProvider
      scope={useMDXScope()}
      code={code}
      transformCode={c => transformCode(c, 'jsx')}
    >
      <LivePreview Component={({ children }) => (
        <WrapperTag className="ws-site-root">
          {children}
        </WrapperTag>
      )} />
    </LiveProvider>
  );
}

export default FullscreenMDXTemplate;
