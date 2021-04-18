import React from 'react';
import Contact from './Contact';

const Contacts = () => {

  return (
    <div>
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
          </tr>
        </thead>
        <tbody>
          {/* {contacts.map((contact) =><Contact {...contact} key={contact.id} />)} */}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
