// import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Loader from './components/loader';
import { useSelector } from 'react-redux';
// import { reloadData, setLoading, setPortfolioData } from './redux/rootSlice';
import Admin from './pages/Admin';
import Login from './pages/Auth/login';
import Signup from './pages/Auth/signup';
import PageNotFound from './components/pageNotFound';
import PrivateRoute from './routes/appRoutes';
import ForgotPassword from './pages/Auth/forgotPassword';
import ResetPassword from './pages/Auth/resetPassword';
import ChangePassword from './pages/Auth/changePassword';
import PublicRoute from './routes/publicRoutes';

import AllUsers from './pages/SuperAdmin/allUsers';
import UserDetail from './pages/SuperAdmin';
import MyProfile from './pages/Admin/myProfile';
import SignupVerify from './pages/Auth/signupVerify';
import WelcomePage from './pages/Auth/welcomePage';
// import CenterContent from './components/centerContent';

function App() {
  // const [error, setError] = useState('');
  const { loading } = useSelector(state => state.root);
  // const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
      {loading ? <Loader /> : null}
      {/* {error ? <CenterContent>{error}</CenterContent> : null} */}
      <Routes>
        <Route path='/' element={<PublicRoute headerText='My Portfolio'><Home /></PublicRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify/:verifySignupToken' element={<SignupVerify />} />
        <Route path='/welcome' element={<WelcomePage />} />
        <Route path='/changePassword' element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword/:reqToken' element={<ResetPassword />} />
        <Route path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path='/myProfile' element={<PrivateRoute><MyProfile /></PrivateRoute>} />
        <Route path='/users' element={<PrivateRoute><AllUsers /></PrivateRoute>} />
        <Route path='/userDetail/:username' element={<PrivateRoute><UserDetail /></PrivateRoute>} />
        <Route path='/pageNotFound' element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/pageNotFound" />} />
      </Routes>
    </>
  );
}

export default App;
