import React from 'react';
import Avatar from 'react-avatar';
import { AiTwotoneDelete, FaEdit } from 'react-icons/all';
import { Link } from 'react-router-dom';

const Contact = ({ id, name, email, phone, selectAll }) => {
  // const dispatch = useDispatch();

  return (
    <tr>
      <td>
        <div className='custom-control custom-checkbox'>
          <input
            type='checkbox'
            className='custom-control-input'
            id='contactCheckBox'
            checked={selectAll}
          />
          <label htmlFor='contactCheckBox'></label>
        </div>
      </td>
      <td>
        <Avatar className='mr-2' name={name} size='45' round={true} />
        {name}
      </td>
      <td>{email}</td>
      <td>{phone}</td>
      <td className='actions'>
        <Link to={`/contacts/edit/${id}`}>
          <FaEdit size='30px' className='mr-4 text-warning' />
        </Link>
        <span>
          <AiTwotoneDelete
            size='30px'
            className='text-danger'
            // onClick={() => dispatch(deleteContact(id))}
          />
        </span>
      </td>
    </tr>
  );
};

export default Contact;
