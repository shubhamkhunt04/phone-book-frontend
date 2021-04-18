import React from 'react';
import Avatar from 'react-avatar';

const Contact = ({ id, name, phone }) => {
  console.log(id, name, phone);
  return (
    <tr>
      <td>
        <div className='custom-control custom-checkbox'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='contactCheckBox'
          />
          <label htmlFor='contactCheckBox'></label>
        </div>
      </td>
      <td>
        <Avatar className='mr-2' name={name} size='45' round={true} />
        {name}
      </td>
      <td>{name}</td>
      <td>{phone}</td>
    </tr>
  );
};

export default Contact;
