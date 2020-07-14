const styleToObject = require('style-to-object');
const camelCaseCSS = require('camelcase-css');
const { toTemplateLiteral } = require('@mdx-js/util');
const acorn = require('acorn');
const jsx = require('acorn-jsx');
const { capitalize } = require('theme-patternfly-org/helpers/capitalize');

const styledMdTags = [
  'p',
  'ul',
  'ul',
  'ul',
  'ol',
  'li',
  'dl',
  'blockquote',
  'small',
  'hr',
  'dt',
  'code',
  'table',
  'img'
];
const jsxParser = acorn.Parser.extend(jsx());

function toJSX(node, parentNode = {}, options) {
  const { preserveNewlines = false, indent = 3, getRelPath, getPageData } = options;
  const pageData = {...getPageData()};
  let children = '';
  const exportName = pageData.slug.replace(/[\/-](.)?/g, (_, match) => capitalize(match)) + 'Docs';

  if (node.type === 'root') {
    const importNodes = [];
    const jsxNodes = [];

    for (const childNode of node.children) {
      if (childNode.type === 'import') {
        importNodes.push(childNode);
      }
      else {
        jsxNodes.push(childNode);
      }
    }

    const importStatements = importNodes
      .map(childNode => toJSX(childNode, node, options))
      .map(imp => imp.replace(/(['"])\./g, (_, match) => `${match}${getRelPath()}`))
      .join('\n');

    // https://astexplorer.net/#/gist/9c531dd372dfc57e194c13c2889d31c3/03f2d6e889db1a733c6a079554e8af7784863739
    const importSpecifiers = jsxParser.parse(importStatements, { sourceType: 'module' }).body
      .map(node => node.specifiers)
      .flat(1)
      .map(spec => spec.local ? spec.local.name : null)
      .filter(localName => !/srcImport\d+/.test(localName)) // Images in MD like [!img](./src)
      .filter(Boolean)
      .join(',\n  ');

    const childNodes = jsxNodes
      .map(childNode => toJSX(childNode, node, options))
      .join('');

    return `import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from 'theme-patternfly-org/components';
${importStatements}

export const ${exportName} = ${JSON.stringify(pageData, null, 2)};
${exportName}.liveContext = {
  ${importSpecifiers}
};
${exportName}.DocComponent = function ${exportName}DocComponent() {
  return (
    <React.Fragment>${childNodes.replace(/\n\s*\n/g, '\n')}
    </React.Fragment>
  );
};
`;
  }

  if (node.properties) {
    // Turn style strings into JSX-friendly style object
    if (typeof node.properties.style === 'string') {
      const styleObject = {};
      styleToObject(node.properties.style, (name, value) => styleObject[camelCaseCSS(name)] = value);
      node.properties.style = styleObject;
    }

    // Transform class property to JSX-friendly className
    if (node.properties.class) {
      node.properties.className = node.properties.class;
      delete node.properties.class;
    }
  }

  if (node.children) {
    // Tell all children inside <pre> tags to preserve newlines as text nodes
    children = node.children
      .map(childNode => toJSX(childNode, node, {
        ...options ,
        preserveNewlines: preserveNewlines || node.tagName === 'pre',
        indent: indent + 1
      }))
      .join('');
  }

  const indentText = '  '.repeat(indent);
  if (node.type === 'element') {
    // AutoLinkHeader
    if (node.tagName.match(/h\d/)) {
      node.properties.size = node.tagName;
      node.properties.className = node.properties.className || '';
      node.properties.className += node.properties.className ? ' ' : '';
      node.properties.className += `ws-title ws-${node.tagName}`;
      node.tagName = 'AutoLinkHeader';
    }
    // ws-* styles
    else if (styledMdTags.includes(node.tagName)) {
      node.properties.className = node.properties.className || '';
      node.properties.className += node.properties.className ? ' ' : '';
      node.properties.className += `ws-${node.tagName}`;
    }

    const srcImport = node.properties.src;
    if (node.tagName === 'img') {
      delete node.properties.src;
    }

    const props = node.properties && Object.keys(node.properties).length > 0 && JSON.stringify(node.properties);

    return `
${indentText}<${node.tagName}${node.tagName === 'Example' ? ` {...${exportName}}` : ''}${node.tagName === 'img' && srcImport ? ` src={${srcImport}}` : ''}${props ? ` {...${props}}` : ''}>
${indentText}  ${children}
${indentText}</${node.tagName}>`
  }

  // Wraps text nodes inside template string, so that we don't run into escaping issues.
  if (node.type === 'text') {
    // Don't wrap newlines unless specifically instructed to by the flag,
    // to avoid issues like React warnings caused by text nodes in tables.
    const shouldPreserveNewlines = preserveNewlines || parentNode.tagName === 'p';

    if (node.value === '\n' && !shouldPreserveNewlines) {
      return node.value;
    }

    return toTemplateLiteral(node.value);
  }

  if (node.type === 'comment') {
    return `{/*${node.value}*/}`;
  }

  if (node.type === 'import' || node.type === 'jsx') {
    return node.value;
  }
}

function compile(options) {
  this.Compiler = tree => toJSX(tree, {}, options);
}

module.exports = compile;
