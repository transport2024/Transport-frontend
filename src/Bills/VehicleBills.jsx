import React, { useEffect, useState } from 'react'
import Bill from "../assets/bill.jpg"
import axios from 'axios';
import { get } from 'lodash';
import { useLocation, useNavigate } from 'react-router';
function VehicleBills() {
  const [datas, setDatas] = useState([])
  const [filterDatas, setFilterDatas] = useState([])
  const [date,setDate]=useState("")
  const [vehicleno,setVehicleNO]=useState("")
  const [gcNo,setGcNo]=useState("")
  const location = useLocation()
  const navigate=useNavigate()
  
  
  const fetchData = async() => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/api/memo`
      );
     setDatas(get(result,"data.message"))
    } catch (e) {
      console.log(e)
    }
  }


  useEffect(() => {
    fetchData()
   
  }, [])

  useEffect(() => {
    setFilterDatas(datas.filter(res => {
      return res._id === location.pathname.split('/').splice(-1)[0]
    })[0])
    setVehicleNO(filterDatas?.vehicleno)
    setDate(filterDatas?.date)
    setGcNo(filterDatas?.gcno)

    if (location.pathname.split('/').includes("vehicleBill")) {
      setTimeout(() => {
        window.print()
      }, 3000)
    
    }
    
    else {
        return
    }
  },[datas,filterDatas])
  
  console.log(filterDatas, "pooooo")
  console.log(vehicleno,date,gcNo)
  
    useEffect(() => {
      console.log(location.pathname.split('/'))
    },[location])
    console.log(location.pathname.split('/'))

  return (
   
    <div className='w-[100vw] flex items-center justify-center relative'>
      <img src={Bill} className='!w-[90vw] !h-[100vh]' alt='bill' /> 
      <input type='text' className=' absolute left-[24vw] top-[29vh]  bg-transparent text-black font-semibold outline-none' defaultValue={vehicleno}/>
      <div className='absolute right-[9vw] top-[26.4vh] flex flex-col '>
      <input type='date' className='  bg-transparent text-black font-semibold outline-none !text-[11px]' defaultValue={date} />
      <input type='text' className='placeholder:hidden  bg-transparent text-black font-semibold outline-none !text-[11px] !mt-[-5px]' defaultValue={gcNo}/>
      </div>
    </div>
  )
}

export default VehicleBills