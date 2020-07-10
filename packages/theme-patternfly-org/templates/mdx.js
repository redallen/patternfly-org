import React from 'react';
import {
  Alert,
  Badge,
  Card,
  CardTitle,
  CardBody,
  Grid,
  GridItem,
  PageSection,
  SkipToContent,
  Title
} from '@patternfly/react-core';
import { PageLayout } from '../layouts';
import { AutoLinkHeader, CSSVariables, PropsTable } from '../components';
import { slugger, capitalize} from '../helpers';
import versions from '../versions.json';
import './mdx.css';

export const MDXTemplate = ({
  location,
  cssPrefix,
  hideTOC,
  beta,
  optIn,
  releaseNoteTOC,
  katacodaBroken,
  title,
  toc = [],
  propComponents = [],
  sourceLink,
  DocComponent = () => null,
  layoutOptions,
  props = [],
  uri
}) => {
  // TODO: Stop hiding TOC in design pages
  const TableOfContents = () => (
    <React.Fragment>
      <Title size="4xl" headingLevel="h1" className="ws-page-title">
        {title}
      </Title>
      {optIn && (
        <Alert
          variant="info"
          title="Opt-in feature"
          className="pf-u-my-md"
          isInline
        >
          {optIn}
        </Alert>
      )}
      {!hideTOC && (
        <React.Fragment>
          {beta && (
            <Alert
              variant="info"
              title="Beta feature"
              className="pf-u-my-md"
              style={{ marginBottom: '1rem' }}
              isInline
            >
              This Beta component is currently under review, so please join in and give us your feedback on the <a href="https://forum.patternfly.org/">PatternFly forum</a>
            </Alert>
          )}
          {katacodaBroken && (
            <Alert
              variant="danger"
              title="Down for maintenance"
              className="pf-u-my-md"
              style={{ marginBottom: '1rem' }}
              isInline
            >
              We'll be up and running in a bit, so check back soon. Thanks!
            </Alert>
          )}
          {releaseNoteTOC && (
            <Grid hasGutter className="ws-release-notes-toc">
              {versions.Releases
                .filter(version => (
                  toc.some(header => header.includes(version.name))))
                .slice(0, 6)                         // limit to newest releases
                .map(version => {
                  const [year, month, day] = version.date.split('-');
                  const releaseDate = new Date(+year, +month - 1, +day)
                    .toLocaleDateString('us-EN', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  const releaseTitle = toc.find(heading => heading.includes(version.name));
                  return releaseTitle && (
                    <GridItem sm={6} md={4} key={version.name}>
                      <Card>
                        <CardTitle>
                          {releaseTitle && (
                            <Title size="2xl" headingLevel="h2" >
                              <a key={version.name} href={`#${slugger(releaseTitle)}`}>
                                Release {version.name}
                              </a>
                            </Title>
                          )}
                          {version.latest && (
                            <Badge>Latest</Badge>
                          )}
                        </CardTitle>
                        <CardBody>
                          Released on {releaseDate}.
                        </CardBody>
                      </Card>
                    </GridItem>
                  );
                })
              }
            </Grid>
          )}
          {!releaseNoteTOC && toc.map(heading => (
            <a key={heading} href={`#${slugger(heading)}`} className="ws-toc">
              {heading}
            </a>
          ))}
          {!releaseNoteTOC && props.length > 0 && (
            <a href="#props" className="ws-toc">
              Props
            </a>
          )}
          {!releaseNoteTOC && cssPrefix && (
            <a href="#css-variables" className="ws-toc">
              CSS Variables
            </a>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );

  const PropsSection = () => (
    <React.Fragment>
      <AutoLinkHeader headingLevel="h2" id="props" size="h2" className="ws-h2">
        Props
      </AutoLinkHeader>
      {props.map(component => (
        <PropsTable
          key={component.name}
          caption={`${component.name} properties`}
          rows={component.props} />
      ))}
    </React.Fragment>
  );

  const CSSVariablesSection = () => (
    <React.Fragment>
      <AutoLinkHeader headingLevel="h2" id="css-variables" size="h2" className="ws-h2">
        CSS Variables
      </AutoLinkHeader>
      <CSSVariables prefix={cssPrefix} />
    </React.Fragment>
  );

  const FeedbackSection = () => {
    const issueBody = encodeURIComponent(`\n\n\nProblem is in [this file.](${sourceLink})`);
    const issueLink = sourceLink.replace(/\/blob\/master\/.*/, `/issues/new?title=&body=${issueBody}`);

    return (
      <React.Fragment>
        <AutoLinkHeader headingLevel="h2" id="feedback" size="h2" className="ws-h2">
          Feedback
        </AutoLinkHeader>
        <a href={sourceLink} target="_blank">View page source on Github</a> / <a href={issueLink} target="_blank">Report an issue on Github</a>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <SkipToContent href="#main-content">Skip to Content</SkipToContent>
      <PageLayout
        location={location}
        {...layoutOptions}
      >
        <PageSection id="main-content" className="ws-section">
          <TableOfContents />
          <DocComponent />
          {/* {props.length > 0 && <PropsSection />} */}
          {/* {cssPrefix && <CSSVariablesSection />} */}
          {/* {sourceLink && <FeedbackSection />} */}
        </PageSection>
      </PageLayout>
    </React.Fragment>
  );
}
