import React from 'react';
import { Link } from '@reach/router';
import { Nav, NavList, NavExpandable } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import { slugger, capitalize } from '../../helpers';
import './sideNav.css';

const renderNavItem = ({ text, href }) => {
  return (
    <li key={href} className="pf-c-nav__item">
      <Link
        to={href}
        getProps={({ isCurrent }) => ({
          className: css(
            'pf-c-nav__link',
            isCurrent && 'pf-m-current'
          )
        })}
      >
        {text}
      </Link>
    </li>
  );
}

export const SideNav = ({
  location,
  sideNav,
  allPages
}) => {
  const allNavItems = allPages.reduce((accum, { section, title, slug }) => {
    accum[section] = accum[section] || [];
    accum[section].push({
      text: title,
      href: slug
    });

    return accum;
  }, {});

  return (
    <React.Fragment>
      <Nav aria-label="Side Nav" theme="light">
        <NavList className="ws-side-nav-list">
          {sideNav.map(({ section, text, href }) => {
            if (!section) {
              // Single nav item
              return renderNavItem({
                text: text || capitalize(href.replace(/\//g, '').replace(/-+/g, ' ')),
                href
              });
            }
            else if (section && allNavItems[section]) {
              const isActive = location.pathname.includes(`/${slugger(section)}/`);
              return (
                <NavExpandable
                  key={section}
                  title={capitalize(section)}
                  isActive={isActive}
                  isExpanded={isActive}
                  className="ws-side-nav-group"
                >
                  {allNavItems[section].map(renderNavItem)}
                </NavExpandable>
              );
            }
          })}
        </NavList>
      </Nav>
    </React.Fragment>
  );
}
