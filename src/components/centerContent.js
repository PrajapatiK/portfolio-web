import React from 'react'

const CenterContent = ({ children }) => {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 font-extralight text-7xl text-secondary'>
      {children}
    </div>
  )
}

export default CenterContent;