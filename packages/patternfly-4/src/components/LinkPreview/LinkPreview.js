import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';
import Img from 'gatsby-image';
import './LinkPreview.scss';

const encodePath = path => path.replace('/v4', '')
  .replace(/\//g, '!')
  .replace(/\?/g, '!__')
  .replace(/\s/g, '_')
  .replace(/%20/g, '_');

const LinkPreview = ({ data, name, path }) => (
  <Location>
    {({ location }) => {
      let fileNameFromUrl = encodePath(path);
      if (fileNameFromUrl === path) {
        // It's a PF4 md page
        fileNameFromUrl = encodePath(location.pathname + path);
      }
      const previewScreenshot = data ? data.allFile.edges.filter(({ node }) => node.relativePath === `${fileNameFromUrl}.png`) : null;
      if (previewScreenshot && previewScreenshot.length > 0) {
        return (
          <div className="Preview__body">
            <a href={path} target="_blank" rel="noopener noreferrer">
              <div className="preview-container">
                <Img
                  fluid={previewScreenshot[0].node.childImageSharp.fluid}
                  alt={name}
                  className="preview-image"
                />
                <div className="preview-overlay">
                  <div className="preview-icon">
                    <i className="fas fa-external-link-alt"></i> 
                  </div>
                </div>
              </div>
            </a>
          </div>
        );
      } else {
        return (
          <div className="Preview__body">
            This Preview can only be accessed in&nbsp;
            <a href={path} target="_blank" rel="noopener noreferrer">
              full page mode
            </a>.
          </div>
        );
      }
    }
  }
  </Location>
);

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: {sourceInstanceName: {eq: "previews"}}) {
          edges {
            node {
              relativePath
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => <LinkPreview data={data} {...props} />}
  />
);