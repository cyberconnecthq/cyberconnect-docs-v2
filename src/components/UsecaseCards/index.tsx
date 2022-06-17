import React from "react";
import styles from "./styles.module.css";
import AccountCircleSvg from "@site/static/img/v0.4.0/icons/usecase/account_circle.svg";
import AssistantSvg from "@site/static/img/v0.4.0/icons/usecase/assistant.svg";
import SmsSvg from "@site/static/img/v0.4.0/icons/usecase/sms.svg";
import NotificationsSvg from "@site/static/img/v0.4.0/icons/usecase/notifications.svg";
import SearchSvg from "@site/static/img/v0.4.0/icons/usecase/search.svg";
import BallotSvg from "@site/static/img/v0.4.0/icons/usecase/ballot.svg";
import BeenhereSvg from "@site/static/img/v0.4.0/icons/usecase/beenhere.svg";
import MonetizationOnSvg from "@site/static/img/v0.4.0/icons/usecase/monetization_on.svg";
import FavoriteSvg from "@site/static/img/v0.4.0/icons/usecase/favorite.svg";
import SportsEsportsSvg from "@site/static/img/v0.4.0/icons/usecase/sports_esports.svg";
import IntersectSvg from "@site/static/img/v0.4.0/icons/usecase/intersect.svg";
import HowToVoteSvg from "@site/static/img/v0.4.0/icons/usecase/how_to_vote.svg";
import BarChartSvg from "@site/static/img/v0.4.0/icons/usecase/bar_chart.svg";
import ScatterPlotSvg from "@site/static/img/v0.4.0/icons/usecase/scatter_plot.svg";
import Translate from "@docusaurus/Translate";

type UsecaseItem = {
  icon: any;
  title: any;
  description: any;
};

const UsecaseList: UsecaseItem[] = [
  {
    icon: <AccountCircleSvg />,
    title: <Translate description="usercase profile">Profile</Translate>,
    description: (
      <Translate description="usercase profile description">
        Display your users\' decentralized identities.
      </Translate>
    ),
  },
  {
    icon: <SmsSvg />,
    title: <Translate description="usercase Messaging">Messaging</Translate>,
    description: (
      <Translate description="usercase Messaging description">
        Enable users to stay connected with friends.
      </Translate>
    ),
  },
  {
    icon: <NotificationsSvg />,
    title: (
      <Translate description="usercase Notification">Notification</Translate>
    ),
    description: (
      <Translate description="usercase Notification description">
        Keep followers updated.
      </Translate>
    ),
  },
  {
    icon: <SearchSvg />,
    title: <Translate description="usercase Search">Search</Translate>,
    description: (
      <Translate description="usercase Search description">
        Explore new connections.
      </Translate>
    ),
  },
  {
    icon: <AssistantSvg />,
    title: (
      <Translate description="usercase Recommendation">
        Recommendation
      </Translate>
    ),
    description: (
      <Translate description="usercase Recommendation description">
        Recommend connections to accelerate bootstrapping.
      </Translate>
    ),
  },
  {
    icon: <BallotSvg />,
    title: <Translate description="usercase Feeds">Feeds</Translate>,
    description: (
      <Translate description="usercase Feeds description">
        Enable users to post and share content.
      </Translate>
    ),
  },
  {
    icon: <BeenhereSvg />,
    title: <Translate description="usercase Reputation">Reputation</Translate>,
    description: (
      <Translate description="usercase Reputation description">
        Create a scoring system based on social networks.
      </Translate>
    ),
  },
  {
    icon: <MonetizationOnSvg />,
    title: (
      <Translate description="usercase Monetization">Monetization</Translate>
    ),
    description: (
      <Translate description="usercase Monetization description">
        Monetize your influence in Metaverse.
      </Translate>
    ),
  },
  {
    icon: <FavoriteSvg />,
    title: (
      <Translate description="usercase Fan community">Fan community</Translate>
    ),
    description: (
      <Translate description="usercase Fan community description">
        Build your fandom.
      </Translate>
    ),
  },
  {
    icon: <SportsEsportsSvg />,
    title: (
      <Translate description="usercase Gamer matching">
        Gamer matching
      </Translate>
    ),
    description: (
      <Translate description="usercase Gamer matching description">
        Play with friends and make friends when you play.
      </Translate>
    ),
  },
  {
    icon: <IntersectSvg />,
    title: <Translate description="usercase Airdrop">Airdrop</Translate>,
    description: (
      <Translate description="usercase Airdrop description">
        Design fair drop mechanics based on social networks.
      </Translate>
    ),
  },
  {
    icon: <HowToVoteSvg />,
    title: (
      <Translate description="usercase DAO tooling">DAO tooling</Translate>
    ),
    description: (
      <Translate description="usercase DAO tooling description">
        Tighten relationships between members for better coordination.
      </Translate>
    ),
  },
  {
    icon: <BarChartSvg />,
    title: (
      <Translate description="usercase Data analytics">
        Data analytics
      </Translate>
    ),
    description: (
      <Translate description="usercase Data analytics description">
        Analyze connections to boost value creation.
      </Translate>
    ),
  },
  {
    icon: <ScatterPlotSvg />,
    title: (
      <Translate description="usercase Visualization">Visualization</Translate>
    ),
    description: (
      <Translate description="usercase Visualization description">
        See and cultivate your social graph.
      </Translate>
    ),
  },
];

function UsecaseCard({ icon, title, description }: UsecaseItem) {
  return (
    <div className={styles.usecaseCard}>
      <div className={styles.usecaseCardIcon}>{icon}</div>
      <h3>{title}</h3>
      <div className={styles.usecaseDescription}>{description}</div>
    </div>
  );
}

export default function UsecaseCards(): JSX.Element {
  return (
    <div className={`cards ${styles.usecaseCards}`}>
      {UsecaseList.map((props, idx) => (
        <UsecaseCard key={idx} {...props} />
      ))}
    </div>
  );
}
