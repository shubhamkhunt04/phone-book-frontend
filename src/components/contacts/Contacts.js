import React, { useContext, useEffect } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import { useHistory } from 'react-router';
import { AppContext } from '../../AppContext';
import api from '../../common/api';
import { ROUTES } from '../../common/constant';
import Contact from './Contact';

const Contacts = () => {
  const history = useHistory();

  const { state, dispatch, getToken } = useContext(AppContext);
  const { contacts = [] } = state;

  // fetch contacts from server
  const getContacts = async (url) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
    };

    const res = await api.get(url, config);
    // const { results: payload = {} } = res?.data;
    const { payload = {} } = res?.data;

    dispatch({ type: 'SET_CONTACTS', payload });
  };

  useEffect(() => {
    // load all contacts when component is mounted
    getContacts('/contact/contacts');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectMenuHandler = (e) => {
    // sort contacts by order
    const order = e.target.value || 'asc';

    getContacts(`/contact/contacts?sort=name:${order}`);
  };

  const searchHandler = (e) => {
    // filtering the results
    const result = contacts.filter((contact) =>
      contact.name.includes(e.target.value)
    );
    dispatch({ type: 'SET_CONTACTS', payload: result });

    // if search box empty then fetch all contacts
    if (e.target.value.length === 0) {
      getContacts('/contact/contacts');
    }
  };

  const showPerPageHandler = async (e) => {
    const limit = e.target.value;
    if (limit) {
      getContacts(`/contact/contacts?limit=${limit}`);
    }
  };

  return (
    <div className='container'>
      <div>
        <div className='d-flex justify-start-center h-100'>
          <div className='mr-5'>
            <select
              className='form-select form-select-md w-auto bg-primary text-white'
              aria-label='Default select example'
              onChange={selectMenuHandler}
              title='Sort Contact number'
            >
              <option selected>Sort Contact Number</option>
              <option value='asc'>Ascending order</option>
              <option value='desc'>Descending order</option>
            </select>
          </div>
          <div className='searchbar'>
            <input
              className='search-input'
              type='text'
              name='search'
              placeholder='Search your contact name ...'
              onChange={searchHandler}
            />
            <BiSearch size='25px' className='search-icon' />
          </div>
          {/* <input type='text' name='search' onChange={searchHandler} className='btn btn-primary' placeholder="Search..."/> */}
        </div>
        <Button
          className='btn btn-light float-right mb-2'
          onClick={() => history.push(ROUTES.ADDCONTACT)}
        >
          + Add Contact
        </Button>
      </div>

      <table className='table shadow text-white text-center mt-5'>
        <thead>
          <tr>
            <th scope='col'>
              {/* <div className='custom-control custom-checkbox'>
                <input
                  type='checkbox'
                  className='custom-control-input'
                  id='contactCheckBox'
                />
                <label htmlFor='contactCheckBox'></label>
              </div> */}
              No.
            </th>
            <th scope='col'>Name</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Email</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length
            ? contacts.map((contact, index) => (
                <Contact {...contact} key={contact.id} index={index + 1} />
              ))
            : null}
          {/* <tr>
            <th scope='col'></th>
            <th scope='col'></th>
            <th scope='col'></th>
            <th scope='col'>
              <p className='float-right'>Row per page</p>
            </th>
            <td>
              <select
                className='form-select form-select-md w-25'
                aria-label='Default select example'
                onChange={showPerPageHandler}
                title='Row per page'
              >
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </select>
            </td>
          </tr> */}
        </tbody>
      </table>
      {contacts.length === 0 && (
        <tr className='text-white'>
          <h2>No contacts available yet !! please add contacts</h2>
        </tr>
      )}
    </div>
  );
};

export default Contacts;
