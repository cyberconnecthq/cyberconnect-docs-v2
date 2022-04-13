import React from 'react';
import styles from './styles.module.css';
import {
  CgProfile,
  CgFeed
} from 'react-icons/cg';
import {
  AiOutlineMessage,
  AiOutlineNotification,
  AiOutlineQuestionCircle,
  AiOutlineHeart
} from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import {
  GiRank1,
  GiParachute
} from 'react-icons/gi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import {
  BiGame,
  BiNetworkChart
} from 'react-icons/bi';
import { HiOutlineChartBar } from 'react-icons/hi';
import { MdOutlineHowToVote } from 'react-icons/md';

type UsecaseItem = {
  icon: any;
  title: string;
  description: string;
};

const UsecaseList: UsecaseItem[] = [
  {
    icon: <CgProfile />,
    title: 'Profile',
    description: 'Display your users\' decentralized identities.'
  },
  {
    icon: <AiOutlineMessage />,
    title: 'Messaging',
    description: 'Enable users to stay connected with friends.'
  },
  {
    icon: <AiOutlineNotification />,
    title: 'Notification',
    description: 'Keep followers updated.'
  },
  {
    icon: <BsSearch />,
    title: 'Search',
    description: 'Explore new connections.'
  },
  {
    icon: <AiOutlineQuestionCircle />,
    title: 'Recommendation',
    description: 'Recommend connections to accelerate bootstrapping.'
  },
  {
    icon: <CgFeed />,
    title: 'Feeds',
    description: 'Enable users to post and share content.'
  },
  {
    icon: <GiRank1 />,
    title: 'Reputation',
    description: 'Create a scoring system based on social networks.'
  },
  {
    icon: <RiMoneyDollarCircleLine />,
    title: 'Monetization',
    description: 'Monetize your influence in Metaverse.'
  },
  {
    icon: <AiOutlineHeart />,
    title: 'Fan community',
    description: 'Build your fandom.'
  },
  {
    icon: <BiGame />,
    title: 'Gamer matching',
    description: 'Play with friends and make friends when you play.'
  },
  {
    icon: <GiParachute />,
    title: 'Airdrop',
    description: 'Design fair drop mechanics based on social networks.'
  },
  {
    icon: <MdOutlineHowToVote />,
    title: 'DAO tooling',
    description: 'Tighten relationships between members for better coordination.'
  },
  {
    icon: <HiOutlineChartBar />,
    title: 'Data analytics',
    description: 'Analyze connections to boost value creation.'
  },
  {
    icon: <BiNetworkChart />,
    title: 'Visualization',
    description: 'See and cultivate your social graph.'
  },
];

function UsecaseCard({icon, title, description}: UsecaseItem) {
  return (
    <div className={`card ${styles.usecaseCard}`}>
        <div className={styles.usecaseCardIcon}>{icon}</div>
        <div className={styles.usecaseCardTitle}>{title}</div>
        <div>{description}</div>
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
