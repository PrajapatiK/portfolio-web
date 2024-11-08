import React from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

const HeaderLayout = ({ children, headerText }) => {
  const { portfolioData } = useSelector(state => state.root);
  return (
    <>
      <Header headerText={headerText || portfolioData?.intro?.firstName || 'My Portfolio'} />
      {children}
    </>
  )
}

export default HeaderLayout;