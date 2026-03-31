import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut, FiShoppingBag } from 'react-icons/fi';
import { assets } from '../../assets/assets';
import { motion } from "framer-motion";
import { ShopContext } from '../../Context/ShopContext';
import './Navbar.css';
import axios from 'axios';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [userName, setUserName] = useState('');
  const searchRef = useRef(null);

  const { getCartItemsCount, navigate, token, setToken, setCartItems, backendUrl } = useContext(ShopContext);

  // Fetch user name
  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await axios.get(`${backendUrl}/api/user/username`, {
          headers: { authorization: `Bearer ${token}` }
        });
        setUserName(response.data.success ? response.data.user.name : "Guest");
      } catch (err) {
        console.error(err);
        setUserName("Guest");
      }
    };
    fetchUserName();
  }, [backendUrl]);


  // Filter products based on query
  useEffect(()=>{
    
  const handler = setTimeout(()=>{

    const fetchProducts = async () => {
        if(!query){
    setSearchResults([]);
   return;
    }
    try {

      const res = await axios.get(`${backendUrl}/api/product/search`,{
        params:{query,limit:10}
      })
      if(res.data.success){
        setSearchResults(res.data.products);
      }

    } catch (error) {
      console.log(error);
      setSearchResults([]);
    }
      
    };
    fetchProducts();
  
  },500);
  return ()=>clearTimeout(handler);

  },[query,backendUrl])

  // Handle search icon click
  const handleSearchToggle = () => {
    setShowSearch(prev => {
      if (prev) { // if currently open, clear on close
        setQuery('');
        setSearchResults([]);
      }
      return !prev;
    });
  };


  // Handle logout
  const LogOut = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  // Close search on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setQuery('');
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Banner */}
      <div className="h-[30px] bg-gray-500 overflow-hidden relative">
        <div className='animate-scrollLoop text-sm text-white whitespace-nowrap'>
          <span className="px-4">Free Shipping on all orders over $100 🚚</span>
          <span className="px-4">Free Shipping on all orders over $100 🚚</span>
        </div>
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-4 shadow-md bg-gray-100 text-gray-800 sticky top-0 z-50">

        {/* Logo */}
        <Link to='/'>
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="w-[100px]" />
          </div>
        </Link>

        {/* Welcome */}
        <div className="hidden md:block">
          Hi,<strong>{token ? userName : "👋🏻Buddy"}</strong>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-800 text-base font-semibold capitalize">
          {[
            { path: "/", label: "Home" },
            { path: "/women", label: "Women" },
            { path: "/men", label: "Men" },
            { path: "/collections", label: "Collections" },
            { path: "/bulk", label: "Bulk" },
            { path: "/about", label: "About" },
            { path: "/track-order", label: "Track Order" },
            { path: "/contact", label: "Contact" },
          ].map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `flex flex-col items-center transition-all duration-300 ${isActive ? "text-pink-600" : "text-gray-800 hover:text-gray-700"}`}
            >
              {({ isActive }) => (
                <>
                  <li>{item.label}</li>
                  <hr className={`border-none outline-none h-0.5 bg-pink-600 transition-all duration-500 ${isActive ? "w-3/5 opacity-100" : "w-0 opacity-0"}`} />
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4 text-gray-800 text-lg relative">

          {/* Search */}
          <div ref={searchRef} className="relative">
            {showSearch ? (
              <FaTimes className="hover:text-gray-600 cursor-pointer" onClick={handleSearchToggle} />
            ) : (
              <FaSearch className="hover:text-gray-600 cursor-pointer" onClick={handleSearchToggle} />
            )}

            {showSearch && (
              <div className='absolute top-12 right-0 md:w-[500px] w-[300px] bg-white border border-gray-400 rounded-lg shadow-lg'>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-2 outline-none rounded-t-lg"
                />
                {query && searchResults.length > 0 ? (
                  <ul className='max-h-52 overflow-y-auto'>
                    {searchResults.map(item => (
                      <li
                        key={item._id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setQuery(item.name);
                          setShowSearch(false);
                          setSearchResults([]);
                        }}
                      >
                        <div className='flex items-center gap-2'>
                          <Link to={`/product/${item._id}`} className='flex text-base'>
                            <img src={item.image?.[0]} className='w-5' alt={item.name} />
                            {item.name}
                          </Link>
                        </div>

                      </li>
                    ))}
                  </ul>
                ) : (
                  query && <p className="p-2 text-gray-500">No results found</p>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="hover:text-gray-600 cursor-pointer" />
            {getCartItemsCount() > 0 && (
              <span className="absolute -top-2 -right-3 bg-violet-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-md">
                {getCartItemsCount()}
              </span>
            )}
          </Link>

          {/* User login/logout */}
          {token ? (
            <Link
              to="/login"
              onClick={(e) => {
                e.preventDefault();
                if (window.confirm("Are you sure you want to logout?")) LogOut();
              }}
            >
              <FiLogOut color="red" className="hover:text-gray-600 cursor-pointer" />
            </Link>
          ) : (
            <Link to="/login">
              <FaUser className="hover:text-gray-600 cursor-pointer" />
            </Link>
          )}

          {/* Orders */}
          {token && (
            <Link to="/orders">
              <FiShoppingBag color="red" className="hover:text-gray-600 cursor-pointer" />
            </Link>
          )}

          {/* Mobile Menu */}
          <button className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-16 left-0 w-full bg-[#eb1c77] shadow-lg md:hidden"
          >
            <ul className="flex flex-col items-center gap-5 py-6 text-white text-base capitalize font-medium">
              {[{ path: "/", label: "Home" }, { path: "/women", label: "Women" }, { path: "/men", label: "Men" }, { path: "/collections", label: "Collections" }, { path: "/about", label: "About" }, { path: "/bulk", label: "Bulk" }, { path: "/track-order", label: "Track Order" }, { path: "/contact", label: "Contact" }].map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex flex-col items-center transition-all duration-300"
                >
                  {({ isActive }) => (
                    <>
                      <li>{item.label}</li>
                      <hr className={`border-none outline-none h-0.5 bg-white transition-all duration-500 ${isActive ? "w-3/5 opacity-100" : "w-0 opacity-0"}`} />
                    </>
                  )}
                </NavLink>
              ))}
            </ul>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
