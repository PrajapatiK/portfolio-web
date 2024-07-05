import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle';
// import { projects } from '../../resources/project';

const Projects = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { loading, portfolioData } = useSelector(state => state.root);
  const { projects = [] } = portfolioData || {};
  const navigate = useNavigate();
  return (
    <div id="projects">
      <SectionTitle title='Project' />
      {portfolioData?.projects ? <div className="flex py-10 gap-20 sm:flex-col w-full">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-[50%] sm:flex-row sm:overflow-x-auto sm:w-full">
          {projects.map((project, index) => (
            <div
              onClick={() => setSelectedItemIndex(index)}
              className='cursor-pointer'>
              <h1 className={`text-xl px-5 ${selectedItemIndex === index ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3" : "text-white"}`}>
                {project.title}
              </h1>
            </div>
          ))}
        </div>
        <div className='flex items-center justify-center gap-10 sm:flex-col'>
          <img onClick={() => window.open(projects[selectedItemIndex]?.link)} className='h-60 w-72 cursor-pointer' src={projects[selectedItemIndex]?.image} alt='Project' />
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-2xl">
              {projects[selectedItemIndex]?.title}
            </h1>
            <p className="text-white text-xl">{projects[selectedItemIndex]?.description}</p>
            <p className="text-white text-xl">
              {projects[selectedItemIndex]?.detailDescription}
            </p>
          </div>
        </div>
      </div> : (
        <>
          {/* <h1 className='text-white text-xl'>No Project Data</h1> */}
          <button className="text-lg bg-primary text-white border p-2 rounded" onClick={() => navigate('/admin', { state: { activeIndex: "4" } })}>
            Add Project
          </button>
        </>
      )}
    </div>
  )
}

export default Projects;