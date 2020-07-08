const path = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const graymatter = require('gray-matter');
const unified = require('unified')
const remove = require('unist-util-remove');
const { slugger } = require('gatsby-theme-patternfly-org/helpers/slugger');
const { extractTableOfContents } = require('gatsby-theme-patternfly-org/helpers/extractTableOfContents');
// var mdx = require('@mdx-js/mdx')
const visit = require('unist-util-visit');

const makeSlug = (source, section, componentName) => {
  let url = '';

  if (source !== 'pages') {
    url += '/documentation';
  }

  if (section) {
    url += `/${slugger(section)}`
  }

  url += `/${slugger(componentName)}`;

  return url;
}

const coreMdPath = require
  .resolve('@patternfly/patternfly/package.json')
  .replace('package.json', 'docs');

glob
  .sync(coreMdPath + '/**/AboutModalBox.md', { ignore: coreMdPath + '/pages/**' })
  .forEach(file => {
    const { data: frontmatter, content } = graymatter(fs.readFileSync(file, 'utf8'));

    if (!frontmatter) {
      console.log('No frontmatter', file);
      return;
    }

    const { section = 'components', title, hideTOC } = frontmatter;
    const componentName = path.basename(file, '.md');
    const slug = file.includes('pages')
      ? makeSlug('pages', null, componentName)
      : makeSlug('core', section, componentName);
    
    let toc = [];
    const mdx = unified()
      .use(require('remark-parse'))
      .use(require('remark-mdx'))
      .use(require('remark-footnotes'))
      .use(require('remark-squeeze-paragraphs'))
      .use(() => tree => {
        if (!hideTOC) {
          toc = extractTableOfContents(tree); // Create TOC
        }
      })
      // Render patternfly examples specially
      .use(() => tree => {
        visit(tree, 'code', (node, _index, parent) => {
          let title = 'Untitled example';
          let caption = [];

          // Starting from node, look up for h3s
          let startLooking = false;
          for(let i = parent.children.length - 1; i > 0; i--) {
            const child = parent.children[i];
            if (child === node) {
              startLooking = true;
            }
            else if (startLooking) {
              if (
                child.type === 'heading' &&
                child.depth === 3 &&
                child.children && 
                child.children[0].value
              ) {
                title = child.children[0].value;
                parent.children.splice(i, 1);
                break;
              }
              else {
                caption.unshift(child);
                parent.children.splice(i, 1);
              }
            }
          }

          node.title = title;
          node.children = caption;
        });
      })
      // .use(require('remark-rehype'))
      // .use(require('rehype-react'), { createElement: require('react').createElement })
      .use(require('@mdx-js/mdx/md-ast-to-mdx-ast')) // Create comment nodes
      .use(require('./mdx-ast-to-mdx-hast'))
      .use(() => tree => remove(tree, 'export')) // Don't allow exports
      .use(require('./mdx-hast-to-jsx'))
      // .use(require('@mdx-js/mdx/mdx-hast-to-jsx'))
      .processSync(content);

    console.log(file);

    const outputBase = path.join(__dirname, `../tmp/${slug}`);
    fs.outputFileSync(path.join(outputBase, 'content.js'), mdx);
    const pageData = {
      title,
      section,
      toc
    };
    fs.outputJSONSync(path.join(outputBase, 'page-data.json'), pageData, { spaces: 2 });
  });
