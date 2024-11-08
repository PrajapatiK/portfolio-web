import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { setLoading, setPortfolioData } from '../../redux/rootSlice';
import { login } from '../../redux/authSlice';
import { apiGet, apiPostOpen } from '../../services/api';
import Input from '../../components/forms/input';
import Button from '../../components/forms/button';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*   const getPortfolioData = async () => {
      try {
        dispatch(setLoading(true));
        const portfolioData = await apiGet(`/getAllPortfolio?username=${user?.username || process.env.REACT_APP_USERNAME}`);
        dispatch(setPortfolioData(portfolioData.data));
        // dispatch(reloadData(false));
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setLoading(false));
                // setError(err?.data?.message);
      }
    } */

  const handleLogin = async () => {
    try {
      dispatch(setLoading(true));
      const userData = await apiPostOpen(`/login`, {
        ...user
      });
      dispatch(login(userData.data.data));

      // getPortfolioData();
      const portfolioData = await apiGet(`/getAllPortfolio?username=${user?.username || process.env.REACT_APP_USERNAME}`);
      dispatch(setPortfolioData(portfolioData.data));
      dispatch(setLoading(false));
      // localStorage.setItem('token', JSON.stringify(userData.data.data));
      message.success(userData.data.message);
      if (userData.data.data.role === 'Admin')  navigate('/users');
      else navigate('/admin');
    } catch (err) {
      dispatch(setLoading(false));
      message.error(err?.data.message)
      setError(err?.data?.message);
    }
  }

  const handleChange = (e) => {
    if (error) setError('');
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-primary'>
        <div className='w-96 flex gap-5 p-5 shadow border rounded border-gray-500 flex-col bg-white'>
          <h1 className='text-2xl'>Login</h1>
          {error && <div className='bg-red-800 text-white p-3 rounded'>{error}</div>}
          <hr />
          <Input label='Username' type='text' name='username' placeholder='Username' value={user.username} onChange={handleChange} />
          <Input label='Password' type='password' name='password' placeholder='Password' value={user.password} onChange={handleChange} />
          <Button btnClass='bg-primary text-white p-2 rounded' text='Login' onClick={handleLogin} />
          <span className=''>Don't have an account? <Link className='link' to='/signup'>Sign up</Link></span>
          <span className=''><Link className='link' to='/forgotPassword'>Forgot Password?</Link></span>
        </div>
      </div>
    </>
  )
}

export default Login;