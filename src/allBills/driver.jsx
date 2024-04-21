import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import image from "../assets/rock.png";
import sign from "../assets/sign.png";
import { Image } from "antd";

function Driver(props) {
  const { memo, datas,consignee,consignor } = props;
  const [filterDatas, setFilterDatas] = useState([]);
  const location = useLocation();
  const [inputs, setInputs] = useState([]);
  const [filterMemo, setFilterMemo] = useState([]);
  const [filterConsignor, setfilterConsignor] = useState([]);
  const [filterConsignee,setFilterConsignee]=useState([])

  useEffect(() => {
    setFilterDatas(
      datas.filter((res) => {
        return res._id === location.pathname.split("/").splice(-1)[0];
      })[0]
    );

    setFilterMemo(
      memo.filter((res) => {
        return res._id === filterDatas?.memoId;
      })[0]
    );

    setfilterConsignor(
      consignor.filter((res) => {
        return res.name === filterDatas?.consignor;
      })[0]
    );

    setFilterConsignee(
      consignee.filter((res) => {
        return res.name === filterDatas?.consignee;
      })[0]
    )



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
      prnoto:filterDatas?.Prnoto,
      prnofrom: filterDatas?.prnoform,
      gcno: filterMemo?.gcno,
      gctin1: filterConsignor?.gstno,
      gctin2:filterConsignee?.gstno,
      date: filterMemo?.date,
      lorryno: filterMemo?.vehicleno,
      accountpaid: filterDatas?.accountpaid,
      bales: filterDatas?.quantity,
    });
  }, [datas, filterDatas, memo, filterMemo,consignee,consignee]);


  return (
    <div
      className="bg-white w-screen !pt-[35px] !h-[89vh] relative"
      style={{ zIndex: 999 }}
    >
      <div className="w-[98vw] border m-auto border-black h:[85vh] ">
        <div className="flex  pl-10 pt-2 text-[14px]">
          <div>
            <Image src={image} preview={false} width={90} alt="logo" />
          </div>
          <div className="flex flex-col items-center w-[85%]">
            <p className="border-b-2 border-black">
              SUBJECT TO <strong>NAMAKKAL</strong> JURISDICTION
            </p>
            <h1 className="text-blue-800 text-[30px] font-bold">
              JAI BALAJI ROADWAYS
            </h1>
            <p>
              <strong> Super Jet Line Service for Tamilnadu, Karnataka, Maharashtra, Gujarat </strong>
            </p>
            <p>
Shop No.1, H.No.:5-29/2, Near Railway Bridge, NH-44, THONDUPALLY(V), SHAMSHABAD(M), Ranga Reddy District- 509 325. HYDRABAD (Telangana.)
</p>
            <p> Cell: 91525 25000, 91525 26000 E-Mail:rajshreenkl@gmail.com </p>
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
              defaultValue={inputs?.lorryno}
              className="outline-none pl-10 !bg-transparent border-b-2 uppercase"
            />
          </span>
            <span className="text-blue-800 w-[140px] underline tracking-wider text-[14px] font-bold">
              <pre> DRIVER COPY</pre>
            </span>
            <span className="!pl-[5.8vw] flex">
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
                  style={{ width: "54vw", borderColor: "black" }}
                  defaultValue={inputs.consignor}
                  className="outline-none pl-10 !bg-transparent border-b-2"
                />
              </span>
              <span>
                <span className="">GSTIN:</span>
                <input
                  type="text"
                  style={{ width: "20vw", borderColor: "black" }}
                  defaultValue={inputs.gctin1}
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
                  defaultValue={inputs.consignee}
                  className="outline-none pl-10 !bg-transparent border-b-2"
                />
              </span>
              <span>
                <span className="">GSTIN:</span>
                <input
                  type="text"
                  style={{ width: "20vw", borderColor: "black" }}
                  defaultValue={inputs.gctin2}
                  className="outline-none pl-10 !bg-transparent border-b-2"
                />
              </span>
            </span>
            
          </div>
        </div>

        <div className="pt-5">
          <table className="border-t-2  m-auto w-[98vw]">
            <thead>
              <tr className="w-[98vw] text-center">
                <td
                  colSpan={3}
                  className="text-[14px] font-bold border-r-2 text-blue-600 py-1"
                >
                   TAMILNADU MERCANTILE BANK, NAMAKKAL BRANCH, NAMAKKAL. A/C No. 127900050900245
                </td>
                <td
                  colSpan={3}
                  className="text-[14px]  font-bold text-blue-600 py-1"
                >
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
                  {inputs.bales}
                </td>
                <td className="border-r-2"></td>
                <td className="border-r-2" rowSpan={6}>
                  As per bill
                </td>
                <td className="border-r-2" rowSpan={6}>
                  {filterDatas?.memomethod === "No"
                    ? "As per contract"
                    : inputs.accountpaid === "fixed"
                    ? "Fixed"
                    : filterDatas?.lramount / inputs.bales + "*" + inputs.bales}
                </td>
                <td className="border-r-2" rowSpan={6}>

                      {filterDatas?.memomethod === "No"
                  ? "As per contract"
                  : filterDatas?.lramount/inputs?.bales*inputs?.bales}
                </td>
                <td rowSpan={7} className="border-l-2">
                <div className="-rotate-90 flex flex-wrap  gap-1 w-[18vw] text-[13px]">
                  <p className="text-red-600 flex pl-8">
                    Note:
                  </p>
                  <span className="uppercase">
                    {" "}
                    {inputs.accountpaid === "Party" ||
                    inputs.accountpaid === "fixed" ? (
                      <span className="w-[30vw] text-balck">
                        Please Pay Lorry Freight Amount In Favour Of
                        <br /> Jai Balaji Roadways Account
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
                  {" "}
                  <span className="text-blue-800 pl-2">
                    Lot No. :&nbsp;&nbsp;&nbsp;
                    <span className="text-black">{inputs.lotno}</span>
                  </span>
                </td>
              </tr>
              <tr className="h-[3vh]">
                <td className="border-r-2">
                  <span className="text-blue-800 pl-2">
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
                  <span className="text-blue-800 pl-2">
                    Inv. No. :&nbsp;&nbsp;&nbsp;
                    <span className="text-black">{inputs.invoice}</span>
                  </span>
                </td>
              </tr>
              <tr className=" h-[3vh]">
                <td className="border-r-2">
                  <span className="text-blue-800 pl-2">
                    Value of Goods. :&nbsp;&nbsp;&nbsp;
                    <span className="text-black">{inputs.value}</span>
                  </span>
                </td>
              </tr>
              <tr className=" h-[3vh]">
                <td className="border-r-2">
                  <span className="text-blue-800 pl-2">
                    Quality:&nbsp;&nbsp;&nbsp;
                    <span className="text-black">{inputs.quality}</span>
                  </span>
                  <br />
                  <span className="text-blue-800 pl-2">
                    P Marks:&nbsp;&nbsp;&nbsp;
                    <span className="text-black">{inputs.pmark}</span>
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
                {filterDatas?.memomethod === "No"
                  ? "As per contract"
                  : filterDatas?.lramount/inputs?.bales*inputs?.bales}
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
  Jai Balaji Roadways                      </span>
                    </p>
                    <p className="flex flex-col items-center justify-center">
                      <Image
                        src={sign}
                        preview={false}
                        width={100}
                        className="text-center"
                      />
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
          fontSize: "15vw",
          position: "absolute",
          top: "38vh",
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

export default Driver;
