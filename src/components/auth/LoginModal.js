import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../common/constant';

const LoginModal = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const onChange = (e) => {
    e.preventDefault();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // dispatch(login(loginData));
    setLoginData({
      email: '',
      password: '',
    });
    setLoading(false);
    handleClose();
    history.push(ROUTES.CONTATCTS);
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow} className='mr-4'>
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
