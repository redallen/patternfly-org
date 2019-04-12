const path = require("path");

exports.createPages = ({graphql, actions}) => {
  const templatePath = path.resolve('./src/templates/mdxTemplate.js');
  const sitemapData = graphql(`
  query SiteMap {
    allMdx {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            linkText
            path
          }
        }
      }
    }
    allHBS: allFile(filter: { absolutePath: { glob: "**/patternfly-next/src/**/examples/index.js" } }) {
      edges {
        node {
          absolutePath
        }
      }
    }
  }`);

  return sitemapData.then(({data}) => {
    // console.log('sitemap', data);
    data.allMdx.edges
      .map(({node}) => node.frontmatter)
      .filter(frontmatter => frontmatter.path)
      .forEach(frontmatter => {
        console.log('creating mdx page', frontmatter.path);
        actions.createPage({
          path: frontmatter.path,
          component: templatePath,
          context: {
            title: frontmatter.linkText
          }
        });
      });
    
    data.allHBS.edges
      .map(({node}) => node.absolutePath)
      .filter(absolutePath => absolutePath)
      .forEach(absolutePath => {
        const split = absolutePath.split('/');
        const componenet = split[split.length - 3];
        const section = split[split.length - 4];
        const path = `/documentation/core/${section}/${componenet}`;

        console.log('creating hbs page', path);
        actions.createPage({
          path: path,
          component: absolutePath,
          context: {
            title: componenet
          }
        });
      });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions, plugins, getConfig }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.md$/,
          loader: 'html-loader!markdown-loader'
        },
        {
          test: /\.hbs$/,
          query: {
            extensions: '.hbs',
            helperDirs: path.resolve(__dirname, './deps/patternfly-next/build/helpers')
          },
          loader: 'handlebars-loader'
        }
      ]
    },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@deps': path.resolve(__dirname, './deps'),
        '@static': path.resolve(__dirname, './static'),
      }
    },
  });
}