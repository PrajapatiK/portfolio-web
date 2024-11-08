import React, { useEffect, useState } from 'react';
import { Tabs, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AdminIntro from './adminIntro';
import AdminAbout from './adminAbout';
import AdminExperience from './adminExperience';
import AdminProject from './adminProject';
import AdminContact from './adminContact';
import AdminSocial from './adminSocial';
import { setLoading } from '../../redux/rootSlice';
import { apiGet, apiPost } from '../../services/api';

const Admin = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [width, setWidth] = useState(window.innerWidth);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(state?.activeIndex || "1");
  const timeDurationInSec = 5;
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTimeLeft = localStorage.getItem(`timeLeft:${user.username}`);
    return savedTimeLeft !== null ? JSON.parse(savedTimeLeft) : 0;
  });
  // const [showTimer, setShowTimer] = useState(false);


  useEffect(() => {
    const handleWindowSizeChange = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleWindowSizeChange);

    window.addEventListener('error', e => {
      if (e.type === 'error') {
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
      }
    });

    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, []);

  useEffect(() => {
    let timerId;
    window.addEventListener("beforeunload", () => {
      localStorage.setItem(`timeLeft:${user.username}`, timeLeft);      
    });
    if (timeLeft > 0) {
      timerId = setInterval(() => {
        // localStorage.setItem(`timeLeft:${user.username}`, timeLeft - 1);
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 1000);
    } else {
      localStorage.removeItem(`timeLeft:${user.username}`);
      // setShowTimer(false);
    }
    return () => {
      clearInterval(timerId);
    }
  }, [timeLeft]);

  const handleResendVerificationLink = async () => {
    try {
      dispatch(setLoading(true));
      const verificationData = await apiGet(`/resendVerificationLink`);
      // dispatch(login(user.data));
      dispatch(setLoading(false));
      setTimeLeft(timeDurationInSec);
      localStorage.setItem(`timeLeft:${user.username}`, timeDurationInSec);
      // setShowTimer(true);
      message.success('Verification link sent successfully');
    } catch (err) {
      dispatch(setLoading(false));
    }
  };

  const isMobile = width <= 768;
  // const minutes = Math.floor(timeLeft / 60);
  // const seconds = timeLeft % 60;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <>
      {/* <Header headerText={`${portfolioData?.intro?.firstName || 'My'} Portfolio`} /> */}
      <div className='flex items-center justify-between px-5'>
        <h1 className='text-2xl px-5 py-2 text-primary'>Portfolio Admin</h1>
        {user.status === 'Inactive' && <div>Your email verification was not successful. Please click the link below to request a new verification email.&nbsp;{timeLeft ? 'Please wait while we resend the verification link.' : <Link onClick={handleResendVerificationLink} className='underline text-blue-600'>Resend verification link</Link>}</div>}
        {timeLeft > 0 && <div className="CountdownTimer">Time Left: {formatTime(timeLeft)}</div>}
        {/* <button className='text-white bg-primary px-5 py-2 rounded' onClick={() => navigate('/')}>Go To Portfolio</button> */}
      </div>
      <div className='px-5 pb-10'>
        <Tabs
          activeKey={activeIndex}
          tabPosition={isMobile ? 'top' : 'left'}
          onChange={(k) => setActiveIndex(k)}
        >
          <Tabs.TabPane tab="Intro" key="1">
            <AdminIntro />
          </Tabs.TabPane>
          <Tabs.TabPane tab="About" key="2">
            <AdminAbout />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Experiences" key="3">
            <AdminExperience />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Projects" key="4">
            <AdminProject />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Contact" key="5">
            <AdminContact />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Social" key="6">
            <AdminSocial />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Admin;
