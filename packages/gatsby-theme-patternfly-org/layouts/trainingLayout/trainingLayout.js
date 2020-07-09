/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
import React from 'react';

import { Page, PageHeader, Brand, Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import logo from '../logo.svg';

export const TrainingLayout = ({ trainingType, katacodaId, location }) => {
  const data = {};
  const title = '1234';
  const { num, url } = { num: 0, url: 'github.com' };
  const context = 'org';
  const fileName = trainingType + '/' + katacodaId;

  let headerTitle = title;
  if (context === 'org') {
    headerTitle = <Brand src={logo} alt="Patternfly Logo" />;
  } else if (num) {
    headerTitle = `PR #${num}`;
  }

  // TODO: use location
  const Breadcrumbs = (
    <Breadcrumb>
      <BreadcrumbItem to="#">{trainingType}</BreadcrumbItem>
      <BreadcrumbItem to="#" isActive>
        {katacodaId}
      </BreadcrumbItem>
    </Breadcrumb>
  );
  
  const Header = (
    <PageHeader
      logo={headerTitle}
      logoProps={{
        href: url || '/'
      }}
      showNavToggle
      headerTools={Breadcrumbs}
    />
  );

  // Wrap in a div to force scrolling the same content
  // TODO: Extract SEO to component
  return (
    <div>
      {/* <script src="//katacoda.com/embed.js"></script> */}
      <Page header={Header} style={{ height: '100vh' }}>
        <div id="katacoda-scenario-1"
          data-katacoda-id={'patternfly/courses/' + fileName}
          data-katacoda-color="004d7f"
          style={{ height: '100%'}} />
      </Page>
    </div>
  );
}
