import React from 'react';
import HeaderLayout from '../layout/headerLayout';

const PublicRoute = ({ headerText, children }) => {
    return <HeaderLayout headerText={headerText}>{children}</HeaderLayout>;
};

export default PublicRoute;