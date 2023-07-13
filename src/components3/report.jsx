import React, { Component, useEffect, useState,useRef } from "react";
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
import { get } from "lodash";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDownloadExcel } from "react-export-table-to-excel";

function Report() {
  const [Report, setReport] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
	const [searched, setSearched] = useState([]);
  const tableRef = useRef(null);
  
  console.log(Report)

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/api/report?search=${searched}`
      );
      setReport(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searched]);

  const handleSubmit = async (value) => {
    if (updateId === "") {
      try {
        await axios.post("http://localhost:4001/api/report", value);
        fetchData();
        notification.success({
          message: "Report Added successfully",
        });
        setOpen(false);
      } catch (err) {
        notification.error({
          message: "Something went wrong",
        });
      }
    } else {
      try {
        await axios.put(`http://localhost:4001/api/report/${updateId}`, value);
        fetchData();
        notification.success({
          message: "Report updated successfully",
        });
        setOpen(false);
        form.setFieldValue([]);
        setUpdateId("");
      } catch (err) {
        notification.error({
          message: "Something went wrong",
        });
      }
    }
  };

  const handleEdit = (value) => {
    form.setFieldsValue(value);
    setUpdateId(value._id);
    setOpen(true);
  };

  const handleDelete = async (value) => {
    try {
      await axios.delete(`http://localhost:4001/api/report/${value._id}`);
      fetchData();
      notification.success({
        message: "Deleted Successfully",
      });
    } catch (err) {
      notification.error({
        message: "Something Went Wrong",
      });
    }
  };

  const handleClear = () => {
    form.setFieldsValue([]);
  };

  const searchers = [];

  Report &&
    Report.map((data) => {
      return searchers.push(
        { value: data.consignor },
        { value: data.consignee },
        { value: data.vehicleno }
      );
    });


	const { onDownload } = useDownloadExcel({
		currentTableRef: tableRef.current,
		filename: "Web Users",
		sheet: "Web Users",
	  });
	
  const columns = [
    {
      title: "From Date",
      dataIndex: "fromdate",
      key: "fromdate",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
      title: "To Date",
      dataIndex: "todate",
      key: "todate",
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
      dataIndex: "panno",
      key: "panno",
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
      dataIndex: "lrno",
      key: "lrno",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Lr Amount",
      dataIndex: "lramount",
      key: "lramount",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Actions",
      render: (text) => (
        <div className="flex gap-1">
          <div>
            <EditNoteOutlinedIcon
              className="!text-md text-green-500 cursor-pointer"
              onClick={() => handleEdit(text)}
            />
          </div>

          <div>
            <DeleteOutlineOutlinedIcon
              className="!text-md text-green-500 cursor-pointer "
              onClick={() => {
                handleDelete(text);
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex pt-[12vh] pl-4">
      <div className="w-[75vw] flex flex-col gap-8">
        <div className="flex items-center justify-center">
          <Select
            mode="tags"
            showSearch
            placeholder="Type here for Category"
            options={searchers}
            onChange={(data) => {
              setSearched(data);
            }}
            className="w-[50%] !m-auto py-3"
            size="large"
            showArrow={false}
          />
        </div>
        <div className="w-full flex gap-5 items-end justify-end">
          <div
            className=" w-[120px] py-1 rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-green-500"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddOutlinedIcon />
            Create
          </div>
          <div>
            <Button
              onClick={onDownload}
              className="w-[120px] py-1  rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-green-500 hover:!text-white"
            >
              Export Exel
            </Button>
          </div>
        </div>
        <Table columns={columns} dataSource={Report} ref={tableRef} pagination={{pageSize:5}} />
      </div>
      <Drawer
        open={open}
        width={500}
        onCancel={() => {
          setOpen(!open);
          form.setFieldValue([]);
          setUpdateId("");
        }}
        onClose={() => {
          setOpen(!open);
          form.setFieldValue([]);
          setUpdateId("");
        }}
        footer={false}
       
      >
        <Form
          className="flex flex-col gap-1"
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<p className="!text-[16px] font-semibold">From Date</p>}
            name="fromdate"
            rules={[
              {
                required: true,
                message: "Please input your fromdate!",
              },
            ]}
          >
            <Input type="date" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold"> To Date</p>}
            name="todate"
            rules={[
              {
                required: true,
                message: "Please input your todate!",
              },
            ]}
          >
            <Input type="date" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Vehicle No</p>}
            name="vehicleno"
            rules={[
              {
                required: true,
                message: "Please input your Vehicleno!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">PAN No</p>}
            name="panno"
            rules={[
              {
                required: true,
                message: "Please input your panno!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">RC Name</p>}
            name="rcname"
            rules={[
              {
                required: true,
                message: "Please input your RC Name!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Location from</p>}
            name="locationfrom"
            rules={[
              {
                required: true,
                message: "Please input your Location From!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Location To</p>}
            name="locationto"
            rules={[
              {
                required: true,
                message: "Please input your location to!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Consignor</p>}
            name="consignor"
            rules={[
              {
                required: true,
                message: "Please input your consignor!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Consignee</p>}
            name="consignee"
            rules={[
              {
                required: true,
                message: "Please input your consignee!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Broker Name</p>}
            name="brokername"
            rules={[
              {
                required: true,
                message: "Please input your brokername !",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Lr No</p>}
            name="lrno"
            rules={[
              {
                required: true,
                message: "Please input your lrno!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Lr Amount</p>}
            name="lramount"
            rules={[
              {
                required: true,
                message: "Please input your amount!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <div className="flex items-end gap-2 justify-end">
           
            <Form.Item >
              <Button
                htmlType="submit"
                className="bg-red-500 w-[130px] float-left text-white font-bold tracking-wider"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Form.Item>
            <Form.Item >
              <Button
                htmlType="submit"
                className="bg-green-600 w-[130px] float-left text-white font-bold tracking-wider"
              >
                {updateId === "" ? "Save" : "Update"}{" "}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    </div>
  );
}

export default Report;
