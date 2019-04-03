const path = require("path");

exports.createPages = ({graphql, actions}) => {
  const templatePath = path.resolve(`./src/templates/markdownTemplate.js`);
  const redirects = [
    { f: `/get-started`, t: `/get-started/about` },
    { f: `/design-guidelines`, t: `/design-guidelines/styles/icons` },
    { f: `/documentation`, t: `/documentation/react/components/aboutmodal` }
  ];
  redirects.forEach(({ f, t }) => {
    actions.createRedirect({
      fromPath: f,
      redirectInBrowser: true,
      toPath: t
    });
    // console.log('\nRedirecting: ' + f + ' to: ' + t);
  })

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

  return sitemapData.then(data => {
    console.log('im insane', data);
    data.nodes.filter(node => node.path).forEach(node => {
      console.log('creating page', node.path + '/');
      actions.createPage({path: node.path + '/', component: templatePath});
    });
  });
}