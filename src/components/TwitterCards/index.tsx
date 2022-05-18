import React from 'react';
import styles from './styles.module.css';

type TwitterItem = {
  html: JSX.Element
};

const PartnershipList: TwitterItem[] = [
  {
    html: <blockquote className="twitter-tweet"><p lang="en" dir="ltr">🐦<a href="https://twitter.com/hashtag/TwitterScan?src=hash&amp;ref_src=twsrc%5Etfw">#TwitterScan</a> NEW Partner &amp; Investor💪:<br></br><br></br>🪅🥳 <a href="https://twitter.com/MetascanPro?ref_src=twsrc%5Etfw">@MetascanPro</a> X <a href="https://twitter.com/CyberConnectHQ?ref_src=twsrc%5Etfw">@CyberConnectHQ</a> 🥳🪅<br></br><br></br>We, <a href="https://twitter.com/hashtag/Web3?src=hash&amp;ref_src=twsrc%5Etfw">#Web3</a> partners, would <a href="https://twitter.com/hashtag/Build?src=hash&amp;ref_src=twsrc%5Etfw">#Build</a> together to benefit all <a href="https://twitter.com/hashtag/Metaverse?src=hash&amp;ref_src=twsrc%5Etfw">#Metaverse</a> avid users!!!🏗️🏗️🏗️<a href="https://twitter.com/hashtag/NFT?src=hash&amp;ref_src=twsrc%5Etfw">#NFT</a> Whales 🐳 Tracking: <a href="https://t.co/z9neASHeJ1">https://t.co/z9neASHeJ1</a><a href="https://twitter.com/hashtag/cyberconnect?src=hash&amp;ref_src=twsrc%5Etfw">#cyberconnect</a> <a href="https://twitter.com/hashtag/Metaverse?src=hash&amp;ref_src=twsrc%5Etfw">#Metaverse</a> <a href="https://twitter.com/hashtag/NFTCommumity?src=hash&amp;ref_src=twsrc%5Etfw">#NFTCommumity</a> <a href="https://t.co/mq7BkiEBJk">pic.twitter.com/mq7BkiEBJk</a></p>&mdash; Metascan (@MetascanPro) <a href="https://twitter.com/MetascanPro/status/1522562267040174082?ref_src=twsrc%5Etfw">May 6, 2022</a></blockquote>
  },
  {
    html: <blockquote className="twitter-tweet"><p lang="en" dir="ltr">🎉 New partnership connected!<br></br><br></br>Our Web3 task page is already available for all our CyberCommunity. Thanks to the collaboration of our new partner <a href="https://twitter.com/dappback?ref_src=twsrc%5Etfw">@dappback</a><br></br> <br></br>Participate, learn, complete tasks and be rewarded with a Level 1 <a href="https://twitter.com/hashtag/NFT?src=hash&amp;ref_src=twsrc%5Etfw">#NFT</a>: CyberConnected NFT 🎯<br></br> <br></br>▶️ <a href="https://t.co/wWXNkRaeSH">https://t.co/wWXNkRaeSH</a> <a href="https://t.co/ysYfgSmXAU">pic.twitter.com/ysYfgSmXAU</a></p>&mdash; CyberConnect (@CyberConnectHQ) <a href="https://twitter.com/CyberConnectHQ/status/1521598763013394433?ref_src=twsrc%5Etfw">May 3, 2022</a></blockquote>
  },
  {
    html: <blockquote className="twitter-tweet"><p lang="en" dir="ltr">It&#39;s Party Time 🙌 <a href="https://twitter.com/teapartylife?ref_src=twsrc%5Etfw">@teapartylife</a><br></br> <br></br>We are more than thrilled to introduce TeaParty, a Social-&amp;-Earn protocol in Web3 🤟<br></br><br></br>We will be working together to empower the content creator network, bringing contextualized social experiences<br></br> <br></br>More details 👇 <a href="https://t.co/QEjorRzydh">https://t.co/QEjorRzydh</a> <a href="https://t.co/VC5uuFzD4t">https://t.co/VC5uuFzD4t</a> <a href="https://t.co/Z8hFfj0jJh">pic.twitter.com/Z8hFfj0jJh</a></p>&mdash; CyberConnect (@CyberConnectHQ) <a href="https://twitter.com/CyberConnectHQ/status/1521334356555419648?ref_src=twsrc%5Etfw">May 3, 2022</a></blockquote>
  }
];

