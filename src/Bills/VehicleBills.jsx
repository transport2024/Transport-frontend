import React, { useEffect, useRef, useState } from "react";
import image from "../assets/balaji.png";
import axios from "axios";
import { get } from "lodash";
import { useLocation } from "react-router";
import { Divider, Image, Table } from "antd";
import { useSelector } from "react-redux";

function VehicleBills() {
  const [datas, setDatas] = useState([]);
  const [filterDatas, setFilterDatas] = useState([]);
  const [date, setDate] = useState("");
  const [vehicleno, setVehicleNO] = useState("");
  const [gcNo, setGcNo] = useState("");
  const location = useLocation();
  const userId=useSelector((state)=>state.user?.user?.userId)
 

  const [loading, setLoading] = useState(true);
  const printRef = useRef(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`${process.env.REACT_APP_URL}/api/memo?userId=${userId}`);
      setDatas(get(result, "data.message"));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilterDatas(
      datas?.filter((res) => {
        return res._id === location.pathname.split("/").splice(-1)[0];
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

    document.addEventListener("click", handleCancelPrint);

    return () => {
      document.removeEventListener("click", handleCancelPrint);
    };
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
    <div className="bg-white w-screen pt-2 h-[90vh] lg:h-[100vh]">
      <div className="w-[98vw] border m-auto border-black !h:[88vh] lg:!h-[98vh] ">
        <div className="flex  pl-10 pt-10 text-[14px]">
          <div>
            <Image src={image} width={90} alt="logo" />
          </div>
          <div className="flex flex-col items-center w-[85%]">
            <p className="border-b-2 border-black">
              SUBJECT TO <strong>NAMAKKAL</strong> JURISDICTION
            </p>
            <h1 className="text-red-800 text-[36px] font-bold">
              ROCK FORT ROADWAYS
            </h1>
            <p>
              <strong>Transport Contractors</strong>
            </p>
            <p>
              No.4/181,Plot No. 8,1st Floor Sri Ram Tower,Thuraiyur Road,Anna
              Nagar,NAMAKKAL-637 002
            </p>
            <p>Cell:91525 26000, 91525 28000 E-Mail:rajshreekl@gmail.com</p>
          </div>
        </div>
        <div>
          <div className="flex items-center  gap-20">
            <span className="flex pl-8 !mt-[-5px]">
              <span className=""><pre> Lorry no.</pre></span>
              <input
                type="text"
                style={{ width: "25vw", borderColor: "black" }}
                defaultValue={filterDatas?.vehicleno}
                className="outline-none pl-10 !bg-transparent border-b-2"
              />
            </span>
            <span className="text-red-800 w-[140px] underline tracking-wider text-[14px] font-bold">
             <pre> CONSIGNOR COPY</pre>
            </span>
            <span className="!ml-[-55px] flex">
              <span>L.R.No.</span>
              <input
                type="text"
                style={{ width: "10vw", borderColor: "black" }}
                defaultValue={filterDatas?.gcno}
                className="outline-none pl-2 !bg-transparent border-non3"
              />
            </span>
          </div>
          <div className="flex pl-10 items-center  gap-5">
            <span className="flex">
              <span className="">From</span>
              <input
                type="text"
                style={{ width: "28vw", borderColor: "black" }}
                // defaultValue={inputs.lorryno}
                className="outline-none pl-10 !bg-transparent border-b-2"
              />
            </span>
            <span className="flex">
              <span className="">To </span>
              <input
                type="text"
                style={{ width: "28vw", borderColor: "black" }}
                // defaultValue={inputs.lorryno}
                className="outline-none pl-10 !bg-transparent border-b-2"
              />
            </span>
            <span className="flex">
              <span className="">Date</span>
              <input
                type="text"
                style={{ width: "18vw", borderColor: "black" }}
                defaultValue={date}
                className="outline-none pl-10 !bg-transparent border-b-2"
              />
            </span>
          </div>
          <div className="flex flex-col pl-10 justify-center gap-2 pt-2">
            <span className="flex">
              <span className="">Consignor:</span>
              <input
                type="text"
                style={{ width: "80vw", borderColor: "black" }}
                // defaultValue={inputs.lorryno}
                className="outline-none pl-10 !bg-transparent border-b-2"
              />
            </span>
            <span className="flex">
              <span className="">Consignee:</span>
              <input
                type="text"
                style={{ width: "80vw", borderColor: "black" }}
                // defaultValue={inputs.lorryno}
                className="outline-none pl-10 !bg-transparent border-b-2"
              />
            </span>
            <span className="flex">
              <span className="">Delivery at:</span>
              <input
                type="text"
                style={{ width: "25vw", borderColor: "black" }}
                // defaultValue={inputs.lorryno}
                className="outline-none pl-10 !bg-transparent border-b-2"
              />
            </span>
          </div>
        </div>

        <div className="pt-5">
          <table className="border-t-2  m-auto w-[98vw]">
            <thead>
              <tr className="w-[98vw] text-center">
                <td colSpan={3} className="text-[12px] border-r-2 text-red-600 py-1">
                  INDIAN BANK, PALAPATTI BRANCH, NAMAKKAL. A/C No. 7669590442
                </td>
                <td colSpan={3} className="text-[12px] text-red-600 py-1">
                  IFSC Code: IDIB000P092
                </td>
              </tr>
            </thead>
            <tbody className="border-t-2 w-[98vw]">
              <tr className="text-center">
                <td className="border-r-2">No. of Articals</td>
                <td className="border-r-2">
                  <p>Description of Goods</p>
                  <span>(Said to contain as it where is)</span>
                </td>
                <td className="border-r-2">
                  <p>Weight</p>
                  <span>Kg. Gms</span>
                </td>
                <td className="border-r-2">Rate</td>
                <td className="border-r-2">Amount</td>
                <td>Remarks</td>
              </tr>
              <tr className="border-t-2 text-center">
                <td className="border-r-2" rowSpan={6}></td>
                <td className="border-r-2"></td>
                <td className="border-r-2" rowSpan={6}>As per bill</td>
                <td className="border-r-2" rowSpan={6}></td>
                <td className="border-r-2" rowSpan={6}></td>
                <td rowSpan={7} className="border-l-2">
                  <div className="-rotate-90 flex flex-wrap w-[18vw] text-[13px]">
                  <p className="text-red-600 flex items-center justify-center pl-16">Note:</p>
                  <span className="uppercase font-semibold">Do not pay lorry foreight to driver/owner only our transport account</span>
                  </div>
                </td>
               
              </tr>
              <tr className="text-center h-[3vh]">
              
                <td className="border-r-2"></td>
              
              </tr>
              <tr className=" text-center  h-[3vh]">
          
                <td className="border-r-2"></td>
               
               
              </tr>
              <tr className=" text-center  h-[3vh]">
               
                <td className="border-r-2"></td>
                
              </tr>
              <tr className=" text-center  h-[3vh]">
                <td className="border-r-2"></td>
              </tr>
              <tr className="text-center  h-[3vh]">
                <td className="border-r-2"></td>
              </tr>
        
              <tr className="border-t-2 text-center  h-[3vh]">
                <td className="border-r-2" colSpan={3}>
                  <div className="grid grid-cols-2 uppercase text-[14px] font-bold">
                    <p>Goods to be insured by party</p>
                    <p>Director/door delivery</p>
                    <p>GST Payable By &nbsp;&nbsp;&nbsp;&nbsp;consignor</p>
                    <p>Consignee</p>
                  </div>
                </td>
                <td className="border-r-2">Total</td>
              </tr>
              <tr className="border-t-2 text-center">
                <td className="border-r-2" colSpan={1}>PAY NO.:BBQPA7235R</td>
                <td className="border-r-2" colSpan={3}>E-WAY BILL REG.NO. 33BBQPA7235R1Z5</td>
                <td colSpan={2} rowSpan={2}>
                  <div className="flex flex-col gap-8">
                    <p className="text-red-600">For <span className="uppercase font-semibold">Rockport roadways</span></p>
                    <p>Booking Clerk</p>
                  </div>
                </td>
             
               
              </tr>
              <tr className="border-t-2 text-center text-[13px]">
                <td className="border-r-2" colSpan={3}>
                  <div>
                  <p>  NOTE: G.C.Note Subject to conditions overleaf.</p>
                  <p>The consignor has expressly declared that the above particulars furnished by him or his agent are correct.  </p>
                  <p>No prohibited goods or articles are included and that is fully aware or and accepts the conditions of carries given on the back side of the consignment receipt.  <span className="uppercase pl-2 p-2 mt-2 text-red-600 font-bold text-[12px]">Good's booked under owner's risk</span></p>
                  </div>
                </td>
                <td className="border-r-2" >Total</td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VehicleBills;
