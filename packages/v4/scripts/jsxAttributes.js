const acorn = require('acorn');
const jsx = require('acorn-jsx');
const jsxParser = acorn.Parser.extend(jsx());

module.exports = {
  parseJSXAttributes: jsx => {
    const properties = {};
    const jsxAttributes = jsxParser.parse(jsx)
      .body[0]
      .expression
      .openingElement
      .attributes;

    jsxAttributes.forEach(attr => {
      properties[attr.name.name] = attr.value ? attr.value.value : true;
    });

    return properties;
  }
}