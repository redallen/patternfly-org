import React from "react";
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import {
  PageSection,
  PageSectionVariants,
  TextContent
} from '@patternfly/react-core';
import { PatternFlyThemeProvider } from '@patternfly/react-styled-system';
import MDXRenderer from "gatsby-mdx/mdx-renderer";

const MarkdownPageTemplate = ({ data }) => {
  return (
    <Layout>
      <PageSection variant={PageSectionVariants.light}>
        <PatternFlyThemeProvider>
          <TextContent>
            <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
          </TextContent>
        </PatternFlyThemeProvider>
      </PageSection>
    </Layout>
  )
};

export const pageQuery = graphql`
query GetComponent($path: String!) {
  mdx(frontmatter: { path: { eq: $path } }) {
    code {
      body
    }
  }
}
`;

export default MarkdownPageTemplate;