import React from 'react'
import logo from '../assets/logo.png'
import { FiLogOut } from 'react-icons/fi'
import { toast } from 'react-toastify'

const Navbar = ({ setToken }) => {

  const handleLogout = () => {
    // Step 1: Remove token from localStorage
    const conformtion = window.confirm("Are you sure you want to logout?");
    if (!conformtion) return;

    setToken('');
    localStorage.removeItem('token');

    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  }

  return (
    <div className='flex justify-between px-10 py-5 shadow-md bg-gray-200'>
      <img src={logo} alt="logo" className='w-[100px]' />

      <div
        onClick={handleLogout}
        className='flex items-center bg-red-400 w-fit gap-2 p-1 rounded-xl hover:bg-red-500 cursor-pointer'
      >
        <FiLogOut size={20} className='text-white font-bold' />
        <h2 className='text-white font-semibold'>Logout</h2>
      </div>
    </div>
  )
}

export default Navbar
