import React, { useEffect, useState } from "react";
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
} from "antd";
import axios from "axios";
import { get } from "lodash";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function Memo() {
  const [Memo, setMemo] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
  const [searched, setSearched] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:4001/api/memo?search=${searched}`);
      setMemo(get(result, "data.message"));
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
        await axios.post("http://localhost:4001/api/memo", value);
        fetchData();
        notification.success({ message: "memo Added successfully" });
        setOpen(false);
      } catch (err) {
        notification.error({ message: "Something went wrong" });
      }
    } else {
      try {
        await axios.put(
          `http://localhost:4001/api/memo/${updateId}`,
          value
        );
        fetchData();
        notification.success({ message: "memo updated successfully" });
        setOpen(false);
        form.setFieldValue([]);
        setUpdateId("");
      } catch (err) {
        notification.error({ message: "Something went wrong" });
      }
    }
  };

  const handleEdit = (value) => {
    form.setFieldsValue(value);
    setUpdateId(value._id);
    setOpen(true);
  };

  const handleDelete = async(value) => {
    try {
      await axios.delete(`http://localhost:4001/api/memo/${value._id}`)
      fetchData()
      notification.success({message:"Deleted Successfully"})
    } catch (err) {
      notification.error({message:"Something Went Wrong"})
    }
  }

  const columns = [
    {
      title: "Internal No",
      dataIndex: "Internal No",
      key: "Internal No",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    
    {
      title: "GC No",
      dataIndex: "GC No",
      key: "GC No",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Driver Name",
      dataIndex: "driverName",
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
      title: "Driver WhatsappNo",
      dataIndex: " driver whatsappno",
      key: "driver whatsappno",
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
            <DeleteOutlineOutlinedIcon className="!text-md text-green-500 cursor-pointer " onClick={()=>{handleDelete(text)}} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex pt-[15vh] pl-4">
      <div className="w-[75vw] flex flex-col gap-10">
        <div className="flex items-center justify-center">
        <Input
        placeholder="Search here"
        size="large"
        className="w-[50%] !m-auto py-3"
        onChange={(e) => {
          setSearched(e.target.value);
        }}/>
        </div>
        <div className="  w-full">
          <div
            className="float-right w-[120px] py-1 rounded-md cursor-pointer text-white font-bold  flex items-center justify-center bg-green-500"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddOutlinedIcon /> Create
          </div>
        </div>
        <Table columns={columns} dataSource={Memo} />
      </div>
      <Modal
        open={open}
        width={700}
        onCancel={() => {
          setOpen(!open);
          form.setFieldValue([]);
          setUpdateId("");
        }}
        footer={false}
      >
        <Form
          className="grid grid-cols-2 gap-4"
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Internal No</p>}
            name="internal no"
            rules={[
              {
                required: true,
                message: "Please input your internal no!",
              },
            ]}
          >
            <Input type="number" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Memo/GC No</p>}
            name="memogc"
            rules={[
              {
                required: true,
                message: "Please input your memogc!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold"> Date </p>}
            name="date"
            rules={[
              {
                required: true,
                message: "Please input your date!",
              },
            ]}
          >
            <Input type="date" size="large" />
          </Form.Item>

          <Form.Item label={<p className="!text-[16px] font-semibold">Vehicle No</p>}
           name="vehicle no"
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
            label={<p className="!text-[16px] font-semibold"> Driver Whatsapp Number</p>}
            name="driver whatsapp no"
            rules={[
              {
                required: true,
                message: "Please input your driver whtasapp number!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Location From</p>}
            name="location from"
            rules={[
              {
                required: true,
                message: "Please input your location!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">Location To </p>}
            name="location to"
            rules={[
              {
                required: true,  
                message: "Please input your location!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item label={<p className="!text-[16px] font-semibold">Commission</p>}
           name="commission"
        rules={[
            {
                required: true,  
                message: "Please input your commission",
              },
          ]}
          >
             <Input type="text" size="large" />
          </Form.Item>
 <div className="save">
          <Form.Item className="w-[40vw]">
            <Button
              htmlType="submit"
              className="bg-green-500 w-[130px] float-left text-white font-bold tracking-wider"
            >
              {updateId === "" ? "Save" : "Update"}
            </Button>
          </Form.Item>
 </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Memo;