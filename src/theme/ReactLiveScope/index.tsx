import React from 'react';
import CyberConnect, {
  Env,
  Blockchain,
} from '@cyberlab/cyberconnect';
import {
  twitterAuthorize,
  twitterVerify
} from "@cyberlab/social-verifier";

// Add react-live imports you need here
const ReactLiveScope: object = {
  React,
  ...React,
  CyberConnect,
  Env,
  Blockchain,
  twitterVerify,
  twitterAuthorize,
};

export default ReactLiveScope;
