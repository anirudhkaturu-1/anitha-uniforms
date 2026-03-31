import React from 'react'
import DynamicHeropage from '../components/DynamicHeropage/DynamicHeropage'
import Address from '../components/ContactComponets/Address'
import ContactForm from '../components/ContactForm/ContactForm'

const Contact = () => {
  return (
    <div>
      <DynamicHeropage/>
       <Address/>
       <ContactForm/>
      </div>
  )
}

export default Contact