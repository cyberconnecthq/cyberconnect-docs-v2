import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import LinkSvg from '../../../static/img/docs/link.svg';

type ShowcaseItem = {
  title: string;
  srcPath: string;
  description: string;
  url: string;
};

const ShowcaseList: ShowcaseItem[] = [
  {
    title: 'Light.so',
    srcPath: require('@site/static/img/docs/get-inspired/light.jpg').default,
    description: 'Light is a Metaverse Explorer, enabling users to discover connections that was not possible before.',
    url: 'https://light.so/'
  },
  {
    title: 'Grape.art',
    srcPath: require('@site/static/img/docs/get-inspired/grape.png').default,
    description: 'Grape Protocol is a toolset for building token-based communities on Solana.',
    url: 'https://grape.art/'
  },
  {
    title: 'Hello World',
    srcPath: require('@site/static/img/docs/get-inspired/helloworld.png').default,
    description: 'Hello World is a social connection web application that allows users to discover their Ethereum network.',
    url: 'https://helloworld.social/'
  },
  {
    title: 'Etherloop',
    srcPath: require('@site/static/img/docs/get-inspired/etherloop.jpg').default,
    description: 'Etherloop is a social app that allows users to connect and track balances, tokens, transactions, POAPs and NFTs.',
    url: 'https://etherloop.moonlabs.xyz/'
  },
  {
    title: 'Galaxy ID',
    srcPath: require('@site/static/img/docs/get-inspired/projectgalaxy.png').default,
    description: 'Project Galaxy is the largest Web3 credential data network in the world.',
    url: 'https://galaxy.eco/'
  },
  {
    title: 'Unipass',
    srcPath: require('@site/static/img/docs/get-inspired/unipass.png').default,
    description: 'UniPass is a multi-chain unified crypto identity, the carrier for the concept of \'people\' in Metaverse.',
    url: 'https://www.unipass.id/'
  },
  {
    title: 'Treasureland',
    srcPath: require('@site/static/img/docs/get-inspired/treasureland.png').default,
    description: 'Treasureland is a cross-chain NFT platform for NFT issuance, NFT trading, NFT collections and tailored in-shop services.',
    url: 'https://treasureland.market/'
  },
  {
    title: 'Convo Space',
    srcPath: require('@site/static/img/docs/get-inspired/convospace.png').default,
    description: 'Convo offers all the Tooling and Infrastructure to build Social Platforms that are composable across the web, powered by Web3.',
    url: 'https://theconvo.space/'
  },
];

function ShowcaseCard({title, srcPath, description, url}: ShowcaseItem) {
  return (
    <div className={`card ${styles.showcaseCard}`}>
        <div className={styles.showcaseCardImg}>
          <img src={srcPath}></img>
        </div>
        <div>
          <div className={`cardTitle ${styles.showcaseCardTitle}`}>
            <div>{title}</div>
            <Link
              className='cardTitleLink'
              to={url}>
                <LinkSvg />
            </Link>
          </div>
        </div>
        <div className='cardDescription'>{description}</div>
    </div>
  );
}

export default function ShowcaseCards(): JSX.Element {
  return (
    <div className='cards'>
      {ShowcaseList.map((props, idx) => (
        <ShowcaseCard key={idx} {...props} />
      ))}
    </div>
  );
}
