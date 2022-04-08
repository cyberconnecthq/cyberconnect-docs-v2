import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import PatternSvg from '../../../static/img/docs/pattern.svg';
import LinkSvg from '../../../static/img/docs/link.svg';

type FeatureItem = {
  title: string;
  path: string;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'CyberConnect SDK',
    path: '/cyberconnect-sdk/connect-with-sdk',
    description: 'Everything you need to write connection data into the open social graph.'
  },
  {
    title: 'Social Verifier',
    path: '/cyberconnect-sdk/cyberconnect-social-verifier',
    description: 'Verify accounts from various social platforms.'
  },
  {
    title: 'GraphQL API',
    path: '/graphql-api/overview',
    description: 'Everything you need to query connection data from the protocol.'
  },
];

function FeatureCard({title, path, description}: FeatureItem) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureCardHead}>
        <div className={styles.featureCardSvg}>
          <PatternSvg />
        </div>
        <div className={styles.featureCardTitle}>
          <div>{`${title}`}</div>
          <Link
            className={styles.featureCardLink}
            to={path}>
            <LinkSvg />
          </Link>
        </div>
      </div>
      <div className={styles.featureCardDescription}>{description}</div>
    </div>
  );
}

export default function FeatureCards(): JSX.Element {
  return (
    <div className={styles.featureCards}>
      {FeatureList.map((props, idx) => (
        <FeatureCard key={idx} {...props} />
      ))}
    </div>
  );
}
