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
  Skeleton,
} from "antd";
import axios from "axios";
import { get } from "lodash";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useDownloadExcel } from "react-export-table-to-excel";

function Vehicle() {
  const [Vehicle, setVehicle] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
	const [searched, setSearched] = useState([]);
  const tableRef = useRef(null);
  const [loading,setLoading]=useState(false)
  


  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/api/vehicle?search=${searched}`
      );
      setVehicle(get(result, "data.message"));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [searched]);

  const handleSubmit = async (value) => {
    if (updateId === "") {
      try {
        await axios.post(`${process.env.REACT_APP_URL}/api/vehicle`, value);
        fetchData();
        notification.success({
          message: "Vehicle Added successfully",
        });
        setOpen(false);
      } catch (err) {
        notification.error({
          message: "Something went wrong",
        });
      }
    } else {
      try {
        await axios.put(`${process.env.REACT_APP_URL}/api/vehicle/${updateId}`, value);
        fetchData();
        notification.success({
          message: "Vehicle updated successfully",
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
      await axios.delete(`${process.env.REACT_APP_URL}/api/vehicle/${value._id}`);
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

  Vehicle &&
    Vehicle.map((data) => {
      return searchers.push(
        { value: data.drivername },
        { value: data.driverphone },
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
      title: "DocEntry",
      dataIndex: "docentry",
      key: "docentry",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
      title: "VehicleNo",
      dataIndex: "vehicleno",
      key: "vehicleno",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "DriverName",
      dataIndex: "drivername",
      key: "drivername",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "DriverPhone",
      dataIndex: "driverphone",
      key: "driverphone",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "WhatsappNo",
      dataIndex: "whatsappno",
      key: "whatsappno",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "PAN",
      dataIndex: "pan",
      key: "pan",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "RCName",
      dataIndex: "rcname",
      key: "rcname",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Account no",
      dataIndex: "accno",
      key: "accno",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "IFC Code",
      dataIndex: "ifsccode",
      key: "ifsccode",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Actions",
      render: (text) => (
        <div className="flex gap-1">
          <div>
            <EditNoteOutlinedIcon
              className="!text-md text-[--secondary-color] cursor-pointer"
              onClick={() => handleEdit(text)}
            />
          </div>

          <div>
            <DeleteOutlineOutlinedIcon
              className="!text-md text-[--secondary-color] cursor-pointer "
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
            className=" w-[120px] py-1 rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-[--secondary-color]"
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
              className="w-[120px] py-1  rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-[--secondary-color] hover:!text-white"
            >
              Export Exel
            </Button>
          </div>
        </div>
        <Skeleton loading={loading}>
        <Table columns={columns} dataSource={Vehicle} ref={tableRef} pagination={{pageSize:5}} />
        </Skeleton>
       
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
        title={<h1 className="text-lg ">Vehicle</h1>}
        footer={false}
        className="!bg-[--primary-color] !text-white"
      >
        <Form
          className="flex flex-col gap-1"
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<p className="!text-[16px] font-semibold">DocEntry</p>}
            name="docentry"
            rules={[
              {
                required: true,
                message: "Please input your docentry!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">VehicleNo</p>}
            name="vehicleno"
            rules={[
              {
                required: true,
                message: "Please input your vehicle no!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">DriverName</p>}
            name="drivername"
            rules={[
              {
                required: true,
                message: "Please input your drivername!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">DriverPhone</p>}
            name="driverphone"
            rules={[
              {
                required: true,
                message: "Please input your driver phone!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Whatsapp No</p>}
            name="whatsappno"
            rules={[
              {
                required: true,
                message: "Please input your whatsapp no!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">PAN</p>}
            name="pan"
            rules={[
              {
                required: true,
                message: "Please input your pan!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">RCName</p>}
            name="rcname"
            rules={[
              {
                required: true,
                message: "Please input your RCName!",
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

export default Vehicle;
