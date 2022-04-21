// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import("@docusaurus/types").Config} */
const config = {
  title: "CyberConnect Dev Center",
  tagline: "Building the composable social graph protocol for Web3",
  url: "https://cyberconnecthq.github.io",
  baseUrl: "/cyberconnect-docs-v2/",
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
          editUrl: "https://github.com/cyberconnecthq/cyberconnect-docs-v2",
          routeBasePath: "/",
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), {sync: true}],
            math
          ],
          rehypePlugins: [katex],
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
    ({
      navbar: {
        title: "CyberConnect Dev Center",
        logo: {
          alt: "CyberConnect Logo",
          src: "img/logo-white.svg",
        },
        items: [],
      },
      footer: {
        style: "light",
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} CyberConnect.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
      },
      themeConfig: {
        metadata: [
          // Keywords
          { name: "keywords", content: "cyberconnect, protocol, social graph, blockchain, web3" },
          // OG
          { name: "og:title", content: "CyberConnect Developer Center" },
          {
            name: "og:description",
            content: "The comprehensive guide for CyberConnect protocol.",
          },
          { name: "og:type", content: "website" },
          { name: "og:url", content: "https://docs.cyberconnect.me/" },
          {
            name: "og:image",
            content: "https://cyberconnect.me/assets/logo-black.svg",
          },
          // Twitter
          { name: "twitter:title", content: "CyberConnect Developer Center" },
          {
            name: "twitter:description",
            content: "The comprehensive guide for CyberConnect protocol.",
          },
          { name: "twitter:card", content: "summary" },
          { name: "twitter:site", content: "@CyberConnectHQ" },
          {
            name: "twitter:image",
            content: "https://cyberconnect.me/assets/logo-black.svg",
          },
        ],
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
};

module.exports = config;
