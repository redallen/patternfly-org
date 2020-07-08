const styleToObject = require('style-to-object');
const camelCaseCSS = require('camelcase-css');
const { toTemplateLiteral } = require('@mdx-js/util')

function toJSX(node, parentNode = {}, options = {}) {
  const { preserveNewlines = false } = options;
  let children = '';

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
      .map(childNode => toJSX(childNode, node))
      .join('\n');

    const componentStatement = `export default props => (
  <React.Fragment>
    ${jsxNodes.map(childNode => toJSX(childNode, node)).join('')}
  </React.Fragment>)`;

    return `${importStatements}\n${componentStatement}`;
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
        preserveNewlines: preserveNewlines || node.tagName === 'pre',
        ...options 
      }))
      .join('');
  }

  if (node.type === 'element') {
    const props = node.properties && Object.keys(node.properties).length > 0 && JSON.stringify(node.properties);

    return `<${node.tagName}${props ? ` {...${props}}` : ''}>${children}</${node.tagName}>`
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

function compile(options = {}) {
  this.Compiler = tree => toJSX(tree, {}, options);
}

module.exports = compile;
