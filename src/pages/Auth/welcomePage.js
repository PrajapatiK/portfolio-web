import React from 'react';
import Button from '../../components/forms/button';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  }

  return (
    <>
      <div className='flex flex-col h-[60vh] justify-center items-center m-20'>
        <p className='text-secondary text-3xl'>Congratulations! Your registration has been successfully completed.</p>
        <p className='text-secondary text-2xl text-center'>To verify your account, please check your email and click the verification link we have sent you. If you didn't receive the email, check your spam folder or request a new verification email. Thank you!</p>

        <Button btnClass='bg-primary text-white text-2xl p-2 rounded' text='Login' onClick={handleClick} />
      </div>
    </>
  )
};

export default WelcomePage;