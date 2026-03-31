import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Women from './Pages/Women'
import Men from './Pages/Men'
import Bulk from './Pages/Bulk'
import Login from './Pages/Login'
import Cart from './Pages/Cart'
import Contact from './Pages/Contact'
import TrackOrder from './Pages/TrackOrder'
import Navbar from './components/Navbar/Navbar'
import Child from './Pages/Child'
import Product from './Pages/Product'
import Collections from './Pages/Collections'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop'
import PlaceOrder from './Pages/PlaceOrder'
import Orders from './Pages/Orders'
import Loading from './components/Loading'
import { useState } from 'react'


const App = () => {

  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
 const location = useLocation();


  useEffect(() => {
    const timer = setTimeout(()=>{
      setLoading(false);
    },1000);
    return()=>{
      clearTimeout(timer);}
  }, [loading]);

  useEffect(() => {
    setPageLoading(true);
    const timer2 = setTimeout(() => {
      setPageLoading(false);
    }, 800);

    // const handlePageLoading = () => {
      
    // }

    
 
  }, [location.pathname]);


  return (
    <div>
      {
        loading ? <Loading /> :
          <div>
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/women' element={<Women />}></Route>
              <Route path='/men' element={<Men />}></Route>
              <Route path='/child' element={<Child />}></Route>
              <Route path='/product/:id' element={<Product />}></Route>
              <Route path='/collections' element={<Collections />}></Route>
              <Route path='/bulk' element={<Bulk />}></Route>
              <Route path='/contact' element={<Contact />}></Route>
              <Route path='/track-order' element={<TrackOrder />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/cart' element={<Cart />}></Route>
              <Route path='/place-order' element={<PlaceOrder />} ></Route>
              <Route path='/orders' element={<Orders />}> </Route>
            </Routes>
            <Footer />

          </div>

      }

    </div>
  )
}

export default App