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

function Report() {
  const [Report, setReport] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [updateId, setUpdateId] = useState("");
  const [searched, setSearched] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(`http://localhost:4001/api/report?search=${searched}`);
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
        notification.success({ message: "Report Added successfully" });
        setOpen(false);
      } catch (err) {
        notification.error({ message: "Something went wrong" });
      }
    } else {
      try {
        await axios.put(
          `http://localhost:4001/api/report/${updateId}`,
          value
        );
        fetchData();
        notification.success({ message: "Report updated successfully" });
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
      await axios.delete(`http://localhost:4001/api/report/${value._id}`)
      fetchData()
      notification.success({message:"Deleted Successfully"})
    } catch (err) {
      notification.error({message:"Something Went Wrong"})
    }
  }

  const columns = [
    {
      title: "From Date",
      dataIndex: "From Date",
      key: "From Date",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
      title: "To Date",
      dataIndex: "To Date",
      key: "tO Date",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
      title: "Vehicle No",
      dataIndex: "Vehicle No",
      key: "Vehicle No",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },

    {
        title: "Location From",
        dataIndex: "Location From",
        key: "Location From",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },
  
    {
      title: "Location To",
      dataIndex: "Location To",
      key: "Location To",
      render: (text) => <div className="!text-[16px]">{text}</div>,
    },
    {
        title: "Consignor",
        dataIndex: "Consignor",
        key: "Consignor",
        render: (text) => <div className="!text-[16px]">{text}</div>,
      },
  
      {
          title: "Consignee",
          dataIndex: "Consignee",
          key: "Consignee",
          render: (text) => <div className="!text-[16px]">{text}</div>,
        },
        {
            title: "Broker Name",
            dataIndex: "broker Name",
            key: "broker name",
            render: (text) => <div className="!text-[16px]">{text}</div>,
          },
          {
            title: "LR No",
            dataIndex: " LR No",
            key: "LR No",
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
        <Table columns={columns} dataSource={Report} />
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
            label={<p className="!text-[16px] font-semibold">From Date</p>}
            name="from date"
            rules={[
              {
                required: true,
                message: "Please input your from date!",
              },
            ]}
          >
            <Input type="date" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold">To Date</p>}
            name="to date"
            rules={[
              {
                required: true,
                message: "Please input your to date!",
              },
            ]}
          >
            <Input type="date" size="large" />
          </Form.Item>
          <Form.Item
            label={<p className="!text-[16px] font-semibold"> Vehicle No </p>}
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

          <Form.Item label={<p className="!text-[16px] font-semibold">Location From</p>}
           name="location from"
        rules={[
            {
                required: true,  
                message: "Please input your location from!",
              },
          ]}
          >
            <Input type="text" size="large" />
            </Form.Item> 

          <Form.Item
            label={<p className="!text-[16px] font-semibold">Location To</p>}
            name="location to"
            rules={[
              {
                required: true,
                message: "Please input your to location!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>

          <Form.Item
            label={<p className="!text-[16px] font-semibold"> Consignor</p>}
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
            name="Consignee"
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
            label={<p className="!text-[16px] font-semibold">Broker </p>}
            name="broker"
            rules={[
              {
                required: true,  
                message: "Please input your broker!",
              },
            ]}
          >
            <Input type="text" size="large" />
          </Form.Item>
          <Form.Item label={<p className="!text-[16px] font-semibold">CR No</p>}
           name="cr no"
        rules={[
            {
                required: true,  
                message: "Please input your cr no",
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

export default Report;