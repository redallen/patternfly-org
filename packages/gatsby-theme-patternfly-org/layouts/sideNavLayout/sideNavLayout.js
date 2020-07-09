/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
import React, { useEffect, useState } from 'react';

import {
  Page,
  PageHeader,
  PageSidebar,
  PageHeaderTools,
  PageHeaderToolsItem,
  Form,
  TextInput,
  Brand,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownGroup,
  Divider
} from '@patternfly/react-core';
import { SearchIcon, ExternalLinkAltIcon } from '@patternfly/react-icons';
import { SideNav, TopNav,  Footer, GdprBanner } from '../../components';
import staticVersions from 'gatsby-theme-patternfly-org/versions.json';
import logo from '../logo.svg';
import './sideNavLayout.css';

export const SideNavLayout = ({
  children,
  location,
  context,
  parityComponent, // aboutmodal <=> aboutmodalbox
  hideSideNav = false,
  showGdprBanner = false,
  showFooter = false,
  pageTitle = '',
  topNavItems = []
}) => {
  // Put queries for Top and Side navs here for performance
  // We should consider passing down the `sitePlugin` data in pageContext
  // rather than fetching the GraphQL here
  const data = {};
  const { num, url } = { num: '0', url: 'github.com' };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [versions, setVersions] = useState({...staticVersions});
  const initialVersion = staticVersions.Releases.find(release => release.latest);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window.docsearch) {
      window.docsearch({
        apiKey: '06941733239da4f8617d272cf2ed4d5c',
        indexName: 'patternfly',
        inputSelector: '#global-search-input',
        debug: false // Set debug to true if you want to inspect the dropdown
      });
    }
    if (window.fetch && context === 'org') {
      fetch('/versions.json')
        .then(d => d.json())
        .then(json => setVersions(json))
        .catch(); // No big deal for core/react
    }
  }, []);

  const SideBar = hideSideNav
    ? undefined
    : <PageSidebar
        className="ws-page-sidebar"
        theme="light"
        nav={<SideNav
          location={location}
          context={context}
          pageSource={context}
          allPages={[]}
          parityComponent={parityComponent} />}
          />;

  const latestVersion = versions.Releases.find(version => version.latest);
  const dropdownToggle = (
    <DropdownToggle
      className={`ws-org-version-toggle${isDropdownOpen ? '-expanded': ''}`}
      onToggle={() => setDropdownOpen(!isDropdownOpen)}
    >
      Release {initialVersion.name}
    </DropdownToggle>
  );
  const getDropdownItem = version => (
    <DropdownItem
      key={version.name}
      component={
        <a href={location.pathname.replace(
            location.pathname.split('/')[1],
            version.latest ? 'v4' : version.name
          )}
        >
          {`Release ${version.name}`}
        </a>
      } />
  );
  const dropdownItems = [
    <DropdownGroup key="latest" label="Latest">
      {getDropdownItem(latestVersion)}
    </DropdownGroup>,
    <DropdownGroup key="Previous" label="Previous releases">
      {Object.values(versions.Releases)
        .filter(version => !version.hidden && !version.latest)
        .slice(0,3)
        .map(getDropdownItem)}
    </DropdownGroup>,
    <Divider key="divider" className="ws-switcher-divider"/>,
    <DropdownItem
      key="PatternFly 3"
      className="ws-patternfly-3"
      target="_blank"
      href="https://www.patternfly.org/v3"
    >
      PatternFly 3
      <ExternalLinkAltIcon />
    </DropdownItem>
  ];

  const PageTools = context === 'org'
    ? (
      <PageHeaderTools>
        <PageHeaderToolsItem>
          <Dropdown
            className="ws-org-version-switcher"
            onSelect={() => setDropdownOpen(!isDropdownOpen)}
            toggle={dropdownToggle}
            isOpen={isDropdownOpen}
            dropdownItems={dropdownItems}
          />
        </PageHeaderToolsItem>
        <PageHeaderToolsItem>
          {/* We can afford to use style tags because this is only on the site ONCE */}
          <Form
            onSubmit={event => {
              event.preventDefault();
              return false;
            }}
            style={{
              position: 'relative',
            }}
            className="pf-site-search"
          >
            <TextInput
              type="text"
              id="global-search-input"
              name="global-search-input"
              placeholder="Search"
              style={{
                color: '#fff',
                backgroundColor: 'var(--pf-global--BackgroundColor--dark-100)',
                border: 0,
                paddingLeft: '26px'
              }}
            />
            <SearchIcon
              style={{
                position: 'absolute',
                top: '10px',
                left: '4px'
              }} />
          </Form>
        </PageHeaderToolsItem>
      </PageHeaderTools>
    )
    : undefined;

  let headerTitle = '123';
  if (context === 'org') {
    headerTitle = <Brand src={logo} alt="Patternfly Logo" />;
  } else if (num) {
    headerTitle = `PR #${num}`;
  }
  
  const Header = (
    <PageHeader
      className="ws-page-header"
      headerTools={PageTools}
      logo={headerTitle}
      logoProps={{
        href: url || '/'
      }}
      showNavToggle={!hideSideNav}
      topNav={<TopNav
        location={location}
        context={context}
        navItems={topNavItems} />}
    />
  );

  // Wrap in a div to force scrolling the same content
  // TODO: SEO
  return (
    <div className="ws-side-nav-layout">
      <div id="ws-page-banners">
        {showGdprBanner && <GdprBanner />}
      </div>
      <Page isManagedSidebar header={Header} sidebar={SideBar} className="ws-page">
        {children}
      </Page>
      {showFooter && <Footer />}
    </div>
  );
}
