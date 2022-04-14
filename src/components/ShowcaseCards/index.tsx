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
    description: 'Light.so is a Metaverse Explorer enabling users to curate, discover, and explore meaningful interactions in a way that was not possible before.',
    url: 'https://light.so/'
  },
  {
    title: 'Grape.art',
    srcPath: require('@site/static/img/docs/get-inspired/grape.png').default,
    description: 'Grape.art is a toolkit for building token-based communities on the Solana Blockchain.',
    url: 'https://grape.art/'
  },
  {
    title: 'Hello World',
    srcPath: require('@site/static/img/docs/get-inspired/helloworld.png').default,
    description: 'Hello World is a web application enabling users to discover their social network on the Ethereum Blockchain.',
    url: 'https://helloworld.social/'
  },
  {
    title: 'Etherloop',
    srcPath: require('@site/static/img/docs/get-inspired/etherloop.jpg').default,
    description: 'Etherloop is a web app enabling users to build social connections and track tokens, balances, transactions, NFTs, and POAPs.',
    url: 'https://etherloop.moonlabs.xyz/'
  },
  {
    title: 'Galaxy ID',
    srcPath: require('@site/static/img/docs/get-inspired/projectgalaxy.png').default,
    description: 'Project Galaxy is the largest web3 credential data network.',
    url: 'https://galaxy.eco/'
  },
  {
    title: 'Unipass',
    srcPath: require('@site/static/img/docs/get-inspired/unipass.png').default,
    description: 'UniPass is a multi-chain unified crypto identity—the carrier for the concept of \'people\' in Metaverse.',
    url: 'https://www.unipass.id/'
  },
  {
    title: 'Treasureland',
    srcPath: require('@site/static/img/docs/get-inspired/treasureland.png').default,
    description: 'Treasureland is a cross-chain NFT platform for NFT issuance, trading, collection, and tailored in-shop services.',
    url: 'https://treasureland.market/'
  },
  {
    title: 'Convo Space',
    srcPath: require('@site/static/img/docs/get-inspired/convospace.png').default,
    description: 'Convo Space offers one-stop tooling and infrastructure to build social platforms composable across web3.',
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
