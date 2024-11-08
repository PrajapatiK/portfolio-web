import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { setLoading } from '../../redux/rootSlice';
import { Link, useNavigate } from 'react-router-dom';
import { apiPostOpen } from '../../services/api';

const Signup = () => {
  const initialState = { username: '', email: '', password: '', confirmPassword: '' };
  const [user, setUser] = useState(initialState);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async () => {
    try {
      dispatch(setLoading(true));
      const response = await apiPostOpen(`/signup`, {
        ...user
      });
      dispatch(setLoading(false));
      message.success(response.data.message);
      setUser(initialState);
      navigate('/welcome');
    } catch (err) {
      dispatch(setLoading(false));
      message.error(err?.data.message);
      setError(err?.data?.message);
    }
  }

  const handleChange = (e) => {
    if (error) setError('');
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }))
  }

  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <div className='w-96 flex gap-5 p-5 shadow border rounded border-gray-500 flex-col bg-white'>
        <h1 className='text-2xl'>Signup</h1>
        {error && <div className='bg-red-800 text-white p-3 rounded'>{error}</div>}
        <hr />
        <span>
          <label>Username</label>
          <input type='text' name='username' placeholder='Username' value={user.username} onChange={handleChange} />
        </span>
        <span>
          <label>Email</label>
          <input type='email' name='email' placeholder='Email' value={user.email} onChange={handleChange} />
        </span>
        <span>
          <label>Password</label>
          <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleChange} />
        </span>
        <span>
          <label>Confirm Password</label>
          <input type='password' name='confirmPassword' placeholder='Confirm Password' value={user.confirmPassword} onChange={handleChange} />
        </span>

        <button className='bg-primary text-white p-2 rounded' onClick={signup}>Signup</button>
        <span className="signupLink">Already have an account? <Link className='link' to='/login'>Login</Link></span>
      </div>
    </div>
  )
}

export default Signup;