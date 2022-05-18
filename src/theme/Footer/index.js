import React from 'react';
import Footer from '@theme-original/Footer';
import ZypsyLogo from '../../../static/img/v0.3.0/logo-zypsy.svg';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <a className='footerDesign' href='https://www.zypsy.com/' rel='noreferrer'>
        <span>Designed by</span>
        <ZypsyLogo />
      </a>
    </>
  );
}
