import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { AppContext } from '../../AppContext';
import { ROUTES } from '../../common/constant';
import LoginModal from '../auth/LoginModal';
import SignUpModal from '../auth/SignUpModal';
import GithubRibbon from '../githubRibbon/GithubRibbon';

const Navbar = () => {
  const { dispatch, getToken } = useContext(AppContext);
  const history = useHistory();

  const logoutBtnHandler = () => {
    dispatch({ type: 'LOGOUT' });
    history.push(ROUTES.MAIN);
  };

  const idToken = getToken();

  return (
    <>
      <nav className='navbar shadow fixed-top navbar-expand-sm navbar-dark bg-primary'>
        <div className='container'>
          <Link to={ROUTES.MAIN} className='navbar-brand'>
            Phone Book
          </Link>
          {idToken ? (
            <div>
              <Button
                href='#'
                className='btn btn-warning ml-4'
                onClick={logoutBtnHandler}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <span className='ml-4'>
                <SignUpModal />
              </span>
              <span>
                <LoginModal />
              </span>
            </div>
          )}
        </div>
        <GithubRibbon />
      </nav>
    </>
  );
};

export default Navbar;
