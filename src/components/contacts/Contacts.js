import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { AppContext } from '../../AppContext';
import api from '../../common/api';
import { ROUTES } from '../../common/constant';
import Contact from './Contact';

const Contacts = () => {
  const history = useHistory();

  const { state, dispatch, getToken } = useContext(AppContext);
  const { contacts } = state;

  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
    };
    const getContacts = async () => {
      const res = await api.get('/contact/contacts', config);
      const { results: payload } = res?.data;
      dispatch({ type: 'SET_CONTACTS', payload });
    };
    getContacts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <Button
        className='btn btn-info float-right mb-2'
        onClick={() => history.push(ROUTES.ADDCONTACT)}
      >
        Create Contact
      </Button>
      <table className='table shadow'>
        <thead className='bg-danger text-white'>
          <tr>
            <th scope='col'>
              <div className='custom-control custom-checkbox'>
                <input
                  type='checkbox'
                  className='custom-control-input'
                  id='contactCheckBox'
                />
                <label htmlFor='contactCheckBox'></label>
              </div>
            </th>
            <th scope='col'>Name</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Email</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts?.map((contact) => (
            <Contact {...contact} key={contact.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
