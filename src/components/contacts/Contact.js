import React, { useContext } from 'react';
import Avatar from 'react-avatar';
import { Button } from 'react-bootstrap';
import { AiOutlineDelete, FaRegEdit } from 'react-icons/all';
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
        <Avatar className='float-left' name={name} size='40' round={true} />
        <div className='pt-2'>{name}</div>
      </td>
      <td className='pt-3'>{email}</td>
      <td className='pt-3'>{phone}</td>
      <td>
        <Link to={`/contacts/edit/${_id}`}>
          <Button className='bg-dark border-0'>
            <FaRegEdit size='30px' className='text-info' />
          </Button>
        </Link>
        <Button className='bg-dark border-0'>
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
