import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { message } from 'antd';
import { setLoading } from '../../redux/rootSlice';
import { Link } from 'react-router-dom';

const Signup = () => {
  const initialState = { username: '', email: '', password: '', confirmPassword: '' };
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/signup`, {
        ...user
      });
      dispatch(setLoading(false));
      console.log(response.data);
      message.success(response.data.data.message);
      setUser(initialState);
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
      message.error(err.response.data?.message);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-primary'>
      <div className='w-96 flex gap-5 p-5 shadow border rounded border-gray-500 flex-col bg-white'>
        <h1 className='text-2xl'>Signup</h1>
        <hr />
        <span>
          <label>Username</label>
          <input type='text' placeholder='Username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
        </span>
        <span>
          <label>Email</label>
          <input type='email' placeholder='Email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
        </span>
        <span>
          <label>Password</label>
          <input type='password' placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        </span>
        <span>
          <label>Confirm Password</label>
          <input type='password' placeholder='Confirm Password' value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
        </span>

        <button className='bg-primary text-white p-2 rounded' onClick={signup}>Signup</button>
        <span className="signupLink">Already have an account? <Link className='link' to='/login'>Login</Link></span>
      </div>
    </div>
  )
}

export default Signup;