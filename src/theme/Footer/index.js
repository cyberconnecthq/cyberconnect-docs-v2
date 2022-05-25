import React from 'react';
import Footer from '@theme-original/Footer';
import ZypsyLogo from '../../../static/img/v0.4.0/logo-zypsy.svg';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <a className='footerDesign' href='https://www.zypsy.com/' target="_blank" rel='noreferrer'>
        <span>Designed by</span>
        <ZypsyLogo />
      </a>
    </>
  );
}
