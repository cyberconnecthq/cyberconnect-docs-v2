import React from 'react';
import styles from './styles.module.css';
import { FiFlag } from 'react-icons/fi';
import { RiUserFollowLine } from 'react-icons/ri';
import { BiLike, BiUpvote } from 'react-icons/bi';
import { BsBookmark } from 'react-icons/bs';

type ConnectItem = {
  icon: any;
  title: string;
};

const ConnectList: ConnectItem[] = [
  {
    icon: <RiUserFollowLine />,
    title: 'Follow',
  },
  {
    icon: <BiLike />,
    title: 'Like',
  },
  {
    icon: <FiFlag />,
    title: 'Report',
  },
  {
    icon: <BsBookmark />,
    title: 'Watch',
  },
  {
    icon: <BiUpvote />,
    title: 'Vote',
  },
];

function ConnectCard({icon, title}: ConnectItem) {
  return (
    <div className={`card ${styles.connectCard}`}>
        <div className={styles.connectCardIcon}>{icon}</div>
        <div className={styles.connectCardTitle}>{title}</div>
    </div>
  );
}

export default function ConnectCards(): JSX.Element {
  return (
    <div className={`cards ${styles.connectCards}`}>
      {ConnectList.map((props, idx) => (
        <ConnectCard key={idx} {...props} />
      ))}
    </div>
  );
}
