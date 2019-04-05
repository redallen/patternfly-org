const path = require("path");

exports.createPages = ({graphql, actions}) => {
  const templatePath = path.resolve('./src/templates/mdxTemplate.js');
  const sitemapData = graphql(`
    {
      allMdx {
        nodes {
          frontmatter {
            linkText
            path
          }
        }
      }
    }`);

  return sitemapData.then(({data}) => {
    // console.log('sitemap', data);
    data.allMdx.nodes
      .map(node => node.frontmatter)
      .filter(frontmatter => frontmatter.path)
      .forEach(frontmatter => {
        console.log('creating page', frontmatter.path);
        actions.createPage({
          path: frontmatter.path,
          component: templatePath,
          context: {
            title: frontmatter.linkText
          }
        });
      });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions, plugins, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@deps': path.resolve(__dirname, './deps'),
        '@static': path.resolve(__dirname, './static'),
      }
    },
  });
}