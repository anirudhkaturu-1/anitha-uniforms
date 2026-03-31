import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center '>
        <div className='flex items-center justify-center animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900'></div>
        <p className='text-base '>Loading..</p>
    </div>
  )
}

export default Loading