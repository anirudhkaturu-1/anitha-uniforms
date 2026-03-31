import React from 'react'
import { FaArrowRightLong,} from "react-icons/fa6";
import { BsSend } from "react-icons/bs";


const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-evenly text-center gap-6 md:flex-row md:justify-between md:px-20 bg-gray-500 md:py-10 py-8 px-6 rounded-br-[60px] md:rounded-br-[100px] md:rounded-bl-[100px]">
      
      {/* Text Section */}
      <h2 className="font-bold text-white text-2xl md:text-3xl leading-snug md:w-1/2">
        Our emails are like our scrubs. <br className="hidden md:block" />
        Focused on you!
      </h2>

      {/* Form Section */}
      <form className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full md:w-80 px-4 py-2  outline-none border-b-2 md:border-b-2 border-white  placeholder:text-white text-white text-base md:text-lg  transition duration-300"
        />
        <button
          type="submit"
          className=" text-white  px-6 py-2 rounded-md hover:text-pink-500 cursor-pointer transition duration-300"
        >
<BsSend size={40} />
        </button>
      </form>
    </div>
  )
}

export default NewsLetter
