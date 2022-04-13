import React from 'react';
import CyberConnect, {
  Env,
  Blockchain,
} from '@cyberlab/cyberconnect';
import {
  twitterAuthorize,
  twitterVerify
} from "@cyberlab/social-verifier";

declare global {
  interface Window {
    ethereum: Provider;
  }
}

interface Provider {
  isMetaMask: boolean;
  request: (request: { method: string, params?: Array<any> }) => Promise<any>
}

const cyberConnect = new CyberConnect({
  namespace: 'CyberConnect',
  env: Env.PRODUCTION,
  chain: Blockchain.ETH,
  provider: window.ethereum,
});

// Add react-live imports you need here
const ReactLiveScope: object = {
  React,
  ...React,
  cyberConnect,
  twitterVerify,
  twitterAuthorize
};

export default ReactLiveScope;
