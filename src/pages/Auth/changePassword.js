import React, { useState } from 'react'
import { apiPost } from '../../services/api';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getMsgsToArray } from '../../lib/util';
import FormUIMesssage from '../../components/FormUIMesssage';
import Input from '../../components/forms/input';
import { logout } from '../../redux/authSlice';
import { resetRootState } from '../../redux/rootSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/forms/button';
import { userStatus } from '../../lib/common/constants';


const ChangePassword = () => {
  const [user, setUser] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user: authUser } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    if (messages.length) setMessages([]);
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  }

  const handleChangePassword = async () => {
    try {
      const response = await apiPost(`/ChangePassword`, user);
      setUser({ password: '', confirmPassword: '' })
      dispatch(logout({ type: 'LOGOUT' }));
      dispatch(resetRootState());
      navigate('/login');
      message.success(response.data.message);
    } catch (err) {
      setMessages(getMsgsToArray(err?.data?.message));
      // setError(err?.data?.message);
    }
  }

  const { status } = authUser;

  return (
    <>
      {/* <Header headerText={`${portfolioData?.intro?.firstName || 'User'}`} /> */}
      <div className='flex justify-center items-center h-screen bg-primary'>
        <div className='w-96 flex gap-5 p-5 shadow border rounded border-gray-500 flex-col bg-white'>
          <h1 className='text-2xl'>Change Password</h1>
          {/* {error && <div className='bg-red-800 text-white p-3 rounded'>{error}</div>} */}
          {messages?.length > 0 && (<FormUIMesssage msgClass='bg-red-800 text-white p-3 rounded' message={messages} />)}
          <hr />
          <Input label='Old Password' type='password' name='oldPassword' placeholder='Old Password' value={user.oldPassword} onChange={handleChange} />
          <Input label='New Password' type='password' name='password' placeholder='New Password' value={user.password} onChange={handleChange} />
          <Input label='Confirm New Password' type='password' name='confirmPassword' placeholder='Confirm Password' value={user.confirmPassword} onChange={handleChange} />
          <Button btnClass='bg-primary text-white p-2 rounded' text='Submit' onClick={handleChangePassword} disabled={status === userStatus.INACTIVE} />
          
          {/* <button className='bg-primary text-white p-2 rounded' onClick={handleChangePassword}>Submit</button> */}
        </div>
      </div>
    </>
  )
}

export default ChangePassword