import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { resetRootState } from '../redux/rootSlice';
import { RiLogoutCircleLine, RiUser3Line, RiArrowDropDownLine, RiAdminLine, RiDeleteBin6Line } from '@remixicon/react';
import { Dropdown, Menu, Space, message } from 'antd';
import { ADMIN_ROLE } from '../lib/common/constants';

const Header = ({ headerText }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, portfolioData } = useSelector(state => state.root);
  const { intro = {} } = portfolioData || {};
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [state, setState] = useState(1);

  const handleLogout = () => {
    dispatch(logout({ type: 'LOGOUT' }));
    dispatch(resetRootState());
    navigate('/login');
    localStorage.removeItem(`timeLeft:${user.username}`);
  };

  const menuKeys = {
    "1": "/myProfile",
    "2": "/changePassword",
    "3": "/logout",
    "4": "/users",
    "5": "/admin",
  }

  const handleClick = (target) => {
    setState(target);
  };

  const onClick = (data) => {
    // message.info(`Click on item ${data.key}`);
    if (data.key === '3') handleLogout();
    else {
      // setState(0);
      navigate(menuKeys[data.key]);
    }
  };
  const items = [
    {
      label: 'My Profile',
      key: '1',
    },
    {
      label: 'Change Password',
      key: '2',
    },
    {
      label: 'Logout',
      key: '3',
    }
  ];

  if (user?.role === ADMIN_ROLE) items.unshift({ label: 'All Users', key: '4' });
  else items.unshift({ label: 'Portfolio Admin', key: '5' });


  return (
    <ul className='p-5 m-0 flex justify-between items-center sticky top-0 bg-primary'>
      <span className='text-secondary text-4xl font-semibold cursor-pointer w-[1000px]' onClick={() => navigate('/')}>{headerText}</span>
      {location.pathname === '/' && portfolioData && <span className='w-full lg:flex lg:gap-5 lg:justify-end lg:items-center'>
        <a className={`${state === 1 ? 'text-blue-400' : 'text-white'} text-lg md:invisible`} href="#intro" onClick={() => handleClick(1)}>Home</a>
        <a className={`${state === 2 ? 'text-blue-400' : 'text-white'} text-lg md:invisible`} href="#about" onClick={() => handleClick(2)}>About</a>
        <a className={`${state === 3 ? 'text-blue-400' : 'text-white'} text-lg md:invisible`} href="#experience" onClick={() => handleClick(3)}>Experience</a>
        <a className={`${state === 4 ? 'text-blue-400' : 'text-white'} text-lg md:invisible`} href="#projects" onClick={() => handleClick(4)}>Projects</a>
        <a className={`${state === 5 ? 'text-blue-400' : 'text-white'} text-lg md:invisible`} href="#contact" onClick={() => handleClick(5)}>Contact</a>
      </span>
        /* : <>
          <span className='w-full flex items-center justify-end gap-5'>
            {user?.role === ADMIN_ROLE ?
              <a className={`${state === 7 ? 'text-blue-400' : 'text-white'} text-lg md:invisible`} href="# " onClick={(e) => { e.preventDefault(); console.log('CLICKED!'); navigate('/users'); handleClick(7) }}>
                All Users
              </a>
              :
              <a className={`${state === 6 ? 'text-blue-400' : 'text-white'} text-lg md:invisible`} href="# " onClick={() => { console.log('CLICKED!'); navigate('/admin'); handleClick(6) }}>
                Portfolio Admin
              </a>
            }
          </span>
        </> */
      }
      {isAuthenticated && (
        location.pathname === '/'
          ?
          <RiLogoutCircleLine className="icon ml-5 text-white text-xl hover:text-gray-600" onClick={handleLogout} />
          :
          <Dropdown
            className="icon ml-5 text-white hover:text-gray-400"
            menu={{
              items,
              onClick,
            }}
          >
            {/* <a href="# " onClick={(e) => e.preventDefault()}> */}
            <Space>
              <RiUser3Line size={20} />
              {headerText?.split(' ')[0]}
              <RiArrowDropDownLine />
            </Space>
            {/* </a> */}
          </Dropdown>
      )}
    </ul>
  )
}

export default Header; 