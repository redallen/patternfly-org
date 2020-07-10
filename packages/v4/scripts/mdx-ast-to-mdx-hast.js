const path = require('path');
const toHAST = require('mdast-util-to-hast');
const detab = require('detab');
const acorn = require('acorn');
const jsx = require('acorn-jsx');
const all = require('mdast-util-to-hast/lib/all');

function mdxAstToMdxHast() {
  const jsxParser = acorn.Parser.extend(jsx());
  
  return (tree, file) => {
    const handlers = {
      // `inlineCode` gets passed as `code` by the HAST transform.
      // This makes sure it ends up being `inlineCode`
      inlineCode(h, node) {
        return Object.assign({}, node, {
          type: 'element',
          tagName: 'code',
          properties: {},
          children: [
            {
              type: 'text',
              value: node.value
            }
          ]
        });
      },
      code(h, node) {
        const properties = {
          code: node.value ? detab(node.value + '\n').trim() : '',
          title: node.title
        };
        
        if (node.lang) {
          properties.lang = node.lang;
        }

        if (node.meta) {
          try {
            const jsxAttributes = jsxParser.parse(`<Component ${node.meta} />`)
            .body[0]
            .expression
            .openingElement
            .attributes;

            jsxAttributes.forEach(attr => {
              properties[attr.name.name] = attr.value ? attr.value.value : true;
            }); 
          }
          catch(error) {
            const relPath = path.relative(process.cwd(), file.path);
            throw new Error(`Error parsing "${node.meta}" in file ${relPath}:\n${error}`);
          }
        }
        return Object.assign({}, node, {
          type: 'element',
          tagName: 'Example',
          properties,
          children: all(h, node)
        });
      },
      import(h, node) {
        return Object.assign({}, node, {
          type: 'import'
        })
      },
      export(h, node) {
        return Object.assign({}, node, {
          type: 'export'
        })
      },
      comment(h, node) {
        return Object.assign({}, node, {
          type: 'comment'
        })
      },
      jsx(h, node) {
        return Object.assign({}, node, {
          type: 'jsx'
        })
      }
    };

    const hast = toHAST(tree, {
      handlers,
      // Enable passing of HTML nodes to HAST as raw nodes
      allowDangerousHtml: true
    });


    return hast;
  }
}

module.exports = mdxAstToMdxHast
