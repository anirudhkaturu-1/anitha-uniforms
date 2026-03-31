import React from 'react'
import { Link } from 'react-router-dom'

const BulkOrder = () => {
  return (
    <div className='relative flex items-center justify-center px-5 md:px-10'>
      <img
        src="https://images.unsplash.com/photo-1624521036130-3bd34caf4c64?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5lZGVybGFuZHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900"
        alt="bulk"
        className="w-full md:h-[80vh] rounded-2xl object-cover shadow-lg"
      />

      <div className='absolute inset-0 flex flex-col gap-5 items-center justify-center text-center px-5'>
        <h2 className='text-xl md:text-4xl md:w-3xl font-bold leading-relaxed text-white  drop-shadow-md'>
          Enabling teams across 1000+ locations to move comfort to the next level
        </h2>

        {/* ✅ Add navigation link here */}
        <Link to={'/bulk'}>
          <button className='bg-[#ff006f] cursor-pointer text-white md:px-8 md:py-3 px-5 py-2 rounded-lg font-medium hover:scale-110 transition-transform duration-300'>
            Bulk Order
          </button>
        </Link>
      </div>
    </div>
  )
}

export default BulkOrder
