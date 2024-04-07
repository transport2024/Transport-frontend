/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import {
  Table,
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
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";

function Vehicle() {
  const [Vehicle, setVehicle] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
  const [searched, setSearched] = useState([]);
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const userId=useSelector((state)=>state.user?.user?.userId)
  console.log(userId,"userId")

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/api/vehicle?search=${searched}&userId=${userId}`
      );
      setVehicle(get(result, "data.message"));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(userId){
      fetchData();
    }
  }, [searched,userId]);

  const handleSubmit = async (value) => {
    if (updateId === "") {
      try {
        setData(value);
        if (
          Vehicle.filter((res) => {
            return res.pan === value.pan;
          }).length >= 10
        ) {
          Modal.warning({
            title: `You use this pan no already 10 times...this is ${
              Vehicle.filter((res) => {
                return res.pan === value.pan;
              }).length + 1
            }th time...`,
            content: "if you really wanna use this",
            footer: [
              <div className="flex !gap-10 items-end justify-end">
                <Button
                  key="confirm"
                  type="primary"
                  onClick={() => Modal.destroyAll()}
                >
                  no
                </Button>
                <Button
                  key="confirm"
                  type="primary"
                  onClick={handleClickButton}
                >
                  Yes
                </Button>
              </div>,
            ],
          });
        } else {
          setLoadingBtn(true);
          const dataToSend={...value,userId}
          await axios.post(`${process.env.REACT_APP_URL}/api/vehicle`, dataToSend);
          fetchData();
          notification.success({
            message: "Vehicle Added successfully",
          });
          setOpen(false);
          form.setFieldsValue([]);
        }
      } catch (err) {
        notification.error({
          message: "Something went wrong",
        });
      } finally {
        setLoadingBtn(false);
      }
    } else {
      try {
        setLoadingBtn(true);
        await axios.put(
          `${process.env.REACT_APP_URL}/api/vehicle/${updateId}`,
          value
        );
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
      } finally {
        setLoadingBtn(false);
      }
    }
  };

  const handleClickButton = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_URL}/api/vehicle`, data);
      fetchData();
      notification.success({
        message: "Vehicle Added successfully",
      });
      setOpen(false);
      Modal.destroyAll();
      form.setFieldsValue([]);
    } catch (err) {}
  };



  const handleEdit = (value) => {
    form.setFieldsValue(value);
    setUpdateId(value._id);
    setOpen(true);
  };

  const handleDelete = async (value) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL}/api/vehicle/${value._id}`
      );
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

  const exportToExcel = () => {
    if (!exporting) {
      const dataForExport = Vehicle.map((vehicle) => ({
        docentry: vehicle.docentry,
        vehicleno: vehicle.vehicleno,
        drivername: vehicle.drivername,
        driverphone: vehicle.driverphone,
        whatsappno: vehicle.whatsappno,
        pan: vehicle.pan,
        rcname: vehicle.rcname,
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
      title: <h1 className="!text-[12px] lg:!text-[16px]">DocEntry</h1>,
      dataIndex: "docentry",
      key: "docentry",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },

    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">VehicleNo</h1>,
      dataIndex: "vehicleno",
      key: "vehicleno",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">DriverName</h1>,
      dataIndex: "drivername",
      key: "drivername",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">DriverPhone</h1>,
      dataIndex: "driverphone",
      key: "driverphone",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">WhatsappNo</h1>,
      dataIndex: "whatsappno",
      key: "whatsappno",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">PAN</h1>,
      dataIndex: "pan",
      key: "pan",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },
    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">RCName</h1>,
      dataIndex: "rcname",
      key: "rcname",
      render: (text) => (
        <div className="text-[10px] lg:!text-[16px]">{text}</div>
      ),
    },

    {
      title: <h1 className="!text-[12px] lg:!text-[16px]">Actions</h1>,
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
              className="!text-md text-red-500 cursor-pointer "
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
    <div className="flex pt-[10vh]">
      <div className="w-[100vw] lg:w-[78vw] flex flex-col gap-8">
        <div className="flex items-center justify-center">
          <Select
            mode="tags"
            showSearch
            placeholder="Type here for Vehicle"
            options={searchers}
            onChange={(data) => {
              setSearched(data);
            }}
            className="w-[70vw] lg:w-1/2 !m-auto py-3"
            size="large"
            showArrow={false}
            // open={searched.length===1?false:true}
          />
        </div>
        <div className="w-[100vw] lg:w-[78vw] flex justify-end items-end gap-5 pr-3   md:pr:10 lg:pr-20">
          <div
            className=" bg-[--secondary-color] h-[30px] !text-[10px] lg:!text-[14px] px-3 lg:px-5 py-1 rounded-md cursor-pointer text-white font-bold  flex items-center justify-center "
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddOutlinedIcon className="!text-[18px] lg:!text-[22px]"/> Create
          </div>
          <div>
            <Button
  
              onClick={() => {
                exportToExcel(Vehicle);
              }}
              className="!text-[10px] h-[30px] lg:!text-[14px] border-none px-3 lg:px-5 bg-[--secondary-color] rounded-md cursor-pointer text-white font-bold  flex items-center justify-centeryy hover:!text-white"
            >
              Export Exel
            </Button>
          </div>

        </div>
        <Skeleton loading={loading}>
          <Table
            columns={columns}
            dataSource={Vehicle}
            ref={tableRef}
            pagination={{ pageSize: 5 }}
            scroll={{x:800}}
          />
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
        destroyOnClose
        title={<h1 className="text-lg text-white ">Vehicle</h1>}
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
            <Input type="text" size="large" placeholder="Enter docentry" />
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
            <Input type="text" size="large" placeholder="Enter vehicleno" />
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
            <Input type="text" size="large" placeholder="Enter drivername" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">DriverPhone</p>}
            name="driverphone"
            rules={[
              {
                required: true,
                message: "Please input your driver phone!",
              },
              {
                pattern: /^\d{10}$/,
                message: "Phone number must be exactly 10 digits.",
              },
            ]}
          >
            <Input type="text" size="large" placeholder="Enter phone" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Whatsapp No</p>}
            name="whatsappno"
            rules={[
              {
                required: true,
                message: "Please input your whatsapp no!",
              },
              {
                pattern: /^\d{10}$/,
                message: "Phone number must be exactly 10 digits.",
              },
            ]}
          >
            <Input type="text" size="large" placeholder="Enter whatsapp" />
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
            <Input type="text" size="large" placeholder="Enter pan" />
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
            <Input type="text" size="large" placeholder="Enter rcname" />
          </Form.Item>
          <div className="flex items-end gap-2 justify-end">
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-red-500 w-[130px] float-left text-white font-bold tracking-wider"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                loading={loadingBtn}
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
