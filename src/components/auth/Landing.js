import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return (
    <section className='landing'>
      <div className='landing-inner'>
        <h1 className='fs-1'>Stay connected with your peers!</h1>
        <p className='fs-1 lh-lg'>
          Use the PhoneBook app to manage your contacts
        </p>
        <div>
          <SignUpModal />
          <LoginModal />
        </div>
      </div>
    </section>
  );
};

export default Landing;
