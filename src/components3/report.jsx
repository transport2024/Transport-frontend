import React, { Component, useEffect, useState, useRef } from "react";
import SideNavbar from "../sideNavbar.jsx";
import {
  Space,
  Table,
  Tag,
  Select,
  Modal,
  Form,
  Input,
  Button,
  notification,
  Drawer,
} from "antd";
import axios from "axios";
import { get, isEmpty, flattenDeep } from "lodash";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDownloadExcel } from "react-export-table-to-excel";
import { DatePicker } from "antd";
import moment from "moment";

function Report() {
  const [report, setReport] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [searched, setSearched] = useState([]);
  const tableRef = useRef(null);
  const { RangePicker } = DatePicker;
  const dateFormat = "YYYY-MM-DD";
  const [userDates, setUserDate] = useState("");
  const [filteredDatas, setFilterDatas] = useState([]);
  const [memoDetails, setMemoDetails] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/api/memodetails`
      );

      setReport(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 
    const datesdata=flattenDeep(userDates &&
      userDates?.map((res) => {
        return report?.filter(data=>{
          return data.date===res
        });
      }))
  

  useEffect(() => {

    setFilterDatas(
      report.filter((res) => {
        return (
          searched.includes(res.consignor) ||
          searched.includes(res.consignee) ||
          searched.includes(res.vehicleno)
        );
      })
    );
  }, [report, userDates, searched]);

 

  const handleDate = (date) => {
    const startDate = moment(
      `${date[0]?.$y} - ${date[0]?.$M + 1} - ${date[0]?.$D}`,
      "YYYY-MM-DD"
    );
    const endDate = moment(
      `${date[1]?.$y} - ${date[1]?.$M + 1} - ${date[1]?.$D}`,
      "YYYY-MM-DD"
    );

    const dates = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      setUserDate(dates);
      currentDate = currentDate.clone().add(1, "days");
    }
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Web Users",
    sheet: "Web Users",
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Vehicle No",
      dataIndex: "vehicleno",
      key: "vehicleno",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Pan No",
      dataIndex: "pan",
      key: "pan",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "RC Name",
      dataIndex: "rcname",
      key: "rcname",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Location From",
      dataIndex: "locationfrom",
      key: "locationfrom",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Location To",
      dataIndex: "locationto",
      key: "location",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Consignor",
      dataIndex: "consignor",
      key: "consignor",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Consignee",
      dataIndex: "consignee",
      key: "consignee",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Broker Name",
      dataIndex: "brokername",
      key: "brokername",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Lr No",
      dataIndex: "gcno",
      key: "gcno",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Lr Amount",
      dataIndex: "lramount",
      key: "lramount",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
  ];

  const searchers = [];

  report &&
    report.map((data) => {
      return searchers.push(
        { value: data.consignor },
        { value: data.consignee },
        { value: data.vehicleno }
      );
    });
  return (
    <div className="flex pt-[12vh] pl-4">
      <div className="w-[83vw] flex flex-col gap-8">
        <div className="flex items-center justify-between px-10">
          <RangePicker format={dateFormat} size="large" onChange={handleDate} />
          <div className="flex w-[30vw]">
            <Select
              mode="tags"
              showSearch
              placeholder="Type here for Reportentry"
              options={searchers}
              onChange={(data) => {
                setSearched(data);
              }}
              className="w-[30vw]  py-3"
              size="large"
              showArrow={false}
              allowClear
              // disabled={searched.length===1?true:false}
              // open={searched.length===1?false:true}
            />
          </div>

          <div>
            <Button
              onClick={onDownload}
              className="w-[120px] py-1  rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-[--secondary-color] hover:!text-white"
            >
              Export Exel
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={datesdata?datesdata:filteredDatas}
          ref={tableRef}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}

export default Report;
