import React, { useContext, useState } from 'react';
import Avatar from 'react-avatar';
import { Button } from 'react-bootstrap';
import {
  AiOutlineDelete,
  AiTwotoneDelete,
  FaEdit,
  FaRegEdit,
  MdDelete,
} from 'react-icons/all';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../AppContext';
import api from '../../common/api';

const Contact = ({ _id, name, email, phone, index }) => {
  const { state, dispatch } = useContext(AppContext);

  const deleteBtnHandler = async () => {
    try {
      const res = await api.delete(`/contact/${_id}`);
      const { status, message } = res?.data;
      if (status === 200) {
        // delete contact from context
        const newContacts = state.contacts.filter(
          (contact) => contact._id !== _id
        );
        dispatch({ type: 'SET_CONTACTS', payload: newContacts });
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <tr>
      <th className='pt-3'>{index}.</th>
      <td>
        <Avatar className='mr-2' name={name} size='40' round={true} />
        {name}
      </td>
      <td className='pt-3'>{email}</td>
      <td className='pt-3'>{phone}</td>
      <td>
        <Link to={`/contacts/edit/${_id}`}>
          <Button className='info'>
            <FaRegEdit size='30px' className='text-info' />
          </Button>
        </Link>
        <Button>
          <AiOutlineDelete
            size='30px'
            className='text-danger'
            onClick={deleteBtnHandler}
          />
        </Button>
      </td>
    </tr>
  );
};

export default Contact;
