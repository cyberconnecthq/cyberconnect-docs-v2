import React from 'react';
import Footer from '@theme-original/Footer';
import ZypsyLogo from '../../../static/img/v0.3.0/logo-zypsy.svg';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <div className='footerDesign'>
        <span>Designed by</span>
        <ZypsyLogo />
      </div>
    </>
  );
}
