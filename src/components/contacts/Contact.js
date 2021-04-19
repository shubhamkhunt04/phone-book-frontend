import React, { useContext, useState } from 'react';
import Avatar from 'react-avatar';
import { AiTwotoneDelete, FaEdit } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import api from '../../common/api';

const Contact = ({ _id, name, email, phone, index }) => {
  const { state, dispatch } = useContext(AppContext);

  const deleteBtnHandler = async () => {
    await api.delete(`/contact/${_id}`);
    // delete contact from context
    const newContacts = state.contacts.filter((contact) => contact._id !== _id);
    console.log(newContacts)
    dispatch({ type: 'SET_CONTACTS', payload: newContacts });
  };

  return (
    <tr>
      <th>{index}</th>
      <td>
        <Avatar className='mr-2' name={name} size='45' round={true} />
        {name}
      </td>
      <td>{email}</td>
      <td>{phone}</td>
      <td className='actions'>
        <Link to={`/contacts/edit/${_id}`}>
          <FaEdit size='30px' className='mr-4 text-warning' />
        </Link>
        <span>
          <AiTwotoneDelete
            size='30px'
            className='text-danger'
            onClick={deleteBtnHandler}
          />
        </span>
      </td>
    </tr>
  );
};

export default Contact;
