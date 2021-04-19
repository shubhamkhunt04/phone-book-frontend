import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import api from '../../common/api';
import { ROUTES } from '../../common/constant';

const EditContact = () => {
  const history = useHistory();
  const { id } = useParams();

  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const onChange = (e) => {
    e.preventDefault();
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/contact/${id}`, contactData);
      const { status, message } = res?.data;
      console.log(contactData);
      setContactData({
        name: '',
        phone: '',
        email: '',
      });
      if (status === 200) {
        toast.success(message);
        history.push(ROUTES.MAIN);
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    const getContactById = async () => {
      const res = await api.get(`contact/${id}`);
      const { payload = {} } = res?.data;
      console.log(res.data);
      const { name, email, phone } = payload;
      setContactData({
        name,
        email,
        phone,
      });
    };
    getContactById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className='container mt-5 w-75'>
      <div className='card border-0 shadow bg-primary text-white'>
        <div className='card-header'>
          <h1>Edit Contact</h1>
        </div>
        <div className='card-body'>
          <form onSubmit={onSubmit}>
            <div className='form-group m-3'>
              <input
                type='text'
                name='name'
                className='form-control'
                placeholder='Enter your name'
                onChange={onChange}
                value={contactData.name}
              />
            </div>
            <div className='form-group m-3'>
              <input
                type='number'
                name='phone'
                className='form-control'
                placeholder='Enter your phone number'
                onChange={onChange}
                value={contactData.phone}
              />
            </div>
            <div className='form-group m-3'>
              <input
                type='email'
                name='email'
                className='form-control'
                placeholder='Enter your email'
                onChange={onChange}
                value={contactData.email}
              />
            </div>
            <button className='btn btn-warning m-3' type='submit'>
              Update Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditContact;
