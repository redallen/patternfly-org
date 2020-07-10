import React from 'react';
import './fullscreen.css';

const FullscreenHTMLTemplate = ({ pageContext }) => {
  const { wrapperTag: WrapperTag, title, code } = pageContext;
  return (
    <WrapperTag className="ws-site-root">
      <div
        className="ws-fullscreen-example"
        dangerouslySetInnerHTML={{__html: code || 'No fullscreen example.'}} />
    </WrapperTag>
  );
}

export default FullscreenHTMLTemplate;
