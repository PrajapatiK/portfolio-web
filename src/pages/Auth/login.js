import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { setLoading, setPortfolioData } from '../../redux/rootSlice';
import { login } from '../../redux/authSlice';
import CenterContent from '../../components/centerContent';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPortfolioData = async () => {
    try {
      dispatch(setLoading(true));
      const portfolioData = await axios.get(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/getAllPortfolio?username=${user?.username || process.env.REACT_APP_USERNAME}`);
      console.log(portfolioData.data.data)
      dispatch(setPortfolioData(portfolioData.data.data));
      // dispatch(reloadData(false));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      console.log(err);
      if (err.code === 'ERR_NETWORK') setError(err.message);
    }
  }

  const handleLogin = async () => {
    try {
      dispatch(setLoading(true));
      const userData = await axios.post(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/login`, {
        ...user
      });
      getPortfolioData();
      dispatch(setLoading(false));
      console.log(userData.data);
      message.success(userData.data.data.message);
      // localStorage.setItem('token', JSON.stringify(userData.data.data));
      dispatch(login(userData.data.data.data));
      navigate('/admin');
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
      message.error(err.response.data.message)
      if (err.code === 'ERR_NETWORK') setError(err.message);
    }
  }

  return (
    <>
      {error ? <CenterContent>{error}</CenterContent> : null}
      <div className='flex justify-center items-center h-screen bg-primary'>
        <div className='w-96 flex gap-5 p-5 shadow border rounded border-gray-500 flex-col bg-white'>
          <h1 className='text-2xl'>Login</h1>
          <hr />
          <span>
            <label>Username</label>
            <input type='text' placeholder='Username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
          </span>
          <span>
            <label>Password</label>
            <input type='password' placeholder='Password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </span>
          <button className='bg-primary text-white p-2 rounded' onClick={handleLogin}>Login</button>
          <span className=''>Don't have an account? <Link className='link' to='/signup'>Sign up</Link></span>

        </div>
      </div>
    </>
  )
}

export default Login;