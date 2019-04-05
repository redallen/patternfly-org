const path = require("path");

exports.createPages = ({graphql, actions}) => {
  const templatePath = path.resolve('./src/templates/markdownPageTemplate.js');
  const sitemapData = graphql(`
    {
      allMarkdownRemark {
        nodes {
          fileAbsolutePath
          frontmatter {
            linkText
            path
          }
        }
      }
    }`);

  return sitemapData.then(({data}) => {
    // console.log('sitemap', data);
    data.allMarkdownRemark.nodes
      .map(node => node.frontmatter)
      .filter(frontmatter => frontmatter.path)
      .forEach(frontmatter => {
        console.log('creating page', frontmatter.path);
        actions.createPage({
          path: frontmatter.path,
          component: templatePath,
          context: {
            title: frontmatter.linkText,
            path: frontmatter.path
          }
        });
      });
  });
}