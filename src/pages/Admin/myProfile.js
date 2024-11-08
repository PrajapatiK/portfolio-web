import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateInput from '../../components/forms/DateInput';
import Input from '../../components/forms/input';
import Button from '../../components/forms/button';
import { setLoading } from '../../redux/rootSlice';
import { apiGet, apiPost } from '../../services/api';
import { message } from 'antd';
import { userStatus } from '../../lib/common/constants';

const MyProfile = () => {

  const { isAuthenticated, user: authUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState(authUser);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  }

  const handleUpdate = async () => {
    // update user data
    try {
      dispatch(setLoading(true));
      const users = await apiPost(`/updateUser`, user);
      const userDetail = await apiGet(`/getUser/${users?.data?.username}`);
      setUser(userDetail.data);
      // dispatch(setUsersData(users.data));
      dispatch(setLoading(false));
      message.success('Profile updated successfully');
    } catch (err) {
      dispatch(setLoading(false));
      setError(err?.data?.message);
    }
  }

  const { status } = user;

  return (
    <div>
      <div className='bg-primary h-screen flex justify-center items-center'>
        <div className='w-96 flex gap-5 p-5 shadow border rounded border-gray-500 flex-col bg-white'>
          <h1 className='text-2xl overflow-auto'>User Detail ({user?.username})</h1>
          {error && <div className='bg-red-800 text-white p-3 rounded'>{error}</div>}
          <hr />
          <Input label='User ID' type='text' name='userId' placeholder='User ID' value={user.userId} onChange={handleChange} readOnly transparent disabled />
          <DateInput label='Create Date' type='date' name='createdAt' placeholder='Create Date' value={user.createdAt} onChange={handleChange} readOnly transparent disabled />
          <DateInput label='Update Date' type='date' name='updatedAt' placeholder='Update Date' value={user.updatedAt} onChange={handleChange} readOnly transparent disabled />
          <Input label='Role' type='text' name='role' placeholder='Role' value={user.role} onChange={handleChange} readOnly transparent disabled />
          <Input label='Status' type='text' name='status' placeholder='Status' value={user.status} onChange={handleChange} readOnly transparent disabled />
          <Input label='Username' type='text' name='username' placeholder='Username' value={user.username} onChange={handleChange} />
          <Input label='Email' type='text' name='email' placeholder='Email' value={user.email} onChange={handleChange} />

          <Button btnClass='bg-primary text-white p-2 rounded' text='Update' onClick={handleUpdate} disabled={status === userStatus.INACTIVE} />
        </div>
      </div>
    </div>
  )
}

export default MyProfile;