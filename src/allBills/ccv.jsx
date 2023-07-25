import React, { useEffect } from 'react'
import Consignee from './Consignee'
import Conisgnor from './Conisgnor'
import VehicleCopy from './vehicleCopy'
import Driver from './driver'

function Ccv() {

  useEffect(() => {
    setTimeout(() => {
      window.print()
   },4000)
  })
  return (
    <div>
      <Conisgnor /> 
      <Consignee />
      <VehicleCopy />
      <Driver/> 
    
    </div>
  )
}

export default Ccv