import React from 'react'
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { webSkills } from '../../lib/common/constants';
// import Developer from'../../../public/developer.png';


const About = () => {
  const { loading, portfolioData } = useSelector(state => state.root);
  const navigate = useNavigate();
  const { about = {} } = portfolioData || {};
  const { skills = [], imageURL, description1, description2 } = about;

  return (
    <div id="about">
      <SectionTitle title='About' />
      {portfolioData?.about ? (
        <>
          <div className='flex w-full sm:flex-col'>
            <div className='h-[25vh] w-1/3 sm:w-full'>
              <img className='h-[25vh]' src={imageURL} alt='Developer' />
            </div>
            <div className='flex flex-col justify-center gap-5 w-10/12 -ml-10 sm:-ml-0 sm:w-full'>
              <p className="text-white text-xl">
                {description1}
              </p>
              <p className="text-white text-xl">
                {description2}
              </p>
            </div>
          </div>
          {skills?.length && <div className='py-5'>
            <h1 className="text-tertiary text-xl">
              Here are a few technologies I've been working with recently:
            </h1>
            <div className="flex flex-wrap gap-10 mt-5">
              {skills.map((skill, index) => (
                <div className="border border-tertiary py-3 px-10 rounded cursor-pointer" onClick={() => window.open(webSkills[skill.toLowerCase()])}>
                  <h1 className="text-tertiary">{skill}</h1>
                </div>
              ))}
            </div>
          </div>}
        </>
      ) : (
        <>
          {/* <h1 className='text-white text-xl'>No About Found</h1> */}
          <button className="text-lg bg-primary text-white border p-2 rounded" onClick={() => navigate('/admin', { state: { activeIndex: "2" } })}>
            Add About
          </button>
        </>
      )}
    </div>
  )
}

export default About;