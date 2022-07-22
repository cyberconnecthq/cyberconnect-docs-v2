import React from "react";
import styles from "./styles.module.css";
import { CgWebsite } from "react-icons/cg";
import GithubSvg from "@site/static/img/v0.4.0/icons/project/github.svg";
import NpmSvg from "@site/static/img/v0.4.0/icons/project/npm.svg";

type UrlItem = {
  icon: any;
  url: string;
};

type ProjectItem = {
  title: string;
  urls: Array<UrlItem>;
};

const ProjectList: ProjectItem[] = [
  {
    title: "CyberConnect JS SDK",
    urls: [
      {
        icon: <GithubSvg />,
        url: "https://github.com/cyberconnecthq/js-cyberconnect/",
      },
      {
        icon: <NpmSvg />,
        url: "https://www.npmjs.com/package/@cyberlab/cyberconnect/",
      },
    ],
  },
  {
    title: "CyberConnect iOS SDK",
    urls: [
      {
        icon: <GithubSvg />,
        url: "https://github.com/cyberconnecthq/cyberconnect-swift-lib",
      },
    ],
  },
  {
    title: "CyberConnect Social Verifier",
    urls: [
      {
        icon: <GithubSvg />,
        url: "https://github.com/cyberconnecthq/social-verifier/",
      },
      {
        icon: <NpmSvg />,
        url: "https://www.npmjs.com/package/@cyberlab/social-verifier/",
      },
    ],
  },
  {
    title: "CyberConnect JS SDK Starter Demo",
    urls: [
      {
        icon: <GithubSvg />,
        url: "https://github.com/cyberconnecthq/cyberconnect-starter/",
      },
      {
        icon: <CgWebsite />,
        url: "https://cyberconnect-starter.vercel.app",
      },
    ],
  },
  {
    title: "CyberConnect iOS SDK Starter Demo",
    urls: [
      {
        icon: <GithubSvg />,
        url: "https://github.com/cyberconnecthq/cyberconnect-swift-example",
      },
    ],
  },
  {
    title: "CyberProfile REST API Starter Demo",
    urls: [
      {
        icon: <GithubSvg />,
        url: "https://github.com/cyberconnecthq/cyberprofile",
      },
      {
        icon: <CgWebsite />,
        url: "https://cyberprofile-v2.vercel.app/",
      },
    ],
  },
  {
    title: "CyberGraph Demo",
    urls: [
      {
        icon: <GithubSvg />,
        url: "https://github.com/cyberconnecthq/CyberGraph/",
      },
      {
        icon: <CgWebsite />,
        url: "https://graph.cyberconnect.me/",
      },
    ],
  },
  {
    title: "Scaffold-ETH CyberConnect Starter Kit",
    urls: [
      {
        icon: <GithubSvg />,
        url: "https://github.com/cyberconnecthq/scaffold-eth-cyberconnect-starter-kit",
      },
    ],
  },
];

function ProjectCard({ title, urls }: ProjectItem) {
  return (
    <div className={`card ${styles.projectCard}`}>
      <div className="cardTitle">
        <div>
          <div></div>
          <h3>{title}</h3>
        </div>
      </div>
      {urls.map((elem, idx) => (
        <div key={idx}>
          <a href={elem.url} className={styles.projectCardUrl} target="_blank">
            <div className={styles.projectCardIcon}>{elem.icon}</div>
            <div>{elem.url}</div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default function ProjectCards(): JSX.Element {
  return (
    <div className={styles.projectCards}>
      {ProjectList.map((props, idx) => (
        <ProjectCard key={idx} {...props} />
      ))}
    </div>
  );
}
