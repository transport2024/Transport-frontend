import React, { useEffect, useState } from "react";
import myimage1 from "./assets/dash1.png";
import myimage2 from "./assets/dash2.png";
import myimage3 from "./assets/dash3.png";
import myimage4 from "./assets/dash4.png";
import { Statistic, Table, Skeleton } from "antd";
import CountUp from "react-countup";
import axios from "axios";
import { get } from "lodash";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import {useDispatch} from "react-redux"
import {showOpen,hideOpen} from "./Redux/NetworkSlice"


function Dashboard() {
  const formatter = (value) => <CountUp end={value} separator="," />;
  const [consignor, setConsignor] = useState([]);
  const [consignee, setConsignee] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [broker, setBroker] = useState([]);
  const [loading, setLoading] = useState(false);
  const [memo, setMemo] = useState([]);
  const dispatch=useDispatch()

  const fetchData = async () => {
    setLoading(true);
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
      const result5 = await axios.get(`${process.env.REACT_APP_URL}/api/memo`);
      setConsignor(get(result1, "data.message"));
      setConsignee(get(result2, "data.message"));
      setVehicle(get(result3, "data.message"));
      setBroker(get(result4, "data.message"));
      setMemo(get(result5, "data.message"));
    } catch (err) {
      if (err.request.statusText === "Internal Server Error") {
        dispatch(showOpen())
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(memo, "jberjhehj");

  const columns = [
    {
      title: <p className="!text-[12px] lg:text-[18px]">GC No</p>,
      dataIndex: "gcno",
      key: "gcno",
      render: (text) => <div className="!text-[10px] lg:!text-[16px]">{text}</div>,
    },

    {
      title: <p className="!text-[12px] lg:text-[18px]">Date</p>,
      dataIndex: "date",
      key: "date",
      render: (text) => <div className="!text-[10px] lg:!text-[16px]">{text}</div>,
    },
    {
      title: <p className="!text-[12px] lg:text-[18px]">Vehicle No</p>,
      dataIndex: "vehicleno",
      key: "vehicleno",
      render: (text) => <div className="!text-[10px] lg:!text-[16px]">{text}</div>,
    },
    {
      title: <p className="!text-[12px] lg:text-[18px]">Driver Name</p>,
      dataIndex: "drivername",
      key: "drivername",
      render: (text) => <div className="!text-[10px] lg:!text-[16px]">{text}</div>,
    },
    {
      title: <p className="!text-[12px] lg:text-[18px]">DriverPhone</p>,
      dataIndex: "driverphone",
      key: "driverphone",
      render: (text) => <div className="!text-[10px] lg:!text-[16px]">{text}</div>,
    },
    {
      title: <p className="!text-[12px] lg:text-[18px]">Driver Whatsappno</p>,
      dataIndex: "driverwhatsappno",
      key: "driverwhatsappno",
      render: (text) => <div className="!text-[10px] lg:!text-[16px]">{text}</div>,
    },
  ];


  return (
    <div className="pt-[15vh] w-[85vw] m-auto">
      <div className="grid grid-cols-2 lg:!flex xsm:gap-6 lg:gap-10 lg:pl-5 flex-wrap">
        <div className="bg-[#a2de97] xsm:h-[100px] xsm:w-[120px] lg:h-[140px] lg:w-[280px] flex flex-col items-center justify-center rounded-md">
         
          <PeopleOutlineOutlinedIcon
            className="text-white lg:font-[50px]"
          />

          <Statistic
            title={
              <h1 className="text-white font-semibold xl:text-[20px]">
                Consigner
              </h1>
            }
            value={consignor.length}
            valueStyle={{
              color: "white",
              textAlign: "center",
            }}
            formatter={formatter}
          />
        </div>

        <div className="bg-[#e56a93] xsm:h-[100px] xsm:w-[120px] lg:h-[140px] lg:w-[280px] flex flex-col items-center justify-center rounded-md">
          {/* <img src={myimage2} /> */}
          <Person3OutlinedIcon className="text-white lg:font-[50px]"/>
          <Statistic
            title={
              <h1 className="text-white font-semibold xl:text-[20px]">
                Consignee
              </h1>
            }
            value={consignee.length}
            valueStyle={{
              color: "white",
              textAlign: "center",
            }}
            formatter={formatter}
          />
        </div>

        <div className="bg-[#c3b951] xsm:h-[100px] xsm:w-[120px] lg:h-[140px] lg:w-[280px] flex flex-col items-center justify-center rounded-md">
       
          <LocalShippingOutlinedIcon
            className="text-white lg:font-[50px]"
          />
          <Statistic
            title={
              <h1 className="text-white font-semibold xl:text-[20px]">
                Vechicle
              </h1>
            }
            value={vehicle.length}
            valueStyle={{
              color: "white",
              textAlign: "center",
            }}
            formatter={formatter}
          />
        </div>

        <div className="bg-[#74d3d3] xsm:h-[100px] xsm:w-[120px] lg:h-[140px] lg:w-[280px] flex flex-col items-center justify-center rounded-md">
         
          <ContactPageOutlinedIcon
           className="text-white lg:font-[50px]"
          />
          <Statistic
            title={
              <h1 className="text-white font-semibold xl:text-[20px]">
                Broker
              </h1>
            }
            value={broker.length}
            valueStyle={{
              color: "white",
              textAlign: "center",
            }}
            formatter={formatter}
          />
        </div>
      </div>
      <div className="flex flex-col pt-5 lg:pt-[8vh] lg:pl-5 gap-10 ">
        <div className="w-[80vw] m-auto">
          <h1 className="!text-[--secondary-color] lg:text-2xl font-semibold">
            Last 10 Entry
          </h1>
          <Skeleton loading={loading}>
            <Table
              columns={columns}
              dataSource={memo.slice(-10).reverse()}
              pagination={false}
              className="!z-0 !overflow-scroll"
            />
          </Skeleton>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
