import React, { useEffect, useRef, useState } from "react";
import image from "../assets/rock.png";
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
    <div className="bg-white w-screen pt-[15px] !h-[89vh] relative" style={{zIndex:999}}>
    <div className="w-[98vw] border m-auto border-black !h:[85vh]">
      <div className="flex  pl-10 pt-5 text-[14px]">
        <div>
          <Image src={image} preview={false} width={90} alt="logo" />
        </div>
        <div className="flex flex-col items-center w-[85%]">
          <p className="border-b-2 border-black">
            SUBJECT TO <strong>NAMAKKAL</strong> JURISDICTION
          </p>
          <h1 className="text-blue-800 text-[36px] font-bold">
            JAI BALAJI ROADWAYS
          </h1>
          <p>
            <strong> Super Jet Line Service for Tamilnadu, Karnataka, Maharashtra, Gujarat</strong>
          </p>
          <p>
            Shop No.1, H.No.:5-29/2, Near Railway Bridge, NH-44, THONDUPALLY(V), SHAMSHABAD(M), Ranga Reddy District- 509 325. HYDRABAD (Telangana.)
          </p>
          <p>Cell: 91525 25000, 91525 26000 E-Mail:hydjaibalaji@gmail.com</p>
        </div>
      </div>
      <div>
        <div className="flex items-center  gap-20">
        <span className="flex pl-8 !mt-[-5px]">
            <span className="">
              <pre className="uppercase"> Lorry no.</pre>
            </span>
            <input
              type="text"
              style={{ width: "20vw", borderColor: "black" }}
              defaultVaLUE={vehicleno}
              className="outline-none pl-10 !bg-transparent border-b-2 uppercase"
            />
          </span>
          <span className="text-blue-800 w-[140px] underline tracking-wider text-[14px] font-bold">
            <pre> ACCOUNT COPY</pre>
          </span>
          <span className="!pl-[5.8vw] flex">
            <span>L.R.No.</span>
            <input
              type="text"
              style={{ width: "10vw", borderColor: "black" }}
              defaultValue={gcNo}
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
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
          </span>
          <span className="flex">
            <span className="">To </span>
            <input
              type="text"
              style={{ width: "28vw", borderColor: "black" }}
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
          <span className="flex gap-2">
           <span>
           <span className="">Consignor:</span>
            <input
              type="text"
              style={{ width: "54vw", borderColor: "black" }}
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
           </span>
           <span>
           <span className="">GSTIN:</span>
            <input
              type="text"
              style={{ width: "20vw", borderColor: "black" }}
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
           </span>
           
          </span>
          <span className="flex gap-2">
            <span>
            <span className="">Consignee:</span>
            <input
              type="text"
              style={{ width: "54vw", borderColor: "black" }}
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
            </span>
            <span>
            <span className="">GSTIN:</span>
            <input
              type="text"
              style={{ width: "20vw", borderColor: "black" }}
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
            </span>
          </span>
        
        </div>
      </div>

      <div className="pt-3">
        <table className="border-t-2  m-auto w-[98vw]">
          <thead>
            <tr className="w-[98vw] text-center">
              <td
                colSpan={3}
                className="text-[14px] font-bold border-r-2 text-blue-600 py-1"
              >
                 TAMILNADU MERCANTILE BANK, NAMAKKAL BRANCH, NAMAKKAL. A/C No. 127900050900245
              </td>
              <td colSpan={3} className="text-[14px]  font-bold text-blue-600 py-1">
                IFSC Code:TMBL0000129
              </td>
            </tr>
          </thead>
          <tbody className="border-t-2 w-[98vw]">
            <tr className="text-center">
              <td className="border-r-2 w-[10vw]">No. of Articles</td>
              <td className="border-r-2">
                <p>Description of Goods</p>
                <span>(Said to contain as it where is)</span>
              </td>
              <td className="border-r-2">
                <p>Weight</p>
                <span>Kg. Gms</span>
              </td>
              <td className="border-r-2">Rate</td>
              <td className="border-r-2 px-4">Amount</td>
              <td>Remarks</td>
            </tr>
            <tr className="border-t-2 text-center">
              <td className="border-r-2" rowSpan={6}>
                {" "}
               
              </td>
              <td className="border-r-2"></td>
              <td className="border-r-2" rowSpan={6}>
              </td>
              <td className="border-r-2" rowSpan={6}>
                  
                </td>
                <td className="border-r-2" rowSpan={6}>

                </td>
              <td rowSpan={7} className="border-l-2">
                <div className="-rotate-90 flex flex-wrap  gap-1 w-[18vw] text-[13px]">
                  <p className="text-blue-600 flex pl-8">
                  </p>
                  <span className="uppercase">
                   
                  </span>
                </div>
              </td>
            </tr>
            <tr className=" h-[3vh]">
              <td className="border-r-2">
                {" "}
                <span className="text-blue-800 pl-2">

                  <span className="text-black"></span>
                </span>
              </td>
            </tr>
            <tr className="h-[3vh]">
              <td className="border-r-2">
                
              </td>
            </tr>
            <tr className="h-[3vh]">
              <td className="border-r-2">
                <span className="text-blue-800 pl-2">

                  <span className="text-black"></span>
                </span>
              </td>
            </tr>
            <tr className=" h-[3vh]">
              <td className="border-r-2">
                <span className="text-blue-800 pl-2">
                  <span className="text-black"></span>
                </span>
              </td>
            </tr>
            <tr className=" h-[3vh]">
              <td className="border-r-2">
                <span className="text-blue-800 pl-2">
                  <span className="text-black"></span>
                </span>
                <br />
                <span className="text-blue-800 pl-2">
                  <span className="text-black"></span>
                </span>
              </td>
            </tr>

            <tr className="border-t-2 text-center  h-[3vh]">
              <td className="border-r-2" colSpan={3}>
                <div className="grid grid-cols-2 uppercase text-[14px] font-bold">
                  <p>GST Payable By consignor/Consignee</p>
                  <p>Consigner should be insure their Goods</p>
                </div>
              </td>
              <td className="border-r-2">Total</td>
              <td>
              
              </td>
            </tr>
            <tr className="border-t-2 text-center">
              <td className="border-r-2" colSpan={1}>
                PAN NO.: BJTPS6814B
              </td>
              <td className="border-r-2" colSpan={3}>
                 E-WAY BILL REG.NO. 33BJTPS6814B1Z1 
              </td>
              <td colSpan={2} rowSpan={2}>
              <div className="flex flex-col gap-4">
                  <p className="text-blue-600">
                    For{" "}
                    <span className="uppercase font-semibold">
                      Jai Balaji Roadways
                    </span>
                  </p>
                  <p className="flex flex-col items-center justify-center">
                    <span>Booking Clerk</span>
                    </p>
                </div>
              </td>
            </tr>
            <tr className="border-t-2 text-center text-[13px]">
              <td className="border-r-2" colSpan={4}>
                <div className="uppercase text-[14px] font-bold">
                  <p> NOTE: G.C.Note Subject to conditions overleaf.</p>
                </div>
              </td>
              {/* <td className="border-r-2"></td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      style={{
        fontSize: "12vw",
        position: "absolute",
        top: "48vh",
        color: "#E0E0E0",
        fontWeight: 200,
        zIndex: -1,
        transform: "rotate(-40deg)",
      }}
      className="tracking-wider pl-28"
    >
      ORIGINAL
    </div>
  </div>
  );
}

export default VehicleBills;
