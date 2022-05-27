import React from 'react';
import styles from './styles.module.css';

type ContributorItem = {
  avatar_url: string;
  html_url: string;
};

// TODO: update hardcoded data
const ContributorList: ContributorItem[] = [
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/39951422?v=4',
    html_url: 'https://github.com/snowdot'
  },
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/7857661?v=4',
    html_url: 'https://github.com/HappySean2845'
  },
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/39951422?v=4',
    html_url: 'https://github.com/snowdot'
  }
];

function ContributorCard({avatar_url, html_url} : ContributorItem) {
  return (
    <a className={styles.contributorCard} href={html_url} target="_blank" rel="noreferrer">
      <img src={avatar_url} alt="github user"></img>
    </a>
  );
}

export default function ContributorCards(): JSX.Element {
  return (
    <div className={styles.contributorCards}>
      {ContributorList.map((props, idx) => (
        <ContributorCard key={idx} {...props} />
      ))}
    </div>
  );
}
