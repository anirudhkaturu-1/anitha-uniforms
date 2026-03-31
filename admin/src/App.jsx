import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import Add from './Pages/Add'
import List from './Pages/List'
import Order from './Pages/Order'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = React.useState(localStorage.getItem('token')?localStorage.getItem('token'):"");

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <div className='min-h-screen'>
      <ToastContainer position='top-right' autoClose={2000} theme='colored' />
      
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr className='text-gray-300' />
          <div className='w-full flex'>
            <SideBar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-700 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List />} token={token} />
                <Route path='/orders' element={<Order token={token}  />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App;
