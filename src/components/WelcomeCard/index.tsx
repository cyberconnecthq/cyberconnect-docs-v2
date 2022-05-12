import React from 'react';
import styles from './styles.module.css';

export default function WelcomeCard(): JSX.Element {
    return (
        <div className={styles.welcomeCard}>
            <h2 className="anchor" id="cyberconnect-developer-community">CyberConnect Developer Community<a className="hash-link" href="#cyberconnect-developer-community" title="Direct link to heading"></a></h2>
            <p>The CyberConnect Protocol is built with and for developers. Don't hesitate to join our vibrant <a href="https://discord.com/invite/cUc8VRGmPs" target="_blank" rel="noopener noreferrer">Discord community</a> where you will find channels specifically dedicated to developers and hackathon events. To stay updated, subscribe to our <a href="https://www.getrevue.co/profile/cyberconnect" target="_blank" rel="noopener noreferrer">newsletter</a>, read our <a href="https://mirror.xyz/cyberlab.eth" target="_blank" rel="noopener noreferrer">Mirror posts</a>, and follow us on <a href="https://twitter.com/CyberConnectHQ" target="_blank" rel="noopener noreferrer">Twitter</a>. Let's CyberConnect!</p>
        </div>
    );
}
