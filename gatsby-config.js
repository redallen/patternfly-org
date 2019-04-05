// Files we never care to pull data from
const ignore = [
  `**/dist/**`,
  `**/*.d.ts`,
  `**/*.test.*`,
  `**/index.*`,
  `**/helpers/**`,
  `**/scripts/**`,
  `**/styles/**`,
  `**/build/**`,
  `**/utils/**`,
  `**/test-helpers/**`,
  `**/\.*`,
  `**/\..*/**`,
  `**/tsconfig.*`,
  `**/tslint.*`,
  `**/README.*`,
  `**/CHANGELOG.*`,
  `**/react\-docs/**`,
  `**/react\-styles/**`,
  `**/react\-integration/**`,
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
        name: `markdown-pages`,
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.md', '.mdx'],
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
    'gatsby-plugin-catch-links', // catch links in markdown files and use gatsby-link to navigate
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline', // this plugin enables Progressive Web App + Offline functionality https://gatsby.app/offline
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'PatternFly',
        short_name: 'PatternFly',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui'
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://v2.patternfly.org',
        sitemap: 'https://v2.patternfly.org/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        importer: require('node-sass-glob-importer'),
        postCssPlugins: [],
        precision: 5
      }
    },
    // 'gatsby-plugin-sharp',
    // 'gatsby-transformer-sharp',
  ],
}
