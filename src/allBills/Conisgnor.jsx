/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import image from "../assets/rock.jpeg";
import sign from "../assets/sign.png";
import { useLocation } from "react-router";
import { Image } from "antd";

function Conisgnor(props) {
  const { memo, datas, consignor, consignee } = props;
  const [filterDatas, setFilterDatas] = useState([]);
  const location = useLocation();
  const [inputs, setInputs] = useState([]);
  const [filterMemo, setFilterMemo] = useState([]);
  const [filterConsignor, setfilterConsignor] = useState([]);
  const [filterConsignee, setFilterConsignee] = useState([]);

  useEffect(() => {
    setFilterDatas(
      datas?.filter((res) => {
        return res._id === location.pathname.split("/").splice(-1)[0];
      })[0]
    );

    setFilterMemo(
      memo?.filter((res) => {
        return res._id === filterDatas?.memoId;
      })[0]
    );
    setfilterConsignor(
      consignor?.filter((res) => {
        return res.name === filterDatas?.consignor;
      })[0]
    );

    setFilterConsignee(
      consignee?.filter((res) => {
        return res.name === filterDatas?.consignee;
      })[0]
    );

    setInputs({
      consignor: filterDatas?.consignor,
      consignee: filterDatas?.consignee,
      quality: filterDatas?.quality,
      pmark: filterDatas?.pressmark,
      from: filterDatas?.locationfrom,
      to: filterDatas?.locationto,
      value: filterDatas?.valueofgoods,
      invoice: filterDatas?.invoiceno,
      lotno: filterDatas?.lotno,
      prnoto: filterDatas?.Prnoto,
      prnofrom: filterDatas?.prnoform,
      gcno: filterMemo?.gcno,
      date: filterMemo?.date,
      lorryno: filterMemo?.vehicleno,
      gctin1: filterConsignor?.gstno,
      gctin2: filterConsignee?.gstno,
      accountpaid: filterDatas?.accountpaid,
      bales: filterDatas?.quantity,
    });
  }, [
    datas,
    filterDatas,
    memo,
    consignor,
    filterConsignor,
    filterMemo,
    consignee,
  ]);


  return (
    <div className="bg-white w-screen pt-[15px] !h-[100vh] relative" style={{zIndex:999}}>
    <div className="w-[98vw] border m-auto border-black !h:[85vh]">
      <div className="flex  pl-10 pt-2 text-[14px]">
        <div>
          <Image src={image} preview={false} width={90} alt="logo" />
        </div>
        <div className="flex flex-col items-center w-[85%]">
          <p className="border-b-2 border-black">
            SUBJECT TO <strong>NAMAKKAL</strong> JURISDICTION
          </p>
          <h1 className="text-red-800 text-[30px] font-bold">
            ROCK FORT ROADWAYS
          </h1>
          <p>
            <strong>Transport Contractors</strong>
          </p>
          <p>
            No.4/181,Plot No. 8,1st Floor Sri Ram Tower,Thuraiyur Road,Anna
            Nagar,NAMAKKAL-637 002
          </p>
          <p>Cell:91525 26000, 91525 28000 E-Mail:rajshreenkl@gmail.com</p>
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
              style={{ width: "25vw", borderColor: "black" }}
              defaultValue={inputs?.lorryno}
              className="outline-none pl-10 !bg-transparent border-b-2 uppercase"
            />
          </span>
          <span className="text-red-800 w-[140px] underline tracking-wider text-[14px] font-bold">
            <pre> CONSIGNOR COPY</pre>
          </span>
          <span className="pl-[5.8vw] flex">
            <span>L.R.No.</span>
            <input
              type="text"
              style={{ width: "10vw", borderColor: "black" }}
              defaultValue={inputs?.gcno}
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
              defaultValue={inputs?.from}
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
          </span>
          <span className="flex">
            <span className="">To </span>
            <input
              type="text"
              style={{ width: "28vw", borderColor: "black" }}
              defaultValue={inputs?.to}
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
          </span>
          <span className="flex">
            <span className="">Date</span>
            <input
              type="text"
              style={{ width: "18vw", borderColor: "black" }}
              defaultValue={inputs?.date}
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
              style={{ width: "38vw", borderColor: "black" }}
              defaultValue={inputs.consignor}
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
           </span>
           <span>
           <span className="">GSTIN:</span>
            <input
              type="text"
              style={{ width: "36vw", borderColor: "black" }}
              defaultValue={inputs.gctin2}
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
           </span>
           
          </span>
          <span className="flex gap-2">
            <span>
            <span className="">Consignee:</span>
            <input
              type="text"
              style={{ width: "38vw", borderColor: "black" }}
              defaultValue={inputs.consignee}
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
            </span>
            <span>
            <span className="">GSTIN:</span>
            <input
              type="text"
              style={{ width: "36vw", borderColor: "black" }}
              defaultValue={inputs.gctin2}
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
            </span>
          </span>
          <span className="flex">
           <span>
           <span className="">Delivery at:</span>
            <input
              type="text"
              style={{ width: "25vw", borderColor: "black" }}
              // defaultValue={inputs.lorryno}
              className="outline-none pl-10 !bg-transparent border-b-2"
            />
          </span>
           </span>
        </div>
      </div>

      <div className="pt-2">
        <table className="border-t-2  m-auto w-[98vw]">
          <thead>
            <tr className="w-[98vw] text-center">
              <td
                colSpan={3}
                className="text-[14px] font-bold border-r-2 text-red-600 py-1"
              >
                INDIAN BANK, PALAPATTI BRANCH, NAMAKKAL. A/C No. 7669590442
              </td>
              <td colSpan={3} className="text-[14px]  font-bold text-red-600 py-1">
                IFSC Code: IDIB000P092
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
                {inputs.bales}
              </td>
              <td className="border-r-2"></td>
              <td className="border-r-2" rowSpan={6}>
                As per bill
              </td>
              <td className="border-r-2" rowSpan={6}>
                {" "}
                {filterDatas && inputs && inputs.bales && inputs.bales !== 0
                  ? inputs.accountpaid === "fixed"
                    ? "Fixed"
                    : filterDatas.lramount / inputs.bales + "*" + inputs.bales
                  : ""}
              </td>
              <td className="border-r-2" rowSpan={6}>
                {filterDatas?.lramount &&
                  (filterDatas?.lramount / inputs?.bales) * inputs?.bales}
              </td>
              <td rowSpan={7} className="border-l-2">
                <div className="-rotate-90 flex flex-wrap  gap-1 w-[18vw] text-[13px]">
                  <p className="text-red-600 flex pl-8">
                    Note:
                  </p>
                  <span className="uppercase">
                    {inputs.accountpaid === "Party" ||
                    inputs.accountpaid === "fixed" ? (
                      <span className="w-[30vw] text-balck">
                        Please Pay Lorry Freight Amount In Favour Of
                        <br /> Rock Fort Roadways Account
                      </span>
                    ) : (
                      <p>{inputs.accountpaid}</p>
                    )}
                  </span>
                </div>
              </td>
            </tr>
            <tr className=" h-[3vh]">
              <td className="border-r-2">

                <span className="text-red-800 pl-2">
                  Lot No. :&nbsp;&nbsp;&nbsp;
                  <span className="text-black">{inputs.lotno}</span>
                </span>
              </td>
            </tr>
            <tr className="h-[3vh]">
              <td className="border-r-2">
                <span className="text-red-800 pl-2">
                  P.R.NO. :&nbsp;&nbsp;&nbsp;
                  <span className="text-black">
                    {inputs.prnofrom}&nbsp;{inputs.prnofrom ? "to" : ""}&nbsp;
                    {inputs.prnoto}
                  </span>
                </span>
              </td>
            </tr>
            <tr className="h-[3vh]">
              <td className="border-r-2">
                <span className="text-red-800 pl-2">
                  Inv. No. :&nbsp;&nbsp;&nbsp;
                  <span className="text-black">{inputs.invoice}</span>
                </span>
              </td>
            </tr>
            <tr className=" h-[3vh]">
              <td className="border-r-2">
                <span className="text-red-800 pl-2">
                  Value of Goods. :&nbsp;&nbsp;&nbsp;
                  <span className="text-black">{inputs.value}</span>
                </span>
              </td>
            </tr>
            <tr className=" h-[3vh]">
              <td className="border-r-2">
                <span className="text-red-800 pl-2">
                  Quality:&nbsp;&nbsp;&nbsp;
                  <span className="text-black">{inputs.quality}</span>
                </span>
                <br />
                <span className="text-red-800 pl-2">
                  P Marks:&nbsp;&nbsp;&nbsp;
                  <span className="text-black">{inputs.pmark}</span>
                </span>
              </td>
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
              <td>
              
                {filterDatas?.lramount &&
                  (filterDatas?.lramount / inputs?.bales) * inputs?.bales}
              </td>
            </tr>
            <tr className="border-t-2 text-center">
              <td className="border-r-2" colSpan={1}>
                PAN NO.:BBQPA7235R
              </td>
              <td className="border-r-2" colSpan={3}>
                E-WAY BILL REG.NO. 33BBQPA7235R1Z5
              </td>
              <td colSpan={2} rowSpan={2}>
                <div className="flex flex-col gap-4">
                  <p className="text-red-600">
                    For{" "}
                    <span className="uppercase font-semibold">
                      Rockport roadways
                    </span>
                  </p>
                  <p className="flex flex-col items-center justify-center">
                  <Image src={sign} preview={false} width={100} className="text-center"/>
                    <span>Booking Clerk</span>
                    </p>
                </div>
              </td>
            </tr>
            <tr className="border-t-2 text-center text-[13px]">
              <td className="border-r-2" colSpan={4}>
                <div>
                  <p> NOTE: G.C.Note Subject to conditions overleaf.</p>
                  <p>
                    The consignor has expressly declared that the above
                    particulars furnished by him or his agent are correct.{" "}
                  </p>
                  <p>
                    No prohibited goods or articles are included and that is
                    fully aware or and accepts the conditions of carries given
                    on the back side of the consignment receipt.{" "}
                    <span className="uppercase pl-2 p-2 mt-2 text-red-600 font-bold text-[12px]">
                      Good's booked under owner's risk
                    </span>
                  </p>
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

export default Conisgnor;
