import React, { useEffect } from 'react'
import Bill from "../assets/bill.jpg"
function VehicleBills() {
    
    useEffect(() => {
      setTimeout(() => {
        window.print()
       },3000)
    })
  return (
   
    <div className='w-[100vw] flex items-center justify-center'>
    <img src={Bill} className='!w-[90vw] !h-[100vh]' alt='bill' /> 
    </div>
  )
}

export default VehicleBills