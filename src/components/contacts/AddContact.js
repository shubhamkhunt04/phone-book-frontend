import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { AppContext } from '../../AppContext';
import api from '../../common/api';
import { ROUTES } from '../../common/constant';

const AddContact = () => {
  const {state, dispatch } = useContext(AppContext);

  const history = useHistory();

  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const onChange = (e) => {
    e.preventDefault();
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post('/contact/addcontact', contactData);
    const { payload = {} } = res?.data;
    dispatch({ type: 'SET_CONTACTS', payload });
    // const { token = '' } = payload;
    // if (token) {
    //   initializeAuth(token, payload);
    // }
    console.log('res', res.data);

    // dispatch(addContact({ id: nanoid(8), ...contactData }));

    setContactData({
      name: '',
      phone: '',
      email: '',
    });
    history.push(ROUTES.CONTACTS);
  };

  return (
    <div className='container'>
      <div className='card border-0 shadow' onSubmit={onSubmit}>
        <div className='card-header'>
          <h1>Add Contact</h1>
        </div>
        <div className='card-body'>
          <form>
            <div className='form-group m-3'>
              <input
                type='text'
                name='name'
                className='form-control'
                placeholder='Enter your name'
                onChange={onChange}
                value={contactData.name}
                required
              />
            </div>
            <div className='form-group m-3'>
              <input
                type='number'
                name='phone'
                className='form-control'
                placeholder='Enter your phone number'
                onChange={onChange}
                value={contactData.phone}
                required
              />
            </div>
            <div className='form-group m-3'>
              <input
                type='email'
                name='email'
                className='form-control'
                placeholder='Enter your email'
                onChange={onChange}
                value={contactData.email}
                required
              />
            </div>
            <button className='btn btn-primary m-3' type='submit'>
              Add Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
