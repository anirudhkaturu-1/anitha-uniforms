import React from 'react'
import Hero from '../components/Hero/Hero'
import Logos from '../components/Logos/Logos'
import ShopByCategory from '../components/shopByCategory/ShopByCategory'
import BestSeller from '../components/BestSeller/BestSeller'
import Collections from '../components/Products/Collections'
import AboutOverView from '../components/AboutOverview/AboutOverView'
import BulkOrder from '../components/BulkOrder/BulkOrder'
import Delivered from '../components/Deliverd/Delivered'
import Logos2 from '../components/Logos/Logos2'
import Logos3 from '../components/Logos/Logos3'
import NewsLetter from '../components/NewsLetter/NewsLetter'
const Home = () => {
  return (
    <div>
        <Hero/>
        <Logos/> 
        <ShopByCategory/> 
        <Collections/> 
        <BestSeller/> 
        <AboutOverView/> 
        <BulkOrder/>
        <Delivered/>    
        <Logos2/>
        <Logos3/>
        <NewsLetter/>

    </div>
  )
}

export default Home