const PartnersEventsList: TwitterItem[] = [
  {
    html: <blockquote className="twitter-tweet"><p lang="en" dir="ltr">Space today with <a href="https://twitter.com/rocifi?ref_src=twsrc%5Etfw">@rocifi</a> stars in 1.5 hours! See you soon. <a href="https://t.co/87P4G9J2YO">https://t.co/87P4G9J2YO</a></p>&mdash; CyberConnect (@CyberConnectHQ) <a href="https://twitter.com/CyberConnectHQ/status/1511727331102105616?ref_src=twsrc%5Etfw">April 6, 2022</a></blockquote>
  }, 
  {
    html: <blockquote className="twitter-tweet"><p lang="en" dir="ltr">Twitter space of the week incoming! 🚀<br></br><br></br>Cohosting with our lovely frens <a href="https://twitter.com/CoinviseCo?ref_src=twsrc%5Etfw">@CoinviseCo</a>, who are working on creating powerful tools for creators to build &amp; operate tokenized communities. <br></br><br></br>Wednesday Mar 30 @ 1:30 pm EST. See you there!<a href="https://t.co/J0647WxVBw">https://t.co/J0647WxVBw</a></p>&mdash; CyberConnect (@CyberConnectHQ) <a href="https://twitter.com/CyberConnectHQ/status/1508566486020931586?ref_src=twsrc%5Etfw">March 28, 2022</a></blockquote>
  },
  {
    html: <blockquote className="twitter-tweet"><p lang="en" dir="ltr">Columbia&#39;s Lionhack starts today! <br></br><br></br>Thrilled to join the ranks of so many incredible companies to be supporting undergraduate talent in their endeavors toward building in Web3. So excited to see what kind of cool projects will emerge 👀<br></br><br></br>Come say hi if you&#39;re here :) <a href="https://t.co/7FYFRBGBRf">https://t.co/7FYFRBGBRf</a></p>&mdash; CyberConnect (@CyberConnectHQ) <a href="https://twitter.com/CyberConnectHQ/status/1509913832839434244?ref_src=twsrc%5Etfw">April 1, 2022</a></blockquote>
  }
];

const CommunityUpdateList: TwitterItem[] = [
  {
    html: <blockquote className="twitter-tweet"><p lang="en" dir="ltr">What an amazing hackathon we had <a href="https://twitter.com/hashtag/GR13?src=hash&amp;ref_src=twsrc%5Etfw">#GR13</a><br></br><br></br>Shout out to all the builders who have helped us along the journey. We can&#39;t possibly thank you enough! We will definitely see you guys soon 💯<br></br><br></br>Demo Day Recording:<a href="https://t.co/U0u0QcZIe1">https://t.co/U0u0QcZIe1</a><br></br><br></br>CyberConnect <a href="https://twitter.com/hashtag/GR13?src=hash&amp;ref_src=twsrc%5Etfw">#GR13</a> Report:<a href="https://t.co/XLgsYizPI4">https://t.co/XLgsYizPI4</a></p>&mdash; CyberConnect (@CyberConnectHQ) <a href="https://twitter.com/CyberConnectHQ/status/1512575205759066112?ref_src=twsrc%5Etfw">April 8, 2022</a></blockquote>
  },
  {
    html: <blockquote className="twitter-tweet"><p lang="en" dir="ltr">We&#39;ve partnered up with <a href="https://twitter.com/ETHGlobal?ref_src=twsrc%5Etfw">@ETHGlobal</a> to build the ultimate hackathon experience at <a href="https://twitter.com/hashtag/ETHAmsterdam?src=hash&amp;ref_src=twsrc%5Etfw">#ETHAmsterdam</a>! 🥳<br></br><br></br>Want to hack the future of Web3 and win $400k+ in prizes? Join us for <a href="https://twitter.com/hashtag/ETHAmsterdam?src=hash&amp;ref_src=twsrc%5Etfw">#ETHAmsterdam</a> April 22th - 24th. Register at: <a href="https://t.co/BR0JvlqSWd">https://t.co/BR0JvlqSWd</a> <br></br><br></br>Drop a 🙋‍♀️ if you&#39;re going! <a href="https://t.co/uyqqZnWAWa">pic.twitter.com/uyqqZnWAWa</a></p>&mdash; CyberConnect (@CyberConnectHQ) <a href="https://twitter.com/CyberConnectHQ/status/1511789984008843264?ref_src=twsrc%5Etfw">April 6, 2022</a></blockquote>
  },
];

function TwitterCard({ html }: TwitterItem) {
  return (
    <div className={styles.twitterCard}>
      {html}
    </div>
  );
}

export function PartnershipTwitterCards(): JSX.Element {
  return (
    <div className={`cards ${styles.twitterCards}`}>
      {PartnershipList.map((props, idx) => (
        <TwitterCard key={idx} {...props} />
      ))}
    </div>
  );
}

export function PartnersEventsTwitterCards(): JSX.Element {
  return (
    <div className={`cards ${styles.twitterCards}`}>
      {PartnersEventsList.map((props, idx) => (
        <TwitterCard key={idx} {...props} />
      ))}
    </div>
  );
}

export function CommunityTwitterCards(): JSX.Element {
  return (
    <div className={`cards ${styles.twitterCards}`}>
      {CommunityUpdateList.map((props, idx) => (
        <TwitterCard key={idx} {...props} />
      ))}
    </div>
  );
}
