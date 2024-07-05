import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle';
// import { experiences } from '../../resources/experience';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Experiences = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { loading, portfolioData } = useSelector(state => state.root);
  const { experiences = [] } = portfolioData || {};
  const navigate = useNavigate();
  return (
    <div id="experience">
      <SectionTitle title="Experience" />
      {portfolioData?.experiences ? <div className="flex py-10 gap-20 sm:flex-col w-full">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-[50%] sm:flex-row sm:overflow-x-auto sm:w-full">
          {experiences.map((experience, index) => (
            <div
              onClick={() => setSelectedItemIndex(index)}
              className='cursor-pointer'>
              <h1 className={`text-xl px-5 ${selectedItemIndex === index ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3" : "text-white"}`}>
                {experience.period}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-secondary text-2xl">
            {experiences[selectedItemIndex]?.title}
          </h1>
          <h1 className="text-tertiary text-xl">
            {experiences[selectedItemIndex]?.company}
          </h1>
          <p className="text-white text-xl">
            {experiences[selectedItemIndex]?.description}
          </p>
        </div>
      </div> : (
        <>
          {/* <h1 className='text-white text-xl'>No Experience Data</h1> */}
          <button className="text-lg bg-primary text-white border p-2 rounded" onClick={() => navigate('/admin', { state: { activeIndex: "3" } })}>
            Add Experience
          </button>
        </>
      )}
    </div>
  )
}

export default Experiences;