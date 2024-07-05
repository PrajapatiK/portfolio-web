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
// import CenterContent from './components/centerContent';

function App() {
  // const [error, setError] = useState('');
  const { loading } = useSelector(state => state.root);
  // const { isAuthenticated, user } = useSelector((state) => state.auth);

  // console.log(isAuthenticated);
  return (
    <>
      {loading ? <Loader /> : null}
      {/* {error ? <CenterContent>{error}</CenterContent> : null} */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path='/pageNotFound' element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/pageNotFound" />} />
      </Routes>
    </>
  );
}

export default App;
