// Files we never care to pull data from
// matched by https://github.com/paulmillr/chokidar
const ignore = [
  `**/dist`,
  `**/helpers`,
  `**/scripts`,
  `**/styles`,
  `**/build`,
  `**/utils`,
  `**/test-helpers`,
  /.*react-styles.*/,
  /.*react-docs.*/,
  /.*react-integration.*/,
  `**/\..*`, // dotfiles
  `**/*\.d\.ts`,
  `**/*\.test\.*`,
  `**/index.ts`,
  `**/tsconfig*`,
  `**/tslint*`,
  `**/README*`,
  `**/CHANGELOG*`,
  /.*\.mdx?/, // md files in patternfly-next
];

module.exports = {
  pathPrefix: '/4.0',
  siteMetadata: {
    title: 'PatternFly 4',
    description: 'Documentation for PatternFly 4',
    author: 'Red Hat',
    siteUrl: 'https://v2.patternfly.org'
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mdx-pages`,
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `handlebars`,
        path: `${__dirname}/deps/patternfly-next/src/patternfly/demos/AboutModal`,
        ignore: ignore
      }
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.md', '.mdx'],
        // Temporarily disabled because is broken
        // gatsbyRemarkPlugins: [
        //   {
        //     resolve: `gatsby-remark-images`,
        //     options: {
        //       maxWidth: 700
        //     }
        //   }
        // ]
      }
    },
    // 'gatsby-plugin-catch-links', // catch links in markdown files and use gatsby-link to navigate
    'gatsby-plugin-react-helmet',
    // 'gatsby-plugin-sitemap',
    // 'gatsby-plugin-offline', // this plugin enables Progressive Web App + Offline functionality https://gatsby.app/offline
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: 'PatternFly',
    //     short_name: 'PatternFly',
    //     start_url: '/',
    //     background_color: '#663399',
    //     theme_color: '#663399',
    //     display: 'minimal-ui'
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-robots-txt',
    //   options: {
    //     host: 'https://v2.patternfly.org',
    //     sitemap: 'https://v2.patternfly.org/sitemap.xml',
    //     policy: [{ userAgent: '*', allow: '/' }]
    //   }
    // },
    // 'gatsby-plugin-sharp',
    // 'gatsby-transformer-sharp',
  ],
}
