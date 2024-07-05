import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { resetRootState } from '../redux/rootSlice';
import { RiLogoutCircleLine } from '@remixicon/react';

const Header = ({ headerText }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, portfolioData } = useSelector(state => state.root);
  const { intro = {} } = portfolioData || {};
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [state, setState] = useState(1);

  const handleLogout = () => {
    console.log('handleLogout');
    dispatch(logout({ type: 'LOGOUT' }));
    dispatch(resetRootState());
    navigate('/login');
    // localStorage.removeItem('token');
  };

  const handleClick = (target) => {
    console.log(target);
    setState(target);
  };
  console.log(portfolioData);
  return (
    <ul className='p-5 m-0 bg-primary flex justify-between items-center sticky top-0'>
      <span className='text-secondary text-4xl font-semibold cursor-pointer w-[50%]' onClick={() => navigate('/')}>{headerText}</span>
      {location.pathname === '/' && portfolioData && <>
        <a className={`${state === 1 ? 'text-blue-400' : 'text-white'} text-xl transition-all duration-300 target:text-red`} href="#intro" onClick={() => handleClick(1)}>Home</a>
        <a className={`${state === 2 ? 'text-blue-400' : 'text-white'} text-xl transition-all duration-300`} href="#about" onClick={() => handleClick(2)}>About</a>
        <a className={`${state === 3 ? 'text-blue-400' : 'text-white'} text-xl transition-all duration-300`} href="#experience" onClick={() => handleClick(3)}>Experience</a>
        <a className={`${state === 4 ? 'text-blue-400' : 'text-white'} text-xl transition-all duration-300`} href="#projects" onClick={() => handleClick(4)}>Projects</a>
        <a className={`${state === 5 ? 'text-blue-400' : 'text-white'} text-xl transition-all duration-300`} href="#contact" onClick={() => handleClick(5)}>Contact</a>
      </>
      }
      {isAuthenticated && (
        <RiLogoutCircleLine className="icon text-white text-xl hover:text-gray-600" onClick={handleLogout} />
      )
      }
    </ul>
  )
}

export default Header; 