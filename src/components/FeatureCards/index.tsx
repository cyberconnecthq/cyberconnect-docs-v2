import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
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
    title: 'CyberConnect API',
    path: '/cyberconnect-api/overview',
    description: 'Everything you need to query connection data from the protocol.'
  },
];

function FeatureCard({title, path, description}: FeatureItem) {
  return (
    <div className={`card ${styles.featureCard}`}>
      <div className={`cardTitle ${styles.featureCardTitle}`}>
        <div>{`${title}`}</div>
        <Link
          className='cardTitleLink'
          to={path}>
          <LinkSvg />
        </Link>
      </div>
      <div className='cardDescription'>{description}</div>
    </div>
  );
}

export default function FeatureCards(): JSX.Element {
  return (
    <div className='cards'>
      {FeatureList.map((props, idx) => (
        <FeatureCard key={idx} {...props} />
      ))}
    </div>
  );
}
