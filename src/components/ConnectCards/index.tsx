import React from 'react';
import styles from './styles.module.css';
import ArrowUpwardSvg from '@site/static/img/v0.3.0/icons/connect/arrow_upward.svg';
import BookmarkSvg from '@site/static/img/v0.3.0/icons/connect/bookmark.svg';
import FlagSvg from '@site/static/img/v0.3.0/icons/connect/flag.svg';
import HowToRegSvg from '@site/static/img/v0.3.0/icons/connect/how_to_reg.svg';
import ThumbUpOffSvg from '@site/static/img/v0.3.0/icons/connect/thumb_up_off.svg';

type ConnectItem = {
  icon: any;
  title: string;
};

const ConnectList: ConnectItem[] = [
  {
    icon: <HowToRegSvg />,
    title: 'Follow',
  },
  {
    icon: <ThumbUpOffSvg />,
    title: 'Like',
  },
  {
    icon: <FlagSvg />,
    title: 'Report',
  },
  {
    icon: <BookmarkSvg />,
    title: 'Watch',
  },
  {
    icon: <ArrowUpwardSvg />,
    title: 'Vote',
  },
];

function ConnectCard({icon, title}: ConnectItem) {
  return (
    <div className={styles.connectCard}>
        <div className={styles.connectCardIcon}>{icon}</div>
        <h3>{title}</h3>
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
