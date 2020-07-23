import React from 'react';
import { Router } from '@reach/router';
import { PageSection, SkipToContent, Title, Accordion, AccordionContent, AccordionItem, AccordionToggle } from '@patternfly/react-core';
import { PageLayout } from '../layouts';
import { AutoLinkHeader, CSSVariables, PropsTable, TableOfContents, Link } from '../components';
import './mdx.css';

const InlineAlert = ({
  title,
  variant = 'info',
  children
}) => (
  <Alert
    variant={variant}
    title={title}
    className="pf-u-my-md"
    style={{ marginBottom: '1rem' }}
    isInline
  >
    {children}
  </Alert>
);

export const MDXTemplate = ({
  location,
  title,
  layoutOptions,
  props = [],
  embeddedPages,
  path
}) => {
  // We splice this guy later
  embeddedPages = [...embeddedPages];
  const [expandedItems, setExpandedItems] = React.useState({});

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

  const cssPrefixes = embeddedPages.map(page => page.cssPrefix).filter(Boolean);

  const CSSVariablesSection = () => (
    <React.Fragment>
      <CSSVariables prefix={cssPrefixes} />
    </React.Fragment>
  );

  const designSnippetIndex = embeddedPages.findIndex(p => p.source === 'design-snippets');
  const DesignSnippet = designSnippetIndex >= 0
    ? embeddedPages.splice(designSnippetIndex, 1)[0].DocComponent
    : () => null;
  const isSinglePage = embeddedPages.length === 1;

  const toggleExpandedItem = itemName => {
    console.log('toggle', itemName);
    expandedItems[itemName] = !expandedItems[itemName];
    setExpandedItems(Object.assign({}, expandedItems));
  }

  return (
    <React.Fragment>
      <SkipToContent href="#main-content">Skip to Content</SkipToContent>
      <PageLayout
        location={location}
        {...layoutOptions}
      >
        <PageSection id="main-content" className="ws-section">
          <Title size="4xl" headingLevel="h1" className="ws-page-title">
            {title}
          </Title>
          {cssPrefixes.length > 0 && (
            <Accordion>
              <AccordionItem>
                <AccordionToggle
                  onClick={() => toggleExpandedItem('css-variables')}
                  isExpanded={expandedItems['css-variables']}
                >
                  CSS Variables
                </AccordionToggle>
                <AccordionContent isHidden={!expandedItems['css-variables']}>
                  <CSSVariablesSection />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          <DesignSnippet />
          {!isSinglePage && (
            <ul>
              {embeddedPages
                .map(({ slug, source }) => (
                  <li key={slug}>
                    <Link to={slug}>
                      {source}
                    </Link>
                  </li>
                ))
              }
            </ul>
          )}
          {/* Embedded route */}
          {/* https://reach.tech/router/example/embedded-routers */}
          <Router>
            {embeddedPages
              .map(({ DocComponent, slug: nestedSlug, propComponents, sourceLink, toc, optIn, beta, katacodaBroken }) => {
                if (propComponents && propComponents.length > 0) {
                  toc.push('Props');
                }
                // Create dynamic component for @reach/router
                const RoutedComponent = () => (
                  <React.Fragment>
                    {optIn && (
                      <InlineAlert title="Opt-in feature">
                        {optIn}
                      </InlineAlert>
                    )}
                    {beta && (
                      <InlineAlert title="Beta feature">
                        This Beta component is currently under review, so please join in and give us your feedback on the <a href="https://forum.patternfly.org/">PatternFly forum</a>.
                      </InlineAlert>
                    )}
                    {katacodaBroken && (
                      <InlineAlert variant="danger" title="Down for maintenance">
                        This Beta component is currently under review, so please join in and give us your feedback on the <a href="https://forum.patternfly.org/">PatternFly forum</a>.
                      </InlineAlert>
                    )}
                    {toc && <TableOfContents items={toc} />}
                    <DocComponent />
                    {sourceLink && (
                      <a href={sourceLink} target="_blank">View source on Github.</a>
                    )}
                  </React.Fragment>
                );
                RoutedComponent.displayName = `Routed${DocComponent.displayName}`;

                const nestedPath = nestedSlug.replace(path.substr(0, path.length - 1), '');
                return <RoutedComponent key={nestedPath} path={nestedPath} default={isSinglePage} />;
              })}
          </Router>
          {/* {props.length > 0 && <PropsSection />} */}
        </PageSection>
      </PageLayout>
    </React.Fragment>
  );
}
