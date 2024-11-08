import React, { useState } from 'react'
import { apiPostOpen } from '../../services/api';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [user, setUser] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (error) setError('');
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  }

  const handleResetPassword = async () => {
    try {
      const response = await apiPostOpen(`/resetPassword/${params.reqToken}`, user);
      setUser({ password: '', confirmPassword: '' })
      navigate('/login');
      message.success(response.data.message);
    } catch (err) {
      setError(err?.data?.message);
    }
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-primary'>
        <div className='w-96 flex gap-5 p-5 shadow border rounded border-gray-500 flex-col bg-white'>
          <h1 className='text-2xl'>Reset Password</h1>
          {error && <div className='bg-red-800 text-white p-3 rounded'>{error}</div>}
          <hr />
          <span>
            <label>New Password</label>
            <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleChange} />
          </span>
          <span>
            <label>Confirm New Password</label>
            <input type='password' name='confirmPassword' placeholder='Confirm Password' value={user.confirmPassword} onChange={handleChange} />
          </span>
          <button className='bg-primary text-white p-2 rounded' onClick={handleResetPassword}>Submit</button>
        </div>
      </div>
    </>
  )
}

export default ResetPassword