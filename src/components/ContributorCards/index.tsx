import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const ENDPOINT = "https://github-contributors-fetcher.vercel.app/api/contributors";

type ContributorItem = {
  login: string;
  avatar_url: string;
  url: string;
};

function ContributorCard({avatar_url, url} : ContributorItem) {
  return (
    <>
      {
        avatar_url && url &&
        <a className={styles.contributorCard} href={url} target="_blank" rel="noreferrer">
          <img src={avatar_url} alt="github user"></img>
        </a>
      }
    </>
  );
}

export default function ContributorCards(): JSX.Element {
  const [contributors, setContributors] = useState<ContributorItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'GET',
          headers: {
            'Content-Type':'application/json'
          },
        });

        const data = await res.json();
        setContributors(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.contributorCards}>
      {contributors.length > 0 && contributors.map((props, idx) => (
        <ContributorCard key={idx} {...props} />
      ))}
    </div>
  );
}
