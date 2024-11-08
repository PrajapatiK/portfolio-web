import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiPostOpen } from '../../services/api';
import { message } from 'antd';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    if (error) setError('');
    setEmail(e.target.value);
  }

  const handleForgotPassword = async () => {
    try {
      const response = await apiPostOpen(`/forgotPassword`, { email });
      setEmail('');
      message.success(response.data.message);
    } catch (err) {
      setError(err?.data?.message);
    }
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-primary'>
        <div className='w-96 flex gap-5 p-5 shadow border rounded border-gray-500 flex-col bg-white'>
          <h1 className='text-2xl'>Forgot Password</h1>
          {error && <div className='bg-red-800 text-white p-3 rounded'>{error}</div>}
          <hr />
          <span>
            <label>Email</label>
            <input type='text' name='email' placeholder='Email' value={email} onChange={handleChange} />
          </span>
          <button className='bg-primary text-white p-2 rounded' onClick={handleForgotPassword}>Submit</button>
          <span className=''>Already have an account? <Link className='link' to='/login'>Login</Link></span>

        </div>
      </div>
    </>
  )
}

export default ForgotPassword