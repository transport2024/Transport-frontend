import React, { useEffect } from 'react'
import Bill from "../assets/bill.jpg"

function Conisgnor() {
 
  return (
    <div className='w-[100vw] flex items-center justify-center'>
    <img src={Bill} className='!w-[74vw] !h-[65vw]' alt='bill' /> 
    </div>
  )
}

export default Conisgnor