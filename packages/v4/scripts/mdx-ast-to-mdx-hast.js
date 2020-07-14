const path = require('path');
const toHAST = require('mdast-util-to-hast');
const detab = require('detab');
const normalize = require('mdurl/encode');
const all = require('mdast-util-to-hast/lib/all');
const { parseJSXAttributes } = require('./jsxAttributes');

let srcCounter = 0;

function mdxAstToMdxHast() {
  
  return (tree, file) => {
    const srcImports = [];

    function imageHandler(h, node) {
      const srcImport = `srcImport${srcCounter++}`;
      const props = {
        src: srcImport,
        alt: node.alt
      };
      if (node.title !== null && node.title !== undefined) {
        props.title = node.title
      }
      // Add import statement
      srcImports.push({
        type: 'import',
        value: `import ${srcImport} from '${node.url.replace(/'/g, "\\'")}';`
      });
    
      return h(node, 'img', props);
    }

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
            Object.entries(parseJSXAttributes(`<Component ${node.meta} />`))
              .forEach(([key, val]) => {
                properties[key] = val;
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
        });
      },
      export(h, node) {
        return Object.assign({}, node, {
          type: 'export'
        });
      },
      comment(h, node) {
        return Object.assign({}, node, {
          type: 'comment'
        });
      },
      jsx(h, node) {
        // remark-mdx makes <img> tags JSX
        if (/<img/.test(node.value)) {
          Object.entries(parseJSXAttributes(node.value))
            .forEach(([key, val]) => {
              node[key] = val;
            });
          node.url = node.src;
          if (typeof node.url === 'string') {
            // Should have used JSX import but someone is expecting
            // a string to act like the md ![Alt](url "title") syntax
            return imageHandler(h, node);
          }
        }
        // BUT remark-mdx DOES NOT make <a> tags JSX so we don't have to worry about that here

        return Object.assign({}, node, {
          type: 'jsx'
        });
      },
      image(h, node) {
        return imageHandler(h, node);
      },
      link(h, node) {
        const href = normalize(node.href || node.url);

        const properties = {};
        if (node.title !== null && node.title !== undefined) {
          properties.title = node.title;
        }
  
        if (href && href.startsWith('/')) {
          properties.to = href;
          
          return Object.assign({}, node, {
            type: 'element',
            tagName: 'PatternflyThemeLink',
            properties,
            children: all(h, node)
          });
        }
  
        properties.href = href;
        return h(node, 'a', properties, all(h, node));
      }
    };

    const hast = toHAST(tree, {
      handlers,
      // Enable passing of HTML nodes to HAST as raw nodes
      allowDangerousHtml: true
    });

    hast.children.unshift(...srcImports);

    return hast;
  }
}

module.exports = mdxAstToMdxHast
