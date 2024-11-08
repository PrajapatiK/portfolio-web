import React from 'react';
import '../../index.css';
import { RiFacebookCircleLine, RiGithubLine, RiInstagramLine, RiLinkedinBoxLine, RiMailLine } from '@remixicon/react';
import { useSelector } from 'react-redux';

const SideBar = () => {
  const { loading, portfolioData } = useSelector(state => state.root);
  const { social = {} } = portfolioData || {};
  return (
    <div className='fixed left-0 bottom-0 px-10 py-4 sm:static'>
      <div className='flex flex-col items-center'>
        <div className='w-52 mb-4 h-[1px] bg-[#125f63] hidden sm:block' />
        <div className='flex flex-col gap-8 sm:flex-row'>
          <RiFacebookCircleLine className="icon text-gray-600 text-xl" onClick={() => window.open(social?.fbURL || 'https://www.facebook.com/')} />
          <RiMailLine className="icon text-gray-600 text-xl" onClick={() => window.open(social?.mailURL || 'https://www.google.com/')}/>
          <RiInstagramLine className="icon text-gray-600 text-xl" onClick={() => window.open(social?.instaURL || 'https://www.instagram.com/accounts/login/')}/>
          <RiLinkedinBoxLine className="icon text-gray-600 text-xl" onClick={() => window.open(social?.linkedInURL || 'https://www.linkedin.com/login')}/>
          <RiGithubLine className="icon text-gray-600 text-xl" onClick={() => window.open(social?.githubURL || 'https://github.com/login')}/>
        </div>
        <div className='w-[1px] mt-4 h-52 bg-[#125f63] sm:hidden' />
      </div>
    </div>
  )
}

export default SideBar;