// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config();

const isDev = process.env.NODE_ENV === "development" ? true : false;

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import("@docusaurus/types").Config} */
const config = {
  title: "CyberConnect Dev Center",
  tagline: "Building the composable social graph protocol for Web3.",
  url: "https://docs.cyberconnect.me",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "cyberconnecthq",
  projectName: "cyberconnect-docs-v2",

  presets: [
    [
      "classic",
      /** @type {import("@docusaurus/preset-classic").Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: ({ docPath }) => {
            const nextVersionDocsDirPath = "docs";
            return `https://github.com/cyberconnecthq/cyberconnect-docs-v2/edit/main/${nextVersionDocsDirPath}/${docPath}`;
          },
          routeBasePath: "/",
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), {sync: true}],
            math
          ],
          rehypePlugins: [katex],
          includeCurrentVersion: isDev,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-9FMF2NF7NK",
          anonymizeIP: true,
        }
      }),
    ],
  ],
  plugins: [
    [
      require.resolve("@edno/docusaurus2-graphql-doc-generator"),
      {
        schema: "https://api.cybertino.io/connect/",
        rootPath: "./docs",
        baseURL: "/cyberconnect-api/reference/",
        linkRoot: "/",
        homepage: "./docs/cyberconnect-api/reference/graphql.md",
        loaders: {
          UrlLoader: "@graphql-tools/url-loader",
        },
        diffMethod: false // The method to be used for identifying changes in the schema for triggering the documentation generation. Set it to false to prevent from automatic updates.
      },
    ],
  ],
  themeConfig:
    /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
    ({
      navbar: {
        title: "",
        logo: {
          alt: "CyberConnect Logo",
          src: "img/logo-custom.svg",
        },
        items: [
          {
            type: "docsVersionDropdown",
            position: "right",
          },
          {
            href: "https://github.com/cyberconnecthq/",
            position: "right",
            className: "header-github-link",
            'aria-label': "GitHub repository",
          },
        ],
      },
      footer: {
        style: "light",
        links: [],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
      },
      metadata: [
        // Keywords
        { name: "keywords", content: "cyberconnect, protocol, social graph, blockchain, web3" },
        // OG
        { name: "og:title", content: "Developer Center | CyberConnect" },
        {
          name: "og:description",
          content: "Building the composable social graph protocol for Web3.",
        },
        { name: "og:type", content: "website" },
        { name: "og:url", content: "https://docs.cyberconnect.me/" },
        { name: "og:image", content: "/img/ogimage.png" },
        // Twitter
        { name: "twitter:title", content: "Developer Center | CyberConnect" },
        {
          name: "twitter:description",
          content: "Building the composable social graph protocol for Web3.",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@CyberConnectHQ" },
        { name: "twitter:image", content: "/img/ogimage.png" },
      ],
      algolia: {
        // The application ID provided by Algolia
        appId: process.env.ALGOLIA_APP_ID,
        // Public API key: it is safe to commit it
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        searchPagePath: 'search',
      },
    }),
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  scripts: [
    // Plausible.io script
    {
      src: "https://plausible.io/js/plausible.js",
      defer: true,
      "data-domain": "docs.cyberconnect.me"
    }
  ]
};

module.exports = config;
