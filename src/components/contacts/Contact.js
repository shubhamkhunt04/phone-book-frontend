import React, { useState, useEffect } from 'react';
import Contact from './Contact';

const Contacts = () => {
  const [selectAll, setSelectAll] = useState(false);

  // const contacts = useSelector((state) => state.contact.allContacts);

  // const selectedContacts = useSelector(
  //   (state) => state.contact.selectedContacts
  // );

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (selectAll) {
  //     dispatch(selectAllContact(contacts.map((contact) => contact.id)));
  //   } else {
  //     dispatch(clearAllContact());
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectAll]);

  return (
    <div>
      {/* {selectedContacts.length > 1 && (
        <button
          className='btn btn-danger mb-3'
          onClick={() => dispatch(deleteAllContacts())}
        >
          delete all
        </button>
      )} */}
      <table className='table shadow'>
        <thead>
          <tr>
            <th scope='col'>
              {/* {contacts.length > 1 && (
                <div className='custom-control custom-checkbox'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    id='selectAll'
                    value={selectAll}
                    onClick={() => setSelectAll(!selectAll)}
                  />
                  <label htmlFor='selectAll'></label>
                </div>
              )} */}
            </th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {contacts.map((contact, index) => (
            <Contact {...contact} key={contact.id} selectAll={selectAll} />
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
