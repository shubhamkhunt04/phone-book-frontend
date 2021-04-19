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

  const selectMenuHandler = async (e) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
    };
    const order = e.target.value;
    const res = await api.get(`/contact/contacts?sort=name:${order}`, config);
    const { results: payload } = res?.data;
    console.log(payload);
    dispatch({ type: 'SET_CONTACTS', payload });
  };

  const searchHandler = async (e) => {
    console.log(e.target.value);
    const result = contacts.filter((contact) =>
      contact.name.includes(e.target.value)
    );
    console.log('result', result);
    dispatch({ type: 'SET_CONTACTS', payload: result });
    const config = {
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
    };
    if (e.target.value.length === 0) {
      const res = await api.get('/contact/contacts', config);
      const { results: payload } = res?.data;
      dispatch({ type: 'SET_CONTACTS', payload });
    }
  };

  return (
    <div className='container'>
      <div>
        <input type='text' name='search' onChange={searchHandler} />
        <select
          class='form-select form-select-md'
          aria-label='Default select example'
          className='w-auto'
          onChange={selectMenuHandler}
          title='Sort Contact number'
        >
          <option selected>Sort Contact Number</option>
          <option value='asc'>Ascending order</option>
          <option value='desc'>Descending order</option>
        </select>
        <Button
          className='btn btn-info float-right mb-2'
          onClick={() => history.push(ROUTES.ADDCONTACT)}
        >
          Create Contact
        </Button>
      </div>

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
