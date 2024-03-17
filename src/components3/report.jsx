/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { Table, Select, Form, Button } from "antd";
import axios from "axios";
import { get, isEmpty, flattenDeep } from "lodash";
import { DatePicker } from "antd";
import moment from "moment";
import * as XLSX from "xlsx";
function Report() {
  const [report, setReport] = useState([]);
  const [searched, setSearched] = useState([]);
  const tableRef = useRef(null);
  const { RangePicker } = DatePicker;
  const dateFormat = "DD-MM-YYYY";
  const [userDates, setUserDate] = useState("");
  const [filteredDatas, setFilterDatas] = useState("");
  const [data, setData] = useState("");
  const [dateFilters, setDateFilters] = useState("");
  const [exporting, setExporting] = useState(false);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/api/memodetails`
      );
      setReport(get(result, "data.message"));
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setData(
      flattenDeep(
        userDates &&
          userDates?.map((res) => {
            return report?.filter((data) => {
              return data.date === res;
            });
          })
      )
    );
    setFilterDatas(
      report?.filter((res) => {
        return (
          searched.includes(res?.consignor) ||
          searched.includes(res?.consignee) ||
          searched.includes(res?.vehicleno)
        );
      })
    );

    setDateFilters(
      data &&
        data?.filter((res) => {
          return (
            searched.includes(res?.consignor) ||
            searched.includes(res?.consignee) ||
            searched.includes(res?.vehicleno)
          );
        })
    );
  }, [report, userDates, searched]);

  const handleDate = (date) => {
    if (!date || !date.length) {
      setUserDate([]);
      date = [];
    }

    const startDate = moment(
      `${date[0]?.$D} - ${date[0]?.$M + 1} - ${date[0]?.$y} -`,
      "DD-MM-YYYY"
    );
    const endDate = moment(
      `${date[1]?.$D} - ${date[1]?.$M + 1} - ${date[1]?.$y} -`,
      "DD-MM-YYYY"
    );

    const dates = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      dates.push(currentDate.format("DD-MM-YYYY"));
      setUserDate(dates);
      currentDate = currentDate.clone().add(1, "days");
    }
  };

  const exportToExcel = () => {
    if (!exporting) {
      const dataForExport = !data
        ? dateFilters
        : data?.map((report) => ({
            date: report.date,
            vehicleno: report.vehicleno,
            pan: report.pan,
            rcname: report.rcname,
            locationfrom: report.locationfrom,
            locationto: report.locationto,
            consignor: report.consignor,
            consignee: report.consignee,
            brokername: report.brokername,
            lrno: report.gcno,
            lramount: report.lramount,
          }));

      const ws = XLSX.utils.json_to_sheet(dataForExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "exported_data.xlsx");
      setExporting(false);
    }
  };

  const columns = [
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Date</h1>,
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Vehicle No</h1>,
      dataIndex: "vehicleno",
      key: "vehicleno",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Pan No</h1>,
      dataIndex: "pan",
      key: "pan",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">RC Name</h1>,
      dataIndex: "rcname",
      key: "rcname",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Location From</h1>,
      dataIndex: "locationfrom",
      key: "locationfrom",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Location To</h1>,
      dataIndex: "locationto",
      key: "location",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Consignor</h1>,
      dataIndex: "consignor",
      key: "consignor",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Consignee</h1>,
      dataIndex: "consignee",
      key: "consignee",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Broker Name</h1>,
      dataIndex: "brokername",
      key: "brokername",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Lr No</h1>,
      dataIndex: "gcno",
      key: "gcno",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[18px]">Lr Amount</h1>,
      dataIndex: "lramount",
      key: "lramount",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
  ];

  const searchers = [];
  data &&
    data
      .map((res) => {
        return searchers.push(
          { label: res?.consignor, value: res?.consignor },
          { label: res?.consignee, value: res?.consignee },
          { label: res?.vehicleno, value: res?.vehicleno }
        );
      })
      .flat();

  return (
    <div className="flex pt-[12vh] lg:pl-4">
      <div className="w-[78vw] flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row items-center justify-between px-10">
          <RangePicker
            format={dateFormat}
            size="large"
            onChange={handleDate}
            className="w-[80vw] lg:w-[25vw]"
          />
          <div className="flex items-center justify-center w-[90vw] pl-3 lg:pl-0">
            <Select
              mode="tags"
              showSearch
              placeholder="Type here for Reportentry"
              options={searchers}
              onChange={(data) => {
                setSearched(data);
              }}
              className="!w-[50vw] lg:!w-1/2 !m-auto py-3"
              size="large"
              showArrow={false}
              allowClear={true}
            />

            <div className="pr-5">
              <Button
                id="btn"
                onClick={() => {
                  exportToExcel(data);
                }}
                className="w-[90px] lg:w-[120px] py-1 border-none  rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-[--secondary-color] hover:!text-white"
              >
                Export Exel
              </Button>
            </div>
          </div>
        </div>

        {!isEmpty(dateFilters) ? (
          <Table
            columns={columns}
            dataSource={dateFilters}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
            className="!overflow-x-scroll"
          />
        )}
      </div>
    </div>
  );
}

export default Report;
