import React from "react";
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import {
  PageSection,
  PageSectionVariants,
  TextContent
} from '@patternfly/react-core';
import { PatternFlyThemeProvider } from '@patternfly/react-styled-system';


const MarkdownPageTemplate = ({ data }) => {
  return (
    <Layout>
      <PageSection variant={PageSectionVariants.light}>
        <PatternFlyThemeProvider>
          <TextContent>
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
              />}
          </TextContent>
        </PatternFlyThemeProvider>
      </PageSection>
    </Layout>
  )
};

export const pageQuery = graphql`
query GetComponent($path: String!) {
  markdownRemark(frontmatter: { path: { eq: $path } }) {
    html
  }
}
`;

export default MarkdownPageTemplate;