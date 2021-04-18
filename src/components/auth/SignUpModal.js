import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AppContext } from '../../AppContext';
import api from '../../common/api';
import { ROUTES } from '../../common/constant';

const SignUpModal = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const {initializeAuth} = useContext(AppContext)

  const history = useHistory();

  const onChange = (e) => {
    e.preventDefault();
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
     const res =await  api.post('/user/register',registerData)
     const {payload = {}} = res?.data
     const {token = ""} = payload
     if(token){
      initializeAuth(token,payload)
     }
    setRegisterData({
      username: '',
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
        SIGN UP
      </Button>

      <Modal size='md' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SIGN UP</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loading ? (
            <h1>Loading</h1>
          ) : (
            <form onSubmit={onSubmit}>
              <div className='form-group m-3'>
                <label htmlFor='name'>Username</label>
                <input
                  id='username'
                  type='text'
                  name='username'
                  className='form-control'
                  placeholder='Enter your name'
                  onChange={onChange}
                  value={registerData.username}
                  required
                />
              </div>
              <div className='form-group m-3'>
                <label htmlFor='email'>Email</label>

                <input
                  id='email'
                  type='email'
                  name='email'
                  className='form-control'
                  placeholder='Enter your email'
                  onChange={onChange}
                  value={registerData.email}
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
                  value={registerData.password}
                  required
                />
              </div>

              <Button variant='primary' className='m-3' type='submit'>
                Sign Up
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

export default SignUpModal;
