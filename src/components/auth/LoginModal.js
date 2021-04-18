import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import api from '../../common/api';
import { ROUTES } from '../../common/constant';

const LoginModal = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const { initializeAuth, getToken } = useContext(AppContext);
  const idToken = getToken();
  useEffect(() => {
    if (idToken) {
      history.push(ROUTES.CONTACTS);
    } else {
      history.push(ROUTES.MAIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await api.post('/user/login', loginData);
    const { payload = {} } = res?.data;
    const { token = '' } = payload;
    if (token) {
      initializeAuth(token, payload);
    }
    setLoginData({
      email: '',
      password: '',
    });
    setLoading(false);
    handleClose();
    history.push(ROUTES.CONTACTS);
  };

  return (
    <>
      <Button variant='danger' onClick={handleShow} className='mr-4'>
        LOGIN
      </Button>

      <Modal size='md' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LOGIN</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            <h1>Loading</h1>
          ) : (
            <form onSubmit={onSubmit}>
              <div className='form-group m-3'>
                <label htmlFor='email'>Email</label>

                <input
                  id='email'
                  type='email'
                  name='email'
                  className='form-control'
                  placeholder='Enter your email'
                  onChange={onChange}
                  value={loginData.email}
                  required
                />
              </div>
              <div className='form-group m-3'>
                <label htmlFor='phone'>Password</label>
                <input
                  id='phone'
                  type='password'
                  name='password'
                  className='form-control'
                  placeholder='Enter your password'
                  onChange={onChange}
                  value={loginData.password}
                  required
                />
              </div>

              <Button variant='primary' className='m-3' type='submit'>
                Login
              </Button>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
