import React, { useEffect, useState } from "react";
import myimage1 from "./assets/dash1.png";
import myimage2 from "./assets/dash2.png";
import myimage3 from "./assets/dash3.png";
import myimage4 from "./assets/dash4.png";
import { Statistic, Table,Skeleton } from "antd";
import CountUp from "react-countup";
import axios from "axios"
import { get } from "lodash";

function Dashboard() {
    const formatter = (value) => <CountUp end={value} separator="," />;
    const [consignor,setConsignor]=useState([])
    const [consignee,setConsignee]=useState([])
    const [vehicle,setVehicle]=useState([])
  const [broker, setBroker] = useState([])
  const [loading,setLoading]=useState(false)
    

  const fetchData = async () => {
      setLoading(true)
        try {
          const result1 = await axios.get(
            `${process.env.REACT_APP_URL}/api/consignor`
          );
          const result2 = await axios.get(
            `${process.env.REACT_APP_URL}/api/consignee`
          );
          const result3 = await axios.get(
            `${process.env.REACT_APP_URL}/api/vehicle`
          );
          const result4 = await axios.get(
            `${process.env.REACT_APP_URL}/api/broker`
          );
            setConsignor(get(result1, "data.message"));
            setConsignee(get(result2, "data.message"));
            setVehicle(get(result3, "data.message"));
            setBroker(get(result4, "data.message"));
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false)
        }
      };
    
    useEffect(() => {
        fetchData();
    }, [])
    
    console.log(consignor,"jijih")

  
      
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: (text) => <div className="!text-[16px]">{text}</div>,
        },
    
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
          render: (text) => <div className="!text-[16px]">{text}</div>,
        },
        {
          title: "Place",
          dataIndex: "place",
          key: "place",
          render: (text) => <div className="!text-[16px]">{text}</div>,
        },
        {
          title: "Contact Person",
          dataIndex: "contactPerson",
          key: "contactPerson",
          render: (text) => <div className="!text-[16px]">{text}</div>,
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
          render: (text) => <div className="!text-[16px]">{text}</div>,
        },
        {
          title: "GST NO",
          dataIndex: "gstno",
          key: "gstno",
          render: (text) => <div className="!text-[16px]">{text}</div>,
        },
        {
          title: "Mail ID",
          dataIndex: "mail",
          key: "mail",
          render: (text) => <div className="!text-[16px]">{text}</div>,
        },
      ];

  return (
    <div className="pt-[15vh] ">
      <div className="!flex gap-10 pl-5   w-[85vw] flex-wrap">
        <div className="bg-[#a2de97] h-[140px] w-[290px] flex flex-col items-center justify-center rounded-md">
          <img src={myimage1} />

          <Statistic
            title={
              <h1 className="text-white font-normal xl:text-[20px]">
                Consigner
              </h1>
            }
            value={consignor.length}
            valueStyle={{
                color: "white",
                textAlign:"center"
            }}
            formatter={formatter}
          />
        </div>

        <div className="bg-[#e56a93] h-[140px] w-[290px] flex flex-col items-center justify-center rounded-md">
          <img src={myimage2} />
          <Statistic
            title={
              <h1 className="text-white font-normal xl:text-[20px]">
                Consignee
              </h1>
            }
            value={consignee.length}
            valueStyle={{
                color: "white",
                textAlign:"center"
              }}
            formatter={formatter}
          />
        </div>

        <div className="bg-[#c3b951] h-[140px] w-[290px] flex flex-col items-center justify-center rounded-md">
          <img src={myimage4} />
          <Statistic
            title={
              <h1 className="text-white font-normal xl:text-[20px]">
                Vechicle
              </h1>
            }
            value={vehicle.length}
            valueStyle={{
                color: "white",
                textAlign:"center"
              }}
            formatter={formatter}
          />
        </div>

        <div className="bg-[#74d3d3] h-[140px] w-[290px] flex flex-col items-center justify-center rounded-md">
          <img src={myimage3} />
          <Statistic
            title={
              <h1 className="text-white font-normal xl:text-[20px]">Broker</h1>
            }
            value={broker.length}
            valueStyle={{
                color: "white",
                textAlign:"center"
              }}
            formatter={formatter}
          />
        </div>
          </div>
          <div className="flex flex-col pt-[8vh] !z-0 pl-5 gap-10">
              <div className="w-[80vw] m-auto">
                  <h1 className="!text-[--secondary-color] text-2xl font-bold">Last Five Consignors</h1>
          <Skeleton loading={loading}>
             <Table columns={columns} dataSource={consignor.slice(-5)} pagination={false} />
                 </Skeleton>
             </div>
              <div className="w-[80vw] m-auto">
              <h1 className="!text-[--secondary-color] text-2xl font-bold">Last Five Consignees</h1>
              <Skeleton loading={loading}>
             <Table columns={columns} dataSource={consignor.slice(-5)} pagination={false} />
                 </Skeleton>
              </div>
          </div>
    </div>
  );
}

export default Dashboard;
