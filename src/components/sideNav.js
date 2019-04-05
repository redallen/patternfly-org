import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Location } from '@reach/router';
import { Nav, NavList, NavExpandable, NavItem } from '@patternfly/react-core';
import { getSlashCount } from '../helpers/nav';

const SiteNav = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        pathPrefix
      }
      allSitePage {
        nodes {
          path
          context {
            title
          }
        }
      }
    }`);

  const isActive = (path, curPath) => {
    return curPath === path || curPath === data.site.pathPrefix + path;
  };

  const getNavItem = (item, location) =>  (
    <NavItem key={item.path} isActive={isActive(item.path, location.pathname)} >
      <Link to={item.path}>{item.context.title}</Link>
    </NavItem>
  );

  const hasActiveLink = (navGroup, location) => {
    for (const item of navGroup) {
      if (isActive(item.path, location.pathname)) {
        return true;
      }
    }

    return false;
  };

  const getNavGroup = ([navGroupName, navGroup], location) => {
    if (navGroup.length === 1) {
      return getNavItem(navGroup[0], location);
    } else {
      const isActive = hasActiveLink(navGroup, location);
      return (
        <NavExpandable
          key={navGroupName}
          title={navGroupName}
          isActive={isActive}
          isExpanded={isActive}
          >
          {navGroup
            .sort((v1, v2) => v1.context.title.localeCompare(v2.context.title))
            .map(item => getNavItem(item, location))}
        </NavExpandable>
      );
    }
  };

  const isInSection = (node, location) => {
    const section = '/' + location.pathname.split('/')[1];
    return node.path.indexOf(section) !== -1;
  }

  return (
    <Nav aria-label="Nav">
      <NavList>
        <Location>
          {({ location }) => {
            const grouped = data.allSitePage.nodes
              .filter(node => getSlashCount(node.path) > 1)
              .filter(node => isInSection(node, location))
              .reduce((acc, node) => {
                const group = node.path.split('/')[2];
                acc[group] = acc[group] || [];
                acc[group].push(node);
                return acc;
              }, {});
            // console.log('grouped', grouped);
            return Object.entries(grouped)
              .sort(([k1, v1], [k2, v2]) => {
                if (v1.length === 1 && v2.length > 1) { // Group single items at bottom
                  return 1;
                } else if (v1.length > 1 && v2.length === 1) {
                  return -1;
                }
                return k1.localeCompare(k2)
              })
              .map(group => getNavGroup(group, location));
            }}
        </Location>
      </NavList>
    </Nav>
  );
}

export default SiteNav;
