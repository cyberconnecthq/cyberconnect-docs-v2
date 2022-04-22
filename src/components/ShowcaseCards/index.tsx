import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import LinkSvg from '../../../static/img/docs/link.svg';

type ShowcaseItem = {
  title: string;
  srcPath: string;
  description: string;
  url: string;
  tags: Array<string>
};

const ShowcaseList: ShowcaseItem[] = [
  {
    title: 'Project Galaxy',
    srcPath: require('@site/static/img/docs/overview/projectgalaxy.png').default,
    description: 'Project Galaxy is the largest web3 credential data network.',
    url: 'https://galaxy.eco/',
    tags: ['identity']
  },
  {
    title: 'Light.so',
    srcPath: require('@site/static/img/docs/overview/light.jpg').default,
    description: 'Light.so is a Metaverse Explorer enabling users to curate, discover, and explore meaningful interactions in a way that wasn\'t possible before.',
    url: 'https://light.so/',
    tags: ['social']
  },
  {
    title: 'Grape.art',
    srcPath: require('@site/static/img/docs/overview/grape.png').default,
    description: 'Grape.art is a toolkit for building token-based communities on the Solana Blockchain.',
    url: 'https://grape.art/',
    tags: ['NFT', 'social']
  },
  {
    title: 'Hello World',
    srcPath: require('@site/static/img/docs/overview/helloworld.png').default,
    description: 'Hello World is a web application enabling users to discover their social network on the Ethereum Blockchain.',
    url: 'https://helloworld.social/',
    tags: ['social']
  },
  {
    title: 'Unipass',
    srcPath: require('@site/static/img/docs/overview/unipass.png').default,
    description: 'UniPass is a multi-chain unified crypto identity—the carrier for the concept of \'people\' in Metaverse.',
    url: 'https://www.unipass.id/',
    tags: ['identity']
  },
  {
    title: 'Convo Space',
    srcPath: require('@site/static/img/docs/overview/convospace.png').default,
    description: 'Convo Space offers one-stop tooling and infrastructure to build social platforms composable across web3.',
    url: 'https://theconvo.space/',
    tags: ['tool', 'identity']
  },
  {
    title: 'Bress',
    srcPath: require('@site/static/img/docs/overview/bress.png').default,
    description: 'Bress.xyz is a decentralized social platform built on Mirror.xyz.',
    url: 'https://bress.xyz/',
    tags: ['social']
  },
  {
    title: 'Etherloop',
    srcPath: require('@site/static/img/docs/overview/etherloop.jpg').default,
    description: 'Etherloop is a web app enabling users to build social connections and track tokens, balances, transactions, NFTs, and POAPs.',
    url: 'https://etherloop.moonlabs.xyz/',
    tags: ['social']
  },
  {
    title: 'Reveal',
    srcPath: require('@site/static/img/docs/overview/reveal.png').default,
    description: 'Reveal is a web3 social explorer to connect with people based on their on-chain activities.',
    url: 'https://reveal.so/',
    tags: ['social']
  },
  {
    title: 'Treasureland',
    srcPath: require('@site/static/img/docs/overview/treasureland.png').default,
    description: 'Treasureland is a cross-chain NFT platform for NFT issuance, trading, collection, and tailored in-shop services.',
    url: 'https://treasureland.market/',
    tags: ['NFT']
  },
  {
    title: 'Metajam',
    srcPath: require('@site/static/img/docs/overview/metajam.png').default,
    description: 'In Metajam, you can discover, fund, build web3 products, and JAM into the new paradigm.',
    url: 'https://www.metajam.studio/',
    tags: ['social', 'tool']
  },
  {
    title: 'NFTscan',
    srcPath: require('@site/static/img/docs/overview/nftscan.png').default,
    description: 'NFTSCAN is a professional NFT asset explorer and data open platform.',
    url: 'https://www.nftscan.com/',
    tags: ['NFT', 'tool']
  },
];

function ShowcaseCard({title, srcPath, description, url, tags}: ShowcaseItem) {
  return (
    <div className={`card ${styles.showcaseCard}`}>
      <div className={styles.showcaseCardImg}>
        <img src={srcPath}></img>
      </div>
      <div className={`cardTitle ${styles.showcaseCardTitle}`}>
        <div>{title}</div>
        <Link
          className='cardTitleLink'
          to={url}>
            <LinkSvg />
        </Link>
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.cardText}>{description}</div>
        <div className={styles.cardTags}>
          {
            tags.map((elem, idx) => (
              <div
                key={idx}
                datatype={elem}
                className={styles.cardTag}
              >
                <div></div>
                <div>{elem}</div>
              </div>
            ))
          }
        </div>
      </div>
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
