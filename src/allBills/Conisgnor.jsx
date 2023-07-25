import React, { useEffect } from 'react'
import Bill from "../assets/bill.jpg"

function Conisgnor() {
 
  return (
    <div className='w-[100vw] flex items-center justify-center'>
    <img src={Bill} className='!w-[90vw] !h-[100vh]' alt='bill' /> 
    </div>
  )
}

export default Conisgnor