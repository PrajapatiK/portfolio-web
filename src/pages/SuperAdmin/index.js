import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import UserDetail from './userDetail';
import AdminIntro from '../Admin/adminIntro';
import AdminAbout from '../Admin/adminAbout';
import AdminExperience from '../Admin/adminExperience';
import AdminProject from '../Admin/adminProject';
import AdminContact from '../Admin/adminContact';
import AdminSocial from '../Admin/adminSocial';
import { apiGet } from '../../services/api';
import { setPortfolioData } from '../../redux/rootSlice';

const SuperAdmin = () => {
  const { portfolioData } = useSelector(state => state.root);
  const [width, setWidth] = useState(window.innerWidth);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [activeIndex, setActiveIndex] = useState(state?.activeIndex || "1")
  // const navigate = useNavigate();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    const getPortfolioData = async () => {
      const portfolioData = await apiGet(`/getAllPortfolio?username=${params?.username || process.env.REACT_APP_USERNAME}`);
      dispatch(setPortfolioData(portfolioData.data));
    }
    getPortfolioData();
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;

  return (
    <div>
      <div className='flex items-center justify-between px-5'>
      <h1 className='text-2xl px-5 py-2 text-primary'>Super Admin</h1>
      </div>
      <div className='px-5 pb-10'>
        <Tabs activeKey={activeIndex} tabPosition={isMobile ? 'top' : 'left'} onChange={(k) => setActiveIndex(k)}>
        <Tabs.TabPane tab="User Detail" key="1">
            <UserDetail username={params?.username} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Intro" key="2">
            <AdminIntro />
          </Tabs.TabPane>
          <Tabs.TabPane tab="About" key="3">
            <AdminAbout />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Experiences" key="4">
            <AdminExperience />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Projects" key="5">
            <AdminProject />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Contact" key="6">
            <AdminContact />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Social" key="7">
            <AdminSocial />
          </Tabs.TabPane>
        </Tabs>

      </div>
    </div>
  )
}

export default SuperAdmin;