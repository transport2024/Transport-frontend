import React, { useEffect, useState } from "react";
import Bill from "../assets/bill.jpg";
import { useLocation } from "react-router";
import image from "../assets/balaji.png";

function VehicleCopy(props) {
const {memo,datas}=props
  const [filterDatas, setFilterDatas] = useState([]);
  const location = useLocation();
  const [inputs, setInputs] = useState([]);
  const [filterMemo,setFilterMemo]=useState([])


  useEffect(() => {
    setFilterDatas(
      datas.filter((res) => {
        return res._id === location.pathname.split("/").splice(-1)[0];
      })[0]
    );

setFilterMemo(
  memo.filter((res)=>{
    return res._id===filterDatas?.memoId
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
      prno: filterDatas?.prnoform,
      gcno:filterMemo?.gcno,
      date:filterMemo?.date,
      lorryno:filterMemo?.vehicleno,
      bales:filterDatas?.quantity,
      accountpaid: filterDatas?.accountpaid,
    
    });
  }, [datas, filterDatas,memo,filterMemo]);
 
//  console.log(filterMemo,"ll")
//  console.log(filterDatas,"pp")


  return (
    <div className="!w-[97vw] !h-[100vh]" style={{height:"100vh",fontSize:"12.5px",position:"relative",fontFamily:"highgate-variable",zIndex:999,padding:"10px",color:"black"}}>
    <div className="flex w-[100%]  justify-end" style={{gap:"20vw"}}>
      <div className="uppercase underline  tracking-wider text-red-500 font-semibold" style={{fontSize:"15px"}}>
        subject to <span className="text-black">namakkal</span> jurisdication
      </div>
      <div className="uppercase underline tracking-wider text-red-500 font-semibold">
        consignor copy
      </div>
    </div>
    <div
      className="pl-5 flex gap-10 items-center"
      style={{ marginTop: "-20px" }}
    >
      <img src={image} width={90} height={50} />
      <h1 className="uppercase text-5xl  font-extrabold text-green-700 pt-6">
        jai balaji transport service
      </h1>
    </div>
    <div>
      <div className="capitalize pl-5 font-semibold text-[14px] tracking-wider pl-">
        <span className="text-red-500">H.O.&nbsp;</span>
        :&nbsp;no.4/181,:&nbsp;plot no.8,&nbsp;1st floor,&nbsp;sri ram
        tower,thuraiyur road,&nbsp;anna nagar,&nbsp;namakkal-637
        002.[T.N].&nbsp;
        <span className="text-red-500">cell&nbsp;9152528000</span>{" "}
      </div>
      <div className="capitalize  pl-5 font-semibold text-[14px] tracking-wider pl-">
        <span className="text-red-500">B.O.&nbsp;</span>:&nbsp;shop no
        1,:&nbsp;h.No:&nbsp;5-29/2,&nbsp;near railway bridge,&nbsp;NH-44
        thondupally[V],&nbsp;shamshabad[m],
        <br />
        <span className="pl-9">
          &nbsp;ranga reddy
          dist.-509325,&nbsp;hyderabad,&nbsp;telangana.&nbsp;
          <span>Cell&nbsp;9152526000</span>{" "}
        </span>
      </div>
      <div className="capitalize pl-5 font-semibold text-[14px] tracking-wider pl-">
        <span className="text-red-500">B.O.&nbsp;</span>
        :&nbsp;opp.Shivsudha&nbsp;Milk diary,&nbsp;adgaon phata,&nbsp;beed road&nbsp;AURANGABAD[M.S]&nbsp;-&nbsp;431 010
        <span className="text-red-500">cell&nbsp;9152527000</span>
      </div>
    </div>
    <div className="font-bold flex justify-center " style={{ gap: "20vw" }}>
      <div className="text-red-500 ">Email:jbtsnkl@gmail.comwbehb</div>
      <div className="flex flex-col pt-8">
        <div>
          <span className="text-red-500">
            Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
          </span>
          {inputs.date}
        </div>
        <div>
          <span className="text-red-500">GC No &nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</span>
          {inputs.gcno}
        </div>
      </div>
    </div>
    <div
      className="flex gap-10 capitalize font-bold"
      style={{ marginTop: "-20px" }}
    >
      <form className="flex flex-col">
        <label>
          <span className="text-red-500 font-bold">
            Lorry No&nbsp;&nbsp;&nbsp;&nbsp;:
          </span>
          <input
            type="text"
            style={{ width: "35vw", borderColor: "red" }}
            defaultValue={inputs.lorryno}
            className="outline-none ml-2 pl-10 !bg-transparent border-b-2 border-dashed"
          />
        </label>
        <label>
          <span className="text-red-500 font-bold w-[20vw]">
            From&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          </span>
          <input
            style={{ width: "35vw", borderColor: "red" }}
            type="text"
            defaultValue={inputs.from}
            className="outline-none ml-2 !bg-transparent pl-10 border-b-2 border-dashed "
          />
        </label>
        <label className="flex">
          <span className="text-red-500 font-bold ">
            Consignor&nbsp;&nbsp;:
          </span>
          <input
            type="text"
            defaultValue={inputs.consignor}
            style={{ width: "35vw", borderColor: "red" }}
            className="outline-none ml-2 !bg-transparent pl-10 border-b-2 border-dashed "
          />
        </label>
        <label className="flex">
          <span className="text-red-500 font-bold ">
            Consignee&nbsp;&nbsp;:
          </span>
          <input
            type="text"
            defaultValue={inputs.consignee}
            style={{ width: "35vw", borderColor: "red" }}
            className="outline-none ml-2 !bg-transparent pl-10 border-b-2 border-dashed "
          />
        </label>
      </form>
      <form className="flex flex-col mt-10 leading-[10px]">
        <label className=" flex pl-2">
          <span className="text-red-500 font-bold ">
            To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
          </span>
          <input
            type="text"
            style={{ width: "35vw", borderColor: "red" }}
            defaultValue={inputs.to}
            className="outline-none ml-2 !bg-transparent pl-10  border-b-2 border-dashed "
          />
        </label>
        <label className="flex">
          <span className="text-red-500 ml-2 font-bold">
            GSTIN&nbsp;&nbsp;&nbsp;&nbsp;:
          </span>
          <input
            style={{ width: "35vw", borderColor: "red" }}
            type="text"
            className="outline-none border-b-2 !bg-transparent pl-10 ml-2 border-dashed"
          />
        </label>
        <label className="flex">
          <span className="text-red-500 ml-2 font-bold">
            {" "}
            GSTIN&nbsp;&nbsp;&nbsp;&nbsp;:
          </span>
          <input
            style={{ width: "35vw", borderColor: "red" }}
            type="text"
            className="outline-none border-b-2 !bg-transparent pl-10 ml-2 border-dashed"
          />
        </label>
      </form>
    </div>
    <div className="pt-4">
      <table className="border-2" style={{ width: "95vw", fontSize: "13px" }}>
        <thead>
          <tr className="border-b-2  border-slate-200 font-bold">
            <td className="border-r-2 w-[40vw] text-center border-slate-200 text-red-500">
              Description of Goods
            </td>
            <td className="border-r-2 w-[10vw] text-center border-slate-200 text-red-500">
              Weight
            </td>
            <td className="border-r-2 w-[10vw] text-center border-slate-200 text-red-500">
              Rate
            </td>
            <td className="w-[10vw] text-center text-red-500">Rs.</td>
          </tr>
        </thead>
        <tbody className="font-bold border-2">
          <tr>
            <td className="!w-[40vw] border-r-2 border-slate-200">
              <span className="text-red-500 pl-2">
                No. of Bales:&nbsp;&nbsp;&nbsp;<span className="text-black">{inputs.bales}</span>
              </span>
            </td>
            <td
              className="!w-[10vw] text-center border-r-2 border-slate-200 border-b-2"
              rowSpan={3}
            >
              As per Bill
            </td>
            <td
              className="!w-[10vw] text-center border-r-2 border-slate-200 border-b-2"
              rowSpan={3}
            >
              {filterDatas?.memomethod === "No"
                ? "As per contract"
                : inputs.bales * "500"}
            </td>
            <td
              className="!w-[10vw] text-center  border-slate-200 border-b-2"
              rowSpan={3}
            >
              {filterDatas?.memomethod === "No"
                ? "As per contract"
                : inputs.bales * 500}
            </td>
          </tr>
          <tr>
            <td className="!w-[40vw] border-r-2  border-slate-200">
              <span className="text-red-500 pl-2">
                Lot No. :&nbsp;&nbsp;&nbsp;<span className="text-black">{inputs.lotno}</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="!w-[40vw] border-r-2 border-slate-200">
              <span className="text-red-500 pl-2">
                P.R.NO. :&nbsp;&nbsp;&nbsp;<span className="text-black">{inputs.prno}</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="!w-[40vw] border-r-2  border-slate-200">
              <span className="text-red-500 pl-2">
                Inv. No. :&nbsp;&nbsp;&nbsp;<span className="text-black">{inputs.invoice}</span>
              </span>
            </td>
            <td
              colSpan={5}
              rowSpan={2}
              className="text-red-500 border-b-2 border-slate-200 pl-2 "
            >
              <div className="flex">
                Remarks&nbsp;:
                <span style={{ fontSize: "15px" }}>
                
                  {inputs.accountpaid === "To pay" ||
                  inputs.accountpaid === "paid" ? (
                    <span className="w-[30vw] text-black">
                      please pay lorry freight in amount favour of
                      <br /> jaibalaji roadways account
                    </span>
                  ) : (
                    <p className="text-black">{inputs.accountpaid}</p>
                  )}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="!w-[40vw] border-r-2  border-slate-200">
              <span className="text-red-500 pl-2">
                Value of Goods. :&nbsp;&nbsp;&nbsp;<span className="text-black">{inputs.value}</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="!w-[40vw] border-r-2   border-slate-200">
              <span className="text-red-500 pl-2">
                Quality:&nbsp;&nbsp;&nbsp;<span className="text-black">{inputs.quality}</span>
              </span>
            </td>
            <td colSpan={3} rowSpan={3} className="border-b-2">
              <p className="text-green-700">Our Bank details Given below:</p>
              <p className="text-green-700">Bank Name:Tamil Nadu Mercanitle bank</p>
              <p className="text-green-700">Branch:Namakkal</p>
              <p className="text-green-700">A/C. No:129700050900245</p>
              <p className="text-green-700">Ifsc Code:TMBL0000129</p>
            </td>
          </tr>
          <tr>
            <td className="!w-[40vw] border-r-2 border-slate-200">
              <span className="text-red-500 pl-2">
                P Marks:&nbsp;&nbsp;&nbsp;<span className="text-black">{inputs.pmark}</span>
              </span>
            </td>
          </tr>
          <tr>
            <td className="!w-[40vw] border-r-2 text-red-500 text-center  border-slate-200">
              <span className="text-red-500 border-b-2 border-t-2 border-red-500">
                GST Payable by Consignor/Consignee
              </span>
            </td>
          </tr>
          <tr>
            <td className="!w-[40vw] border-r-2 text-red-500   border-slate-200">
              <span className="text-red-500 ">
                Note :G.C.Note to Subject to Condition Overleaf
              </span>
            </td>
            <td className="text-red-500 !w-[40vw] flex flex-col">
              <p>PAN No : BJTPS6814B</p>
              <p>Eway Bill reg No : 33BJTPS6814B1Z1</p>
            </td>
            <td className="text-red-500 !w-[40vw] flex flex-col"><p>PAN No:BJTPS6814B</p><p>Eway Bill reg No:33BJTPS6814B1Z1</p></td>
          </tr>
        </tbody>
      </table>
      </div>
     <div style={{paddingTop:"5px"}}>
     <div className="flex gap-[20vw] w-[97vw] items-end justify-end pr-20">
      <p className="text-red-500 font-bold">Consignor Should be ensure their goods</p>
      <p className="text-black font-bold"> For Jai Balaji RoadWays</p>
    </div>
    <div className="flex w-[97vw] justify-between font-bold text-red-500" style={{paddingTop:"25px"}}>
      <p>Sign Of owner or lorry driver</p>
      <p className="flex flex-col" style={{color:"gray"}}>
        <span className="pl-10 ">it is Computer generated bill</span><span >power by R&J MERN-Developer's Cell-9944088629</span></p>
      <p>
        <span>Authorised Signature</span>
      </p>
    </div>
     </div>
     <div style={{fontSize:"15vw",position:"absolute",top:"35vh",color:"#F0F0F0",fontWeight:200,zIndex:-1,transform:"rotate(-35deg)"}}>ORIGINAL</div>
  </div>
  );
}

export default VehicleCopy;
