import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setLoading } from '../../redux/rootSlice';
import { apiGet, apiPost } from '../../services/api';
import Input from '../../components/forms/input';
import Button from '../../components/forms/button';
import DateInput from '../../components/forms/DateInput';
import { message } from 'antd';

const UserDetail = (props) => {

  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const getUserData = async () => {
      try {
        dispatch(setLoading(true));
        const userDetail = await apiGet(`/getUser/${props?.username}`);
        setUser(userDetail.data);
        // dispatch(setUsersData(users.data));
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setLoading(false));
        setError(err?.data?.message);
      }
    }
    getUserData();
  }, []);

  const handleChange = (e) => {
    if (error) setError('');
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }))
  }

  const handleUpdate = async () => {
    try {
      dispatch(setLoading(true));
      const users = await apiPost(`/updateUser`, user);
      const userDetail = await apiGet(`/getUser/${users?.data?.username}`);
      setUser(userDetail.data);
      // dispatch(setUsersData(users.data));
      dispatch(setLoading(false));
      message.success('Admin user updated successfully.');
    } catch (err) {
      dispatch(setLoading(false));
      setError(err?.data?.message);
    }
  }

  return (
    // <div>{JSON.stringify(user, null, 2)}</div>
    <>
      <div className='flex justify-center items-center'>
        <div className='w-96 flex gap-5 p-5 shadow border rounded border-gray-500 flex-col bg-white'>
          <h1 className='text-2xl overflow-auto'>User Detail ({user?.username})</h1>
          {error && <div className='bg-red-800 text-white p-3 rounded'>{error}</div>}
          <hr />
          <Input label='User ID' type='text' name='userId' placeholder='User ID' value={user.userId} onChange={handleChange} readOnly transparent disabled />
          <DateInput label='Create Date' type='date' name='createdAt' placeholder='Create Date' value={user.createdAt} onChange={handleChange} readOnly transparent disabled />
          <DateInput label='Update Date' type='date' name='updatedAt' placeholder='Update Date' value={user.updatedAt} onChange={handleChange} readOnly transparent disabled />
          <Input label='Role' type='text' name='role' placeholder='Role' value={user.role} onChange={handleChange} readOnly transparent disabled />
          <Input label='Username' type='text' name='username' placeholder='Username' value={user.username} onChange={handleChange} />
          <Input label='Email' type='text' name='email' placeholder='Email' value={user.email} onChange={handleChange} />

          <Button btnClass='bg-primary text-white p-2 rounded' text='Update' onClick={handleUpdate} disabled={false} />
        </div>
      </div>
    </>
  )
}

export default UserDetail