import React, { useEffect, useState, useRef } from 'react';
import Consignee from './Consignee';
import Conisgnor from './Conisgnor';
import VehicleCopy from './vehicleCopy';
import Driver from './driver';
import axios from 'axios';
import { get } from 'lodash';

function Ccv() {
  const [datas, setDatas] = useState([]);
  const [memo, setMemo] = useState([]);
  const [consignor, setConsignor] = useState([]);
  const [consignee, setConsignee] = useState([]);
  const [loading, setLoading] = useState([]);

  const printRef = useRef(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${process.env.REACT_APP_URL}/api/memodetails`);
      const result2 = await axios.get(`${process.env.REACT_APP_URL}/api/memo`);
      const result3 = await axios.get(`${process.env.REACT_APP_URL}/api/consignor`);
      const result4 = await axios.get(`${process.env.REACT_APP_URL}/api/consignee`);

      setConsignor(get(result3, 'data.message'));
      setDatas(get(result, 'data.message'));
      setMemo(get(result2, 'data.message'));
      setConsignee(get(result4, 'data.message'));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (loading === false) {
      printRef.current = true;
      setTimeout(() => {
        if (printRef.current) {
          window.print();
        }
      }, 1000);
    }

    return () => {
      printRef.current = false;
    };
  }, [loading]);

  return (
    <div>
      <Conisgnor memo={memo} consignor={consignor} consignee={consignee} datas={datas} />
      <Consignee memo={memo} consignee={consignee} consignor={consignor} datas={datas} />
      <Driver memo={memo} datas={datas} consignee={consignee} consignor={consignor}/>
      <VehicleCopy memo={memo} datas={datas} consignee={consignee} consignor={consignor}/>
     
    </div>
  );
}

export default Ccv;
