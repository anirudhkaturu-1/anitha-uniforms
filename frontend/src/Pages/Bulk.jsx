import React from 'react'
import DynamicHeropage from '../components/DynamicHeropage/DynamicHeropage'
import Delivered from '../components/Deliverd/Delivered'
import Logos2 from '../components/Logos/Logos2'
import Logos3 from '../components/Logos/Logos3'
import BulkOrderForm from '../components/BulkOrderForm/BulkOrderForm'

const Bulk = () => {
  return (
    <div>
      <DynamicHeropage/>
      <Delivered/>
      <Logos2/>
      <Logos3/>
      <BulkOrderForm/>

      </div>
  )
}

export default Bulk