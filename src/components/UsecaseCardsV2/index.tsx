import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import LinkSvg from "@site/static/img/v0.4.0/link.svg";
import Translate from "@docusaurus/Translate";
import { SiCrowdsource } from "react-icons/si";
import { BsPersonBadge } from "react-icons/bs";
import { BiNetworkChart } from "react-icons/bi";

type UsecaseItemV2 = {
  path: string;
  icon: any;
  title: any;
  description: any;
};

const UsecaseListV2: UsecaseItemV2[] = [
  {
    path: "/buildWithCyberConnect/#blogging-with-crowdfunding",
    icon: <SiCrowdsource />,
    title: <Translate description="usercase profile">Blogging with Crowdfunding</Translate>,
    description: (
      <Translate description="usercase blogging with crowdfunding description">
        Users can publish their data in NFT format on a chosen blockchain for monetization purposes.
      </Translate>
    ),
  },
  {
    path: "/buildWithCyberConnect/#sbtnft-issuing-platform",
    icon: <BsPersonBadge />,
    title: <Translate description="usercase profile">SBT/NFT issuing platform</Translate>,
    description: (
      <Translate description="usercase SBT/NFT issuing platform description">
        Utilize airdrops and tokens to attract early adopters, convert them to contributors and retain them through rewards like badges.
      </Translate>
    ),
  },
  {
    path: "/buildWithCyberConnect/#recommendation",
    icon: <BiNetworkChart />,
    title: <Translate description="usercase profile">Recommendation</Translate>,
    description: (
      <Translate description="usercase Recommendation description">
        Recommend people to follow based on users' relationships and social data from both off-chain and on-chain sources.
      </Translate>
    ),
  },
];

function UsecaseCard({ icon, title, description, path }: UsecaseItemV2) {
  return (
    <div className={styles.usecaseCardV2}>
      <Link className={styles.usecaseCardLinkV2} to={path}>
        <LinkSvg />
      </Link>
      <div className={styles.usecaseCardIconV2}>{icon}</div>
      <h3>{title}</h3>
      <div className={styles.usecaseDescriptionV2}>{description}</div>
    </div>
  );
}

export default function UsecaseCardsV2(): JSX.Element {
  return (
    <div className={`cards ${styles.usecaseCards}`}>
      {UsecaseListV2.map((props, idx) => (
        <UsecaseCard key={idx} {...props} />
      ))}
    </div>
  );
}
