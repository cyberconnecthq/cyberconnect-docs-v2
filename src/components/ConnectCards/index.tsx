import React from "react";
import styles from "./styles.module.css";
import ArrowUpwardSvg from "@site/static/img/v0.4.0/icons/connect/arrow_upward.svg";
import BookmarkSvg from "@site/static/img/v0.4.0/icons/connect/bookmark.svg";
import FlagSvg from "@site/static/img/v0.4.0/icons/connect/flag.svg";
import HowToRegSvg from "@site/static/img/v0.4.0/icons/connect/how_to_reg.svg";
import ThumbUpOffSvg from "@site/static/img/v0.4.0/icons/connect/thumb_up_off.svg";
import Translate from "@docusaurus/Translate";

type ConnectItem = {
  icon: any;
  title: any;
};

const ConnectList: ConnectItem[] = [
  {
    icon: <HowToRegSvg />,
    title: <Translate description="connection type follow">Follow</Translate>,
  },
  {
    icon: <ThumbUpOffSvg />,
    title: <Translate description="connection type Like">Like</Translate>,
  },
  {
    icon: <FlagSvg />,
    title: <Translate description="connection type Report">Report</Translate>,
  },
  {
    icon: <BookmarkSvg />,
    title: <Translate description="connection type Watch">Watch</Translate>,
  },
  {
    icon: <ArrowUpwardSvg />,
    title: <Translate description="connection type Vote">Vote</Translate>,
  },
];

function ConnectCard({ icon, title }: ConnectItem) {
  return (
    <div className={styles.connectCard}>
      <div className={styles.connectCardIcon}>{icon}</div>
      <h3>{title}</h3>
    </div>
  );
}

export default function ConnectCards(): JSX.Element {
  return (
    <div className={`cards ${styles.connectCards}`}>
      {ConnectList.map((props, idx) => (
        <ConnectCard key={idx} {...props} />
      ))}
    </div>
  );
}
