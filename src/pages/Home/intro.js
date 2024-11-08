import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CenterContent from '../../components/centerContent';
import Typewriter from '../../components/TypeWritter';

const Intro = () => {
  const { loading, portfolioData } = useSelector(state => state.root);
  const navigate = useNavigate();
  const { intro = {} } = portfolioData || {};
  const { firstName, lastName, welcomeText, description, caption } = intro;

  const handleClick = () => {
    navigate('/signup');
  }

  return (
    <>
      {portfolioData?.intro ? <div id='intro' className='has-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10'>
        <h1 className='text-white text-xl'>{welcomeText}</h1>
        <h1 className='text-7xl sm:text-3xl text-secondary font-semibold'>{firstName && firstName[0]}<Typewriter text={firstName && lastName ? `${firstName?.slice(1)} ${lastName}` : ''} delay={100} infinite styles='text-7xl sm:text-3xl text-secondary font-semibold' /></h1>
        <h1 className='text-7xl sm:text-3xl text-white font-semibold'>{caption}</h1>
        <p className='text-white text-xl w-2/3'>
          {description}
        </p>
        <button className='border-2 border-tertiary text-tertiary px-10 py-3 rounded' onClick={handleClick}>Get started</button>
      </div> : (
        <>
          {/* <h1 className='text-white text-xl'>No Inro Found</h1> */}
          <button className="text-lg bg-primary text-white border p-2 rounded" onClick={() => navigate('/admin', { state: { activeIndex: "1" } })}>
            Add Intro
          </button>
        </>)}
    </>
  )
}

export default Intro;