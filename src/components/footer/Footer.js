import React from 'react';

const Footer = () => {
  return (
    <div className='footer-copyright text-center py-3 bg-info text-lighter'>
      © {new Date().getFullYear()} Copyright: Made with ❤,React & Node by{' '}
      <a
        aria-label='website'
        href='https://shubhamkhunt.netlify.app/'
        className='text-lighter'
      >
        Shubham Khunt
      </a>
    </div>
  );
};

export default Footer;
