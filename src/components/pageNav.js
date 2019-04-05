import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Location } from '@reach/router';
import {
  Nav,
  NavItem,
  NavList,
  NavVariants,
} from '@patternfly/react-core';
import { getSlashCount } from '../helpers/nav';

const PageNav = () => {
  const data = useStaticQuery(graphql`
    {
      allSitePage {
        nodes {
          path
          context {
            title
          }
        }
      }
    }`);
  const grouped = data.allSitePage.nodes
    .filter(node => getSlashCount(node.path) > 1)
    .reduce((acc, node) => {
      const group = node.path.split('/')[1];
      acc[group] = acc[group] || [];
      acc[group].push(node);
      return acc;
    }, {});

  return (
    <Location>
      {({ location }) =>  (
        <Nav aria-label="Nav">
          <NavList variant={NavVariants.horizontal}>
            {Object.entries(grouped).map(([key, sitePages]) => {
              const firstPage = sitePages
                .sort((a, b) => a.path.localeCompare(b.path))[0];
              return (
                <NavItem key={key} isActive={location.pathname.indexOf(key) !== -1}>
                  <Link to={firstPage.path}>{key.split('-').join(' ')}</Link>
                </NavItem>
              )
            })}
          </NavList>
        </Nav>
      )}
    </Location>
  );
};

export default PageNav;