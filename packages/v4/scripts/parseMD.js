const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const unified = require('unified');
const remove = require('unist-util-remove');
const toVfile = require('to-vfile'); // https://github.com/vfile/vfile
const vfileReport = require('vfile-reporter');
const yaml = require('js-yaml'); // https://github.com/nodeca/js-yaml
const { slugger } = require('theme-patternfly-org/helpers/slugger');
const { extractTableOfContents } = require('theme-patternfly-org/helpers/extractTableOfContents');
// var mdx = require('@mdx-js/mdx')

const outputBase = path.join(__dirname, `../src/generated`);

const makeSlug = (source, section, componentName) => {
  let url = '';

  if (['react', 'core',].includes(source)) {
    url += `/documentation/${source}`;
  }
  else if (source === 'shared') {
    url += '/documentation';
  }
  else if (!source.includes('pages-')) {
    url += `/${source}`;
  }

  if (section) {
    url += `/${slugger(section)}`
  }

  url += `/${slugger(componentName)}`;

  return url;
}

function toReactComponent(mdFilePath, source) {
  // vfiles allow for nicer error messages and have native `unified` support
  const vfile = toVfile.readSync(mdFilePath);
  const componentName = vfile.stem.replace(/-/g, ''); // Name (without extension)

  const relPath = path.relative(process.cwd(), vfile.path);
  console.log(relPath);

  let outPath;
  let pageData = {};
  let frontmatter = {};
  let toc = [];

  const jsx = unified()
    .use(require('remark-parse'))
    .use(require('remark-frontmatter'), ['yaml'])
    // Extract frontmatter
    .use(() => tree => {
      const yamlNode = tree.children.shift();
      frontmatter = yaml.safeLoad(yamlNode.value);
      // Create TOC and pageData
      if (!frontmatter.hideTOC) {
        toc = extractTableOfContents(tree);
      }
      const slug = mdFilePath.includes('pages')
        ? makeSlug('pages', null, frontmatter.id || componentName)
        : makeSlug(source, frontmatter.section, frontmatter.id || componentName);

      outPath = path.join(outputBase, `${slug}.js`);
      // const props = propComponents
      //   .filter(name => name !== '') // Filter default entry we make for GraphQL schema
      //   .map(name => {
      //     const propTable = data.props.nodes.find(node => node.name === name);
      //     if (!propTable) {
      //       console.warn(`PropComponent "${name}" specified in frontmatter, but not found at runtime.`);
      //     }

      //     return propTable;
      //   })
      //   .filter(Boolean);
      pageData = {
        slug,
        source,
        section: frontmatter.section || 'components',
        id: frontmatter.id,
        title: frontmatter.title,
        toc,
        componentName
      };
    })
    // Not entirely sure what this does, but needed for mdx-ast-to-mdx-hast
    .use(require('remark-mdx'))
    // Insert footnotes
    .use(require('remark-footnotes'))
    // Remove whitespace
    .use(require('remark-squeeze-paragraphs'))
    // Support example captions
    .use(require('./example-captions'))
    // .use(require('remark-rehype'))
    // .use(require('rehype-react'), { createElement: require('react').createElement })
    // Create comment nodes
    .use(require('@mdx-js/mdx/md-ast-to-mdx-ast'))
    // Transform AST to JSX elements. Includes special code block parsing
    .use(require('./mdx-ast-to-mdx-hast'))
    // Don't allow exports
    .use(() => tree => remove(tree, 'export'))
    // Transform HAST object to JSX string, 
    .use(require('./mdx-hast-to-jsx'), {
      getRelPath: () => path.relative(path.dirname(outPath), vfile.dirname), // for imports
      getPageData: () => pageData // For @reach/router routing
    })
    // .use(require('@mdx-js/mdx/mdx-hast-to-jsx'))
    .processSync(vfile, function(err, file) {
      console.log('errorz');
      console.error(vfileReport(err || file))
    });

  return {
    jsx,
    outPath
  };
}

function parseMD() {
  const index = [];
  
  function sourceMD(files, source) {
  
    files.forEach(file => {
      const { jsx, outPath } = toReactComponent(file, source);
  
      fs.outputFileSync(outPath, jsx);
      index.push(path.relative(outputBase, outPath));
    });
  }
  
  // Source org md
  sourceMD(
    glob.sync(path.join(__dirname, '../src/content/contribute/**/*.md')),
    'pages-contribute'
  );
  
  sourceMD(
    glob.sync(path.join(__dirname, '../src/content/get-started/**/*.md')),
    'pages-get-started'
  );
  
  // Source core md
  const coreMDPath = require
    .resolve('@patternfly/patternfly/package.json')
    .replace('package.json', 'docs');
  
  sourceMD(
    glob.sync(path.join(coreMDPath, '/**/*.md'), { ignore: path.join(coreMDPath, '/pages/**') }),
    'core'
  );

  // Source react md
  const reactMDPath = require
    .resolve('@patternfly/react-core/package.json')
    .replace('package.json', 'src');
  
  sourceMD(
    glob.sync(path.join(reactMDPath, '/**/*.md')),
    'react'
  );

  const reactTableMDPath = require
    .resolve('@patternfly/react-table/package.json')
    .replace('package.json', 'src');
  
  sourceMD(
    glob.sync(path.join(reactTableMDPath, '/**/*.md')),
    'react'
  );

  const indexContent = index.map(file => `export * from './${file}';`).join('\n');
  fs.outputFileSync(path.join(outputBase, 'index.js'), indexContent);
}

parseMD();
