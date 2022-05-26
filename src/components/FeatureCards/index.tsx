import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import LinkSvg from "@site/static/img/v0.4.0/link.svg";
import Translate from "@docusaurus/Translate";

type FeatureItem = {
  title: string;
  path: string;
  description: any;
};

const FeatureList: FeatureItem[] = [
  {
    title: "CyberConnect SDK",
    path: "/cyberconnect-sdk/connect-with-js-sdk/",
    description: (
      <Translate description="feature item CyberConnect SDK">
        Everything you need to write connection data into the open social graph.
      </Translate>
    ),
  },
  {
    title: "Social Verifier",
    path: "/cyberconnect-sdk/connect-with-social-verifier/",
    description: (
      <Translate description="feature item Social Verifier">
        Verify accounts from various social platforms.
      </Translate>
    ),
  },
  {
    title: "NFT Ownership",
    path: "/get-started/read-nft-ownership/",
    description: (
      <Translate description="feature item NFT Ownership">
        Verify NFT ownership on the Ethereum blockchain.
      </Translate>
    ),
  },
  {
    title: "CyberConnect API",
    path: "/cyberconnect-api/overview/",
    description: (
      <Translate description="feature item CyberConnect API">
        Everything you need to query connection data from the protocol.
      </Translate>
    ),
  },
  {
    title: "Recommendation Engine",
    path: "/get-started/read-recommendations/",
    description: (
      <Translate description="feature item Recommendation Engine">
        Accelerate bootstrapping by recommending connections based on the social
        graph.
      </Translate>
    ),
  },
];

function FeatureCard({ title, path, description }: FeatureItem) {
  return (
    <div className={`card ${styles.featureCard}`}>
      <div className="cardTitle">
        <div>
          <div></div>
          <h3>{title}</h3>
        </div>
        <Link className="cardTitleLink" to={path}>
          <LinkSvg />
        </Link>
      </div>
      <div className="cardDescription">{description}</div>
    </div>
  );
}

export default function FeatureCards(): JSX.Element {
  return (
    <div className="cards">
      {FeatureList.map((props, idx) => (
        <FeatureCard key={idx} {...props} />
      ))}
    </div>
  );
}
