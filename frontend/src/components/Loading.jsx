import React from 'react'
import { assets } from '../assets/assets'

const Loading = () => {
  return (
    <div className='flex fixed flex-col inset-0 items-center justify-center bg-gray-900 bg-opacity-50'>
        <div className='flex items-center justify-center animate-spin rounded-full h-16 w-16 border-b-2 border-gray-100'></div>
        <img src={assets.logo} className='w-20  animate-pulse mt-3' alt="" />
        <p className='text-base mt-4 text-white animate-pulse leading-loose tracking-widest '>Loading.....</p>
    </div>
    
  )
}

export default Loading