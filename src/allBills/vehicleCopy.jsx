import React from 'react'
import Bill from "../assets/bill.jpg"
function VehicleCopy() {
  return (
    <div className='w-[100vw] flex justify-center items-center'>
    <img src={Bill} className='!w-[90vw] !h-[100vh]' alt='bill' /> 
    </div>
  )
}

export default VehicleCopy