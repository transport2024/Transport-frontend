  /* eslint-disable react-hooks/exhaustive-deps */
  import React, { useEffect, useState } from "react";
  import { Statistic, Table, Skeleton } from "antd";
  import CountUp from "react-countup";
  import axios from "axios";
  import { get } from "lodash";
  import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
  import Person3OutlinedIcon from "@mui/icons-material/Person3Outlined";
  import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
  import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
  import { changeUservalues } from "./Redux/userSlice";
  import { useDispatch, useSelector } from "react-redux";
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
  import moment from "moment";


  function Dashboard() {
    const formatter = (value) => <CountUp end={value} separator="," />;
    const [consignor, setConsignor] = useState([]);
    const [consignee, setConsignee] = useState([]);
    const [vehicle, setVehicle] = useState([]);
    const [broker, setBroker] = useState([]);
    const [loading, setLoading] = useState(false);
    const [memo, setMemo] = useState([]);
    const dispatch=useDispatch()
    const userId=useSelector((state)=>state.user?.user?.userId)


    const fetchData = async () => {
      setLoading(true);
      if(userId){
        try {
          const result1 = await axios.get(
            `${process.env.REACT_APP_URL}/api/consignor?search=${""}&userId=${userId}`
          );

          const result2 = await axios.get(
            `${process.env.REACT_APP_URL}/api/consignee?search=${""}&userId=${userId}`
          );
          const result3 = await axios.get(
            `${process.env.REACT_APP_URL}/api/vehicle?search=${""}&userId=${userId}`
          );
          const result4 = await axios.get(
            `${process.env.REACT_APP_URL}/api/broker?search=${""}&userId=${userId}`
          );
    
          const result5 = await axios.get(
            `${process.env.REACT_APP_URL}/api/memo?userId=${userId}`
          );
       
          setConsignor(get(result1, "data.message"));
          setConsignee(get(result2, "data.message"));
          setVehicle(get(result3, "data.message"));
          setBroker(get(result4, "data.message"));
          setMemo(get(result5, "data.message"));
    
          
        } catch (err) {
        
        } finally {
          setLoading(false);
        }
      }
    };


    const fetchDataUser = async () => {
      const token = localStorage.getItem("token");

      try {
        const result = await axios.get(
          `${process.env.REACT_APP_URL}/api/user/validateToken`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(changeUservalues(result.data))
      } catch (err) {
        console.log(err);
      }
    };



    useEffect(() => {
      fetchData();
      
    }, [userId]);
    useEffect(()=>{
      fetchDataUser()
    },[])

    const getLastFiveDates = () => {
      const dates = [];
      const num_of_days = 5;
    
      for (let i = 1; i <= num_of_days; i++) {
        const date = moment().subtract(i, 'days').format('DD-MM-YYYY');
        dates.push(date);
      }
    
      return dates;
    };

    const lastFiveDaysMemoEntriesCount = () => {
      const dates = getLastFiveDates();
      const lastFiveDatesCounts = {};
    
      const lastFiveDatesData = memo?.filter((entry) =>
        dates.includes(moment(entry.createdAt).format("DD-MM-YYYY"))
      );
    
      lastFiveDatesData.forEach((entry) => {
        const entryDate = moment(entry.createdAt).format("DD-MM-YYYY");
        if (lastFiveDatesCounts[entryDate] === undefined) {
          lastFiveDatesCounts[entryDate] = 1;
        } else {
          lastFiveDatesCounts[entryDate]++;
        }
      });
      const dataForRecharts = dates.map((date) => ({
        date,
        count: lastFiveDatesCounts[date] || 0,
      }));
    
      return dataForRecharts;
    }

    
    const lastFiveDaysVehicleEntriesCount = () => {
      const dates = getLastFiveDates();
      const lastFiveDatesCounts = {};
    
      const lastFiveDatesData = vehicle?.filter((entry) =>
        dates.includes(moment(entry.createdAt).format("DD-MM-YYYY"))
      );
    
      lastFiveDatesData.forEach((entry) => {
        const entryDate = moment(entry.createdAt).format("DD-MM-YYYY");
        if (lastFiveDatesCounts[entryDate] === undefined) {
          lastFiveDatesCounts[entryDate] = 1;
        } else {
          lastFiveDatesCounts[entryDate]++;
        }
      });
    
      const dataForRecharts = dates.map((date) => ({
        date,
        count: lastFiveDatesCounts[date] || 0,
      }));
    
      return dataForRecharts;
    };
    
    


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
        dataIndex: "whatsappno",
        key: "whatsappno",
        render: (text) => <div className="!text-[10px] lg:!text-[16px]">{text}</div>,
      },
    ];


    const consignorCount = consignor?.length;
    const consigneeCount = consignee?.length;

    const pieChartData = [
      { name: "Consignor", value: consignorCount||0 },
      { name: "Consignee", value: consigneeCount||0 },
    ];

    return (
      <div className="pt-[12vh] !w-[100vw] lg:!w-[82vw] z-20">
      <div className="flex flex-wrap gap-3 pl-6 lg:pl-0 lg:gap-6">
    <div className="bg-gradient-to-br from-[#ff8080] to-[#ff3333] xsm:h-[100px] xsm:w-[140px] md:w-[200px] lg:h-[130px] lg:w-[250px] flex flex-col items-center justify-center rounded-md">
      <PeopleOutlineOutlinedIcon className="text-white lg:text-5xl" />
      <Statistic
        title={<h1 className="text-white font-semibold text-xl">Consigner</h1>}
        value={consignor?.length}
        valueStyle={{
          color: "white",
          textAlign: "center",
        }}
        formatter={formatter}
      />
    </div>

    <div className="bg-gradient-to-br from-[#ff8080] to-[#ff3333] xsm:h-[100px] xsm:w-[140px]  md:w-[200px] lg:h-[130px] lg:w-[250px] flex flex-col items-center justify-center rounded-md">
      <Person3OutlinedIcon className="text-white lg:text-5xl" />
      <Statistic
        title={<h1 className="text-white font-semibold text-xl">Consignee</h1>}
        value={consignee?.length}
        valueStyle={{
          color: "white",
          textAlign: "center",
        }}
        formatter={formatter}
      />
    </div>

    <div className="bg-gradient-to-br from-[#ff8080] to-[#ff3333] xsm:h-[100px] xsm:w-[140px] md:w-[200px] lg:h-[130px] lg:w-[250px] flex flex-col items-center justify-center rounded-md">
      <LocalShippingOutlinedIcon className="text-white lg:text-5xl" />
      <Statistic
        title={<h1 className="text-white font-semibold text-xl">Vehicle</h1>}
        value={vehicle?.length}
        valueStyle={{
          color: "white",
          textAlign: "center",
        }}
        formatter={formatter}
      />
    </div>

    <div className="bg-gradient-to-br from-[#ff8080] to-[#ff3333] xsm:h-[100px] xsm:w-[140px] md:w-[200px] lg:h-[130px] lg:w-[250px] flex flex-col items-center justify-center rounded-md">
      <ContactPageOutlinedIcon className="text-white lg:text-5xl" />
      <Statistic
        title={<h1 className="text-white font-semibold text-xl">Broker</h1>}
        value={broker?.length}
        valueStyle={{
          color: "white",
          textAlign: "center",
        }}
        formatter={formatter}
      />
    </div>
  </div>


        <div className="flex flex-wrap">
      <div className="flex flex-col items-center justify-center">
        <h1 className="pl-2 pt-10">Last Five Days Memo Entries</h1>
        <BarChart width={380} height={300} data={lastFiveDaysMemoEntriesCount()}>
        <CartesianGrid stroke="blue"  />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="blue" />
      </BarChart>
      </div>
      <div className="flex flex-col items-center justify-center">
  <h1 className="pl-2 pt-10">Last Five Days Vehicle Entries</h1>
  <LineChart width={380} height={300} data={lastFiveDaysVehicleEntriesCount()}>
    <CartesianGrid stroke="blue"  />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="count" stroke="blue" />
  </LineChart>
</div>
      <div className="flex flex-col pt-10 items-center justify-center">
        <h1 className="pl-2">Total Consignor&Consignee</h1>
      <PieChart width={350} height={350}>
          <Pie
            data={pieChartData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            <Cell fill="#a2de97" />
            <Cell fill="#e56a93" />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
          <div className="!w-[95vw] lg:w-[80vw] pt-10 ">
            <h1 className="pl-2">
              Last Five Memo Entries
            </h1>
            <Skeleton loading={loading}>
              <Table
                columns={columns}
                dataSource={memo.slice(-5).reverse()}
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
