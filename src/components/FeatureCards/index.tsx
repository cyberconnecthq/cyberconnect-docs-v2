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
    path: '/cyberconnect-sdk/connect-with-js-sdk/',
    description: 'Everything you need to write connection data into the open social graph.'
  },
  {
    title: 'Social Verifier',
    path: '/cyberconnect-sdk/connect-with-social-verifier/',
    description: 'Verify accounts from various social platforms.'
  },
  {
    title: 'NFT Ownership',
    path: '/get-started/read-nft-ownership/',
    description: 'Verify NFT ownership on the Ethereum blockchain.'
  },
  {
    title: 'CyberConnect API',
    path: '/cyberconnect-api/overview/',
    description: 'Everything you need to query connection data from the protocol.'
  },
  {
    title: 'Recommendation Engine',
    path: '/get-started/read-recommendations/',
    description: 'Accelerate bootstrapping by recommending connections based on the social graph.'
  },
];

function FeatureCard({title, path, description}: FeatureItem) {
  return (
    <div className={`card ${styles.featureCard}`}>
      <div className={`cardTitle ${styles.featureCardTitle}`}>
        <div>{title}</div>
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
