import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import AdminIntro from './adminIntro';
import AdminAbout from './adminAbout';
import AdminExperience from './adminExperience';
import AdminProject from './adminProject';
import AdminContact from './adminContact';
import AdminSocial from './adminSocial';

const Admin = () => {
  const { portfolioData } = useSelector(state => state.root);
  const [width, setWidth] = useState(window.innerWidth);
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const [activeIndex, setActiveIndex] = useState(state?.activeIndex || "1")
  console.log(activeIndex);
  // const navigate = useNavigate();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    // if(!localStorage.getItem('token')) {
    //   navigate('/login');
    // }
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;

  return (
    <div>
      <Header headerText={`${portfolioData?.intro?.firstName || 'My'} Portfolio`}/>
      <div className='flex items-center justify-between px-5'>
      <h1 className='text-2xl px-5 py-2 text-primary'>Portfolio Admin</h1>
      {/* <button className='text-white bg-primary px-5 py-2 rounded' onClick={() => navigate('/')}>Go To Portfolio</button> */}
      </div>
      <div className='px-5 pb-10'>
        <Tabs activeKey={activeIndex} tabPosition={isMobile ? 'top' : 'left'} onChange={(k) => setActiveIndex(k)} /* onTabClick={(key, e) => console.log(key, e)} */>
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
    </div>
  )
}

export default Admin;