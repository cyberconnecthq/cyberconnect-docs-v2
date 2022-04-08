import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import PatternSvg from '../../../static/img/docs/pattern.svg';
import LinkSvg from '../../../static/img/docs/link.svg';

type CardItem = {
  title: string;
  path: string,
  description: string;
};

const CardList: CardItem[] = [
  {
    title: 'CyberConnect SDK',
    path: "/cyberconnect-sdk/connect-with-sdk",
    description: 'Everything you need to write connection data into the open social graph.'
  },
  {
    title: 'Social Verifier',
    path: "/cyberconnect-sdk/cyberconnect-social-verifier",
    description: 'Verify accounts from various social platforms.'
  },
  {
    title: 'GraphQL API',
    path: "/graphql-api/overview",
    description: 'Everything you need to query connection data from the protocol.'
  },
];

function Card({title, path, description}: CardItem) {
  return (
    <div className={styles.cardItem}>
      <div className={styles.cardItemHead}>
        <div className={styles.cardItemSvg}>
          <PatternSvg />
        </div>
        <div className={styles.cardItemTitle}>
          <div>{`${title}`}</div>
          <Link
            className={styles.cardItemLink}
            to={path}>
            <LinkSvg />
          </Link>
        </div>
      </div>
      <div className={styles.cardItemDescription}>{description}</div>
    </div>
  );
}

export default function WelcomePageCards(): JSX.Element {
  return (
    <div className={styles.cards}>
      {CardList.map((props, idx) => (
        <Card key={idx} {...props} />
      ))}
    </div>
  );
}
