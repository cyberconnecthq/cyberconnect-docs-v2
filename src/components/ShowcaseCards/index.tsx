import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import LinkSvg from "@site/static/img/v0.4.0/link.svg";
import Translate from "@docusaurus/Translate";

type ShowcaseItem = {
  title: string;
  srcPath: string;
  description: any;
  url: string;
  tags: Array<string>;
};

const ShowcaseList: ShowcaseItem[] = [
  {
    title: "Project Galaxy",
    srcPath: require("@site/static/img/v0.2.0/overview/projectgalaxy.png")
      .default,
    description: (
      <Translate description="showcase Project Galaxy">
        Project Galaxy is the largest web3 credential data network.
      </Translate>
    ),
    url: "https://galaxy.eco/",
    tags: ["identity"],
  },
  {
    title: "Light.so",
    srcPath: require("@site/static/img/v0.2.0/overview/light.jpg").default,
    description: (
      <Translate description="showcase Light.so">
        Light.so is a Metaverse Explorer enabling users to curate, discover, and
        explore meaningful interactions in a way that wasn't possible before.
      </Translate>
    ),

    url: "https://light.so/",
    tags: ["social"],
  },
  {
    title: "Grape.art",
    srcPath: require("@site/static/img/v0.2.0/overview/grape.png").default,
    description: (
      <Translate description="showcase Grape.art">
        Grape.art is a toolkit for building token-based communities on the
        Solana Blockchain.
      </Translate>
    ),
    url: "https://grape.art/",
    tags: ["NFT", "social"],
  },
  {
    title: "Hello World",
    srcPath: require("@site/static/img/v0.2.0/overview/helloworld.png").default,
    description: (
      <Translate description="showcase Hello World">
        Hello World is a web application enabling users to discover their social
        network on the Ethereum Blockchain.
      </Translate>
    ),
    url: "https://helloworld.social/",
    tags: ["social"],
  },
  {
    title: "Unipass",
    srcPath: require("@site/static/img/v0.2.0/overview/unipass.png").default,
    description: (
      <Translate description="showcase UniPass">
        UniPass is a multi-chain unified crypto identity—the carrier for the
        concept of 'people' in Metaverse.
      </Translate>
    ),
    url: "https://www.unipass.id/",
    tags: ["identity"],
  },
  {
    title: "Convo Space",
    srcPath: require("@site/static/img/v0.2.0/overview/convospace.png").default,
    description: (
      <Translate description="showcase Convo Space">
        Convo Space offers one-stop tooling and infrastructure to build social
        platforms composable across web3.
      </Translate>
    ),
    url: "https://theconvo.space/",
    tags: ["tool", "identity"],
  },
  {
    title: "Bress",
    srcPath: require("@site/static/img/v0.2.0/overview/bress.png").default,
    description: (
      <Translate description="showcase Bress.xyz">
        Bress.xyz is a decentralized social platform built on Mirror.xyz.
      </Translate>
    ),
    url: "https://bress.xyz/",
    tags: ["social"],
  },
  {
    title: "Etherloop",
    srcPath: require("@site/static/img/v0.2.0/overview/etherloop.jpg").default,
    description: (
      <Translate description="showcase Etherloop">
        Etherloop is a web app enabling users to build social connections and
        track tokens, balances, transactions, NFTs, and POAPs.
      </Translate>
    ),
    url: "https://etherloop.moonlabs.xyz/",
    tags: ["social"],
  },
  {
    title: "Reveal",
    srcPath: require("@site/static/img/v0.2.0/overview/reveal.png").default,
    description: (
      <Translate description="showcase Reveal">
        Reveal is a web3 social explorer to connect with people based on their
        on-chain activities.
      </Translate>
    ),
    url: "https://reveal.so/",
    tags: ["social"],
  },
  {
    title: "Treasureland",
    srcPath: require("@site/static/img/v0.2.0/overview/treasureland.png")
      .default,
    description: (
      <Translate description="showcase Treasureland">
        Treasureland is a cross-chain NFT platform for NFT issuance, trading,
        collection, and tailored in-shop services.
      </Translate>
    ),
    url: "https://treasureland.market/",
    tags: ["NFT"],
  },
  {
    title: "Metajam",
    srcPath: require("@site/static/img/v0.2.0/overview/metajam.png").default,
    description: (
      <Translate description="showcase Metajam">
        In Metajam, you can discover, fund, build web3 products, and JAM into
        the new paradigm.
      </Translate>
    ),
    url: "https://www.metajam.studio/",
    tags: ["social", "tool"],
  },
  {
    title: "NFTscan",
    srcPath: require("@site/static/img/v0.2.0/overview/nftscan.png").default,
    description: (
      <Translate description="showcase NFTSCAN">
        NFTSCAN is a professional NFT asset explorer and data open platform.
      </Translate>
    ),
    url: "https://www.nftscan.com/",
    tags: ["NFT", "tool"],
  },
];

function ShowcaseCard({
  title,
  srcPath,
  description,
  url,
  tags,
}: ShowcaseItem) {
  return (
    <div className={`card ${styles.showcaseCard}`}>
      <div className={styles.showcaseCardImg}>
        <img src={srcPath}></img>
      </div>
      <div className="cardTitle">
        <div>
          <div></div>
          <h3>{title}</h3>
        </div>
        <Link className="cardTitleLink" to={url}>
          <LinkSvg />
        </Link>
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.cardText}>{description}</div>
        <div className={styles.cardTags}>
          {tags.map((elem, idx) => (
            <div key={idx} datatype={elem} className={styles.cardTag}>
              {elem}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShowcaseCards(): JSX.Element {
  return (
    <div className={`cards ${styles.showcaseCards}`}>
      {ShowcaseList.map((props, idx) => (
        <ShowcaseCard key={idx} {...props} />
      ))}
    </div>
  );
}
