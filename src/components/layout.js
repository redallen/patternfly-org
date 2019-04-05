import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import Footer from './footer/footer';
import {
  Brand,
  Page,
  PageHeader,
  PageSidebar,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Form,
  TextInput
} from '@patternfly/react-core';
import brandImg from '../../static/images/PatternFly_logo.svg';
import SEO from './seo';
import Header from './header';
import PageNav from './pageNav';
import SideNav from './sideNav';


class Layout extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-undef
    if (window.docsearch) {
      window.docsearch({
        apiKey: '06941733239da4f8617d272cf2ed4d5c',
        indexName: 'patternfly',
        inputSelector: '#global-search-input',
        debug: false // Set debug to true if you want to inspect the dropdown
      });
    } else {
      console.warn('Search has failed to load');
    }
  }

  onLogoClick = () => {
    navigate('/');
  }

  render() {
    const PageToolbar = (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            <Form className="ws-search" onSubmit={event => { event.preventDefault(); return false; }}>
              <TextInput
                    type="text"
                    id="global-search-input"
                    name="global-search-input"
                    placeholder="Search"
                  />
            </Form>
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );
    const sideNav = <SideNav />;
    const SiteHeader = (
      <PageHeader
        className="pf4-site-header"
        showNavToggle={sideNav !== null}
        logoProps={{onClick: this.onLogoClick}}
        logo={<Brand src={brandImg} alt="PatternFly Logo"/>}
        topNav={<PageNav />}
        toolbar={PageToolbar}
      />
    );

    return (
      <>
        <Header />
        <SEO title="Docs" keywords={['gatsby', 'application', 'react']} />
        <Page
          isManagedSidebar={sideNav !== null}
          header={SiteHeader}
          sidebar={sideNav ? <PageSidebar nav={sideNav} /> : null}>
          {this.props.children}
        </Page>
        <Footer />
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  sideNav: PropTypes.node,
  activeNavItem: PropTypes.number
}

Layout.defaultProps = {
  sideNav: null,
  activeNavItem: 0
};

export default Layout;
