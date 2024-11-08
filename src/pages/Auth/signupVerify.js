import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiGetOpen } from '../../services/api';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/rootSlice';
import Button from '../../components/forms/button';

const SignupVerify = () => {

  const [message, setMessage] = useState({});

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const verifySignupUser = async () => {
      try {
        dispatch(setLoading(true));
        const verifiedUser = await apiGetOpen(`/verifySignup/${params.verifySignupToken}`);
        setMessage({ text: verifiedUser.data.message, type: 'success' });
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setLoading(false));
        setMessage({ text: err?.data?.message, type: 'error' });
      }
    }
    verifySignupUser();
  }, []);

  const handleClick = () => {
    navigate('/login');
  }

  return (
    <div className='flex flex-col h-[60vh] justify-center items-center m-20'>
      {message.type === 'error' ?
        <>
          <p className='text-secondary text-3xl text-center'>
            Your email verification failed. Please try clicking the verification link again. If the problem persists, contact our support team for assistance.
          </p>
          <p className='text-secondary text-2xl text-center'>
            Thank you for your patience.
          </p>
          <div className='bg-red-400 text-white p-3 rounded'>
            {message.text}
          </div>
          <Button btnClass='bg-primary text-white text-2xl mt-8 p-2 rounded' text='Login' onClick={handleClick} />
        </>
        :
        <>
          <p className='text-secondary text-3xl text-center'>
            Your email has been successfully verified! Your registration is now complete, and you can start using your account. If you have any questions or need assistance, feel free to reach out to our support team.
          </p>
          <p className='text-secondary text-2xl text-center'>
            Thank you for joining us!
          </p>
          <Button btnClass='bg-primary text-white text-2xl p-2 rounded' text='Login' onClick={handleClick} />
        </>
      }
    </div>
  )
};

export default SignupVerify;