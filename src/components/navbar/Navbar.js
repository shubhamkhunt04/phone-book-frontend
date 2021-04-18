import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { ROUTES } from '../../common/constant';
import LoginModal from '../auth/LoginModal';
import SignUpModal from '../auth/SignUpModal';
const Navbar = () => {
  const { dispatch, getToken } = useContext(AppContext);
  const history = useHistory();

  const logoutBtnHandler = () => {
    dispatch({ type: 'LOGOUT' });
    history.push(ROUTES.MAIN);
  };

  const idToken = getToken();
  useEffect(() => {
    // if (idToken) {
    //   history.push(ROUTES.CONTACTS);
    // } else {
    //   history.push(ROUTES.MAIN);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className='navbar shadow fixed-top navbar-expand-sm navbar-dark bg-primary'>
      <div className='container'>
        <Link to={ROUTES.MAIN} className='navbar-brand'>
          Phone Book
        </Link>
        {idToken ? (
          <div>
            {/* <Button
              className='btn btn-light ml-auto'
              onClick={() => history.push(ROUTES.ADDCONTACT)}
            >
              Create Contact
            </Button> */}
            <Button
              href='#'
              className='btn btn-light ml-4'
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
    </nav>
  );
};

export default Navbar;
