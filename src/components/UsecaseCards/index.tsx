import React from 'react';
import styles from './styles.module.css';
import AccountCircleSvg from '@site/static/img/v0.4.0/icons/usecase/account_circle.svg';
import AssistantSvg from '@site/static/img/v0.4.0/icons/usecase/assistant.svg';
import SmsSvg from '@site/static/img/v0.4.0/icons/usecase/sms.svg';
import NotificationsSvg from '@site/static/img/v0.4.0/icons/usecase/notifications.svg';
import SearchSvg from '@site/static/img/v0.4.0/icons/usecase/search.svg';
import BallotSvg from '@site/static/img/v0.4.0/icons/usecase/ballot.svg';
import BeenhereSvg from '@site/static/img/v0.4.0/icons/usecase/beenhere.svg';
import MonetizationOnSvg from '@site/static/img/v0.4.0/icons/usecase/monetization_on.svg';
import FavoriteSvg from '@site/static/img/v0.4.0/icons/usecase/favorite.svg';
import SportsEsportsSvg from '@site/static/img/v0.4.0/icons/usecase/sports_esports.svg';
import IntersectSvg from '@site/static/img/v0.4.0/icons/usecase/intersect.svg';
import HowToVoteSvg from '@site/static/img/v0.4.0/icons/usecase/how_to_vote.svg';
import BarChartSvg from '@site/static/img/v0.4.0/icons/usecase/bar_chart.svg';
import ScatterPlotSvg from '@site/static/img/v0.4.0/icons/usecase/scatter_plot.svg';

type UsecaseItem = {
  icon: any;
  title: string;
  description: string;
};

const UsecaseList: UsecaseItem[] = [
  {
    icon: <AccountCircleSvg />,
    title: 'Profile',
    description: 'Display your users\' decentralized identities.'
  },
  {
    icon: <SmsSvg />,
    title: 'Messaging',
    description: 'Enable users to stay connected with friends.'
  },
  {
    icon: <NotificationsSvg />,
    title: 'Notification',
    description: 'Keep followers updated.'
  },
  {
    icon: <SearchSvg />,
    title: 'Search',
    description: 'Explore new connections.'
  },
  {
    icon: <AssistantSvg />,
    title: 'Recommendation',
    description: 'Recommend connections to accelerate bootstrapping.'
  },
  {
    icon: <BallotSvg />,
    title: 'Feeds',
    description: 'Enable users to post and share content.'
  },
  {
    icon: <BeenhereSvg />,
    title: 'Reputation',
    description: 'Create a scoring system based on social networks.'
  },
  {
    icon: <MonetizationOnSvg />,
    title: 'Monetization',
    description: 'Monetize your influence in Metaverse.'
  },
  {
    icon: <FavoriteSvg            />,
    title: 'Fan community',
    description: 'Build your fandom.'
  },
  {
    icon: <SportsEsportsSvg />,
    title: 'Gamer matching',
    description: 'Play with friends and make friends when you play.'
  },
  {
    icon: <IntersectSvg />,
    title: 'Airdrop',
    description: 'Design fair drop mechanics based on social networks.'
  },
  {
    icon: <HowToVoteSvg />,
    title: 'DAO tooling',
    description: 'Tighten relationships between members for better coordination.'
  },
  {
    icon: <BarChartSvg />,
    title: 'Data analytics',
    description: 'Analyze connections to boost value creation.'
  },
  {
    icon: <ScatterPlotSvg />,
    title: 'Visualization',
    description: 'See and cultivate your social graph.'
  },
];

function UsecaseCard({icon, title, description}: UsecaseItem) {
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
