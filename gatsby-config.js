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
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-catch-links', // catch links in markdown files and use gatsby-link to navigate
    'gatsby-plugin-offline', // this plugin enables Progressive Web App + Offline functionality https://gatsby.app/offline
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://v2.patternfly.org',
        sitemap: 'https://v2.patternfly.org/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    // {
    //   resolve: `gatsby-mdx`,
    //   options: {
    //     extensions: ['.mdx'],
    //     defaultLayouts: {
    //       default: require.resolve("./src/templates/mdxPageTemplate.js")
    //     },
    //     gatsbyRemarkPlugins: [
    //       {
    //         resolve: `gatsby-remark-images`,
    //         options: {
    //           maxWidth: 700
    //         }
    //       }
    //     ]
    //   }
    // },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        importer: require('node-sass-glob-importer'),
        postCssPlugins: [],
        precision: 5
      }
    },
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
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
            }
          }
        ]
      }
    },
  ],
}
