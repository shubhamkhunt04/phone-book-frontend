import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AppContext } from '../../AppContext';
import { ROUTES } from '../../common/constant';
import SignUpModal from '../auth/SignUpModal';
const Navbar = () => {
  const { dispatch, isAuthenticated,getToken } = useContext(AppContext);
  const history = useHistory();


  const logoutBtnHandler = () => {
    dispatch({ type: 'LOGOUT' });
    history.push(ROUTES.MAIN);
  }

  const idToken = getToken() 
  useEffect(() => {
    if (idToken) {
      history.push(ROUTES.CONTATCS);
    } else {
      history.push(ROUTES.MAIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className='navbar shadow fixed-top navbar-expand-sm navbar-dark bg-primary'>
      <div className='container'>
        <a href='#' className='navbar-brand'>
          Phone Book
        </a>
        <div>
          <a href='#' className='btn btn-light ml-auto'>
            Create Contact
          </a>
          {isAuthenticated() ? (
            <Button
              href='#'
              className='btn btn-light ml-4'
              onClick={() => logoutBtnHandler}
            >
              Logout
            </Button>
          ) : (
            <span className='ml-4'>
              <SignUpModal />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
