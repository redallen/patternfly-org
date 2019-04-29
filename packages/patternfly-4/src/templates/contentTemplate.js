import React from "react";
import { graphql, Link } from "gatsby";
import Layout from '../components/layout';
import SEO from '../components/seo';
import {
  Nav,
  NavItem,
  NavList,
  NavExpandable,
  PageSection,
  PageSectionVariants,
  TextContent
} from '@patternfly/react-core';
import { PatternFlyThemeProvider } from '@patternfly/react-styled-system';
import { Location } from '@reach/router';
import { MDXRenderer } from '../components/mdx-renderer';
import { MDXProvider } from '@mdx-js/react';
import AutoLinkHeader from '@content/AutoLinkHeader';
import './template.scss';

const components = {
  code: class LiveEditWrapper extends React.Component {
    render() {
      return (
        <LiveEdit scope={this.getScope()} id={'' + liveEditCount++} className={this.props.className}>
          {this.props.children}
        </LiveEdit>
      );
    }
  },
  pre: React.Fragment
};
for (let i = 1; i <= 6; i++) {
  components[`h${i}`] = props => <AutoLinkHeader className='ws-linked-heading' is={`h${i}`} {...props}>{props.children}</AutoLinkHeader>;
}

const navBuilder = navData => {
  return (
    <Location>
      {({ location }) => {
        // console.log(location);
        const currentPath = location.pathname;
        return (
          <Nav className="pf-site-md-nav" aria-label="Nav">
            <NavList>
              {navData.map(({ node }) => node.subNav ? (
                <NavExpandable key={node.text} title={node.text} isExpanded={currentPath.indexOf(node.path) > -1} isActive={currentPath.indexOf(node.path) > -1}>
                  {node.subNav.map(item => (
                    <NavItem
                      itemId={item.path}
                      key={item.path}
                      isActive={currentPath.indexOf(item.path) > -1}
                    >
                      <Link to={item.path}>
                        {item.text}
                      </Link>
                    </NavItem>
                  ))}
                </NavExpandable>
              ): (
                <NavItem
                  itemId={node.path}
                  key={node.path}
                  isActive={currentPath.indexOf(node.path) > -1}
                >
                  <Link to={node.path}>
                    {node.text}
                  </Link>
                </NavItem>
              ))}
            </NavList>
          </Nav>
        );
      }}
    </Location>
  );
};

export default function ContentTemplate ({
  data // this prop will be injected by the GraphQL query below.
}) {
  let SideNav;
  const { mdx, allGetStartedNavigationJson, allDesignGuidelinesNavigationJson } = data;
  const { frontmatter } = mdx;

  if (frontmatter.path.indexOf('/get-started') > -1 ) {
    SideNav = navBuilder(allGetStartedNavigationJson.edges);
  } else if (frontmatter.path.indexOf('/design-guidelines') > -1 ) {
    SideNav = navBuilder(allDesignGuidelinesNavigationJson.edges);
  }

  return (
    <Layout sideNav={SideNav}>
      <SEO title="Docs" keywords={['gatsby', 'application', 'react']} />
      <PageSection className="pageSectionStyles" variant={PageSectionVariants.light}>
        <PatternFlyThemeProvider>
          <TextContent>
            <MDXProvider components={components}>
              <MDXRenderer>
                {mdx.code.body}
              </MDXRenderer>
            </MDXProvider>
          </TextContent>
        </PatternFlyThemeProvider>
      </PageSection>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      code {
        body
      }
      frontmatter {
        path
      }
    }
    allGetStartedNavigationJson {
      edges {
        node {
          text
          path
        }
      }
    }
    allDesignGuidelinesNavigationJson {
      edges {
        node {
          text
          path
          subNav {
            text
            path
          }
        }
      }
    }
  }
`
