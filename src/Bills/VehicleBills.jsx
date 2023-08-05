import React, { useEffect, useRef, useState } from 'react';
import Bill from '../assets/bill.jpg';
import axios from 'axios';
import { get } from 'lodash';
import { useLocation, useNavigate } from 'react-router';

function VehicleBills() {
  const [datas, setDatas] = useState([]);
  const [filterDatas, setFilterDatas] = useState([]);
  const [date, setDate] = useState('');
  const [vehicleno, setVehicleNO] = useState('');
  const [gcNo, setGcNo] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const printRef = useRef(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${process.env.REACT_APP_URL}/api/memo`);
      setDatas(get(result, 'data.message'));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilterDatas(
      datas.filter((res) => {
        return res._id === location.pathname.split('/').splice(-1)[0];
      })[0]
    );
    setVehicleNO(filterDatas?.vehicleno);
    setDate(filterDatas?.date);
    setGcNo(filterDatas?.gcno);
  }, [datas, filterDatas, location]);

  useEffect(() => {
    const handleCancelPrint = () => {
      printRef.current = false;
    };

    document.addEventListener('click', handleCancelPrint);

    return () => {
      document.removeEventListener('click', handleCancelPrint);
    };
  }, []);

  useEffect(() => {
    if (loading === false) {
      printRef.current = true;
      setTimeout(() => {
        if (printRef.current) {
          window.print();
        }
      });
    }
  }, [loading]);

  

  return (
    <div className='w-[100vw] flex items-center justify-center relative'>
      <img src={Bill} className='!w-[90vw] !h-[100vh]' alt='bill' />
      <input
        type='text'
        className='absolute left-[24vw] top-[29vh] bg-transparent text-black font-semibold outline-none'
        defaultValue={vehicleno}
      />
      <div className='absolute right-[8vw] top-[26.5vh] flex flex-col'>
        <input
          type='date'
          className='bg-transparent text-black font-semibold outline-none !text-[11px]'
          defaultValue={date}
        />
        <input
          type='text'
          className='placeholder:hidden bg-transparent text-black font-semibold outline-none !text-[11px] !mt-[-5px]'
          defaultValue={gcNo}
        />
      </div>
    </div>
  );
}

export default VehicleBills;
