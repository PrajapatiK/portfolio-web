import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import HeaderLayout from '../layout/headerLayout';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated)
    return (
      <Navigate to="/login" replace />
    );
    return <HeaderLayout>{children}</HeaderLayout>;
};

export default PrivateRoute